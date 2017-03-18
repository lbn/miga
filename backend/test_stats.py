import json
from datetime import datetime, timedelta as td

from pony.orm import db_session
import pytest

from main import app
from conftest import database
from stats import sentence_translate
from models import Article

def test_summary(request):
    database(request)
    client = app.test_client()

    days = 20
    with db_session():
        article = Article.get(id=1)
        sentence_id = list(s.id for s in article.sentences if s.index == 0)[0]
        now = datetime.now()
        for i in range(days):
            sentence_translate(sentence_id, now=now-td(days=i+3))

        # events yesterday and today
        sentence_translate(sentence_id, now=now-td(days=1))
        sentence_translate(sentence_id, now=now)

    r = client.post("/stats/summary", data={"period": "alltime"})
    res = json.loads(r.data.decode("utf8"))
    assert res["words"] == 6*(days+2)
    assert res["sentences"] == 1*(days+2)
    assert res["streak"] == 2
