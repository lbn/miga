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

    with db_session():
        article = Article.get(id=1)
        sentence_translate(list(s.id for s in article.sentences if s.index == 0)[0])

    r = client.post("/stats/summary", data={"period": "day"})
    res = json.loads(r.data.decode("utf8"))
    assert res["words"] == 6
    assert res["sentences"] == 1

def test_streak(request):
    database(request)
    client = app.test_client()

    with db_session():
        article = Article.get(id=1)
        sentence_id = list(s.id for s in article.sentences if s.index == 0)[0]
        days = 20
        now = datetime.now()
        for i in range(days):
            sentence_translate(sentence_id, now=now-td(days=days-i))

    r = client.post("/stats/summary", data={"period": "day"})
    res = json.loads(r.data.decode("utf8"))
    assert res["words"] == 6
    assert res["sentences"] == 1
