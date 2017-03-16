from datetime import datetime

from flask import Blueprint
from pony.orm import db_session
from voluptuous import Schema, Required, Url, In

from models import EventTranslateSentence, Sentence, db
from validation import json_schema

stats_api = Blueprint("stats", __name__)
"""select f.d,sum(f.c),count(f.d) from (
            select date(date) as d,sentence,word_count as c
            from EventTranslateSentence
            group by 1,2
        ) as f
        group by 1"""

@stats_api.route("/summary", methods=["POST"])
@db_session
@json_schema(Schema({
    Required("period"): In(("day", "week", "month", "year", "alltime"))
}))
def summary(data):
    where = ""
    if data["period"] == "alltime":
        where = "where date >= date_trunc({}, now())".format(data["period"])
    stats = db.select("""select sum(word_count), count(sentence)
        from EventTranslateSentence """ + where)
    return {"words": stats[0][0] or 0, "sentences": stats[0][1]}

# tracking
def sentence_translate(sentenceID, now=None):
    if now is None:
        now = datetime.now()
    sentence = Sentence.get(id=sentenceID)
    EventTranslateSentence(article=sentence.article,
                           lang_original=sentence.article.lang_original,
                           lang_target=sentence.article.lang_target,
                           sentence=sentence,
                           date=now,
                           word_count=len(sentence.original.split(" ")))