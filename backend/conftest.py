from datetime import datetime

import pytest
from pytest_postgresql.factories import (
    init_postgresql_database, drop_postgresql_database, get_config,
)
from pony.orm import db_session

from main import populate_languages
from models import db, Article, Language, Sentence

@pytest.fixture(scope="function")
def database(request):
    config = get_config(request)
    pg_host = config.get("host")
    pg_port = config.get("port") or 5432
    pg_user = config.get("user")
    pg_db = config.get("db", "tests")
    pg_version = config.get("version", 9.5)

    # Create our Database.
    init_postgresql_database(pg_user, pg_host, pg_port, pg_db)

    # Ensure our database gets deleted.
    @request.addfinalizer
    def drop_database():
        pass
        db.drop_all_tables(with_all_data=True)
        drop_postgresql_database(pg_user, pg_host, pg_port, pg_db, pg_version)

    try:
        db.bind("postgres", user="miga", host=pg_host, port=pg_port, database=pg_db)
    except TypeError:
        pass
    else:
        db.generate_mapping(check_tables=False)
    db.create_tables()
    populate_languages()
    populate_test_data()

@db_session
def populate_test_data():
    a = Article(source="test-data", created_at=datetime.now(),
                lang_original=Language.get(code="en"),
                lang_target=Language.get(code="es"))
    Sentence(original="Sentence one which is a title", index=0, para_index=0, article=a)
