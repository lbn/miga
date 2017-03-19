from datetime import datetime

from flask import Blueprint
from pony.orm import db_session
from voluptuous import Schema, Required, Optional, Url, In

from models import EventTranslateSentence, Sentence, db
from validation import json_schema, lang_schema

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
    Required("period"): In(("day", "week", "month", "year", "alltime")),
    Optional("lang"): lang_schema
}))
def summary(data):
    where = ""
    if data["period"] != "alltime":
        where = "where date >= date_trunc('{}', now())".format(data["period"])
    stats = db.select("""select sum(word_count), count(sentence)
        from EventTranslateSentence """ + where)

    days, practised = streak()
    return {
        "words": stats[0][0] or 0,
        "sentences": stats[0][1],
        "streak": days,
        "practised": practised
    }


@db_session
def streak():
    cur = db.execute("""WITH dates(date) AS (SELECT DISTINCT date::date AS date FROM EventTranslateSentence),
     dists AS (SELECT dates.date, (dates.date - now()::date + row_number() OVER (ORDER BY dates.date DESC)) AS dist FROM dates)
SELECT dists.dist, 1+max(dists.date)-min(dists.date) FROM dists
WHERE dists.dist IN (0,1)
GROUP BY 1
ORDER BY 1""")
    res = cur.fetchall()
    if len(res) == 0:
        return 0, True
    streaks = {row[0]: row[1] for row in res}

    if 1 in streaks:
        return streaks[1], True

    return streaks[0], False


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