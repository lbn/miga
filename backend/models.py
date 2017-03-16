from datetime import datetime

from pony.orm import *

db = Database()

class Language(db.Entity):
    code = Required(str, unique=True)
    name = Required(str)

    articles_original = Set("Article")
    articles_target = Set("Article")

    translate_events_original = Set("EventTranslateSentence")
    translate_events_target = Set("EventTranslateSentence")


class Article(db.Entity):
    sentences = Set("Sentence")
    source = Required(str)

    created_at = Required(datetime)

    lang_original = Required(Language, reverse="articles_original")
    lang_target = Required(Language, reverse="articles_target")

    translate_events = Set("EventTranslateSentence")

class Sentence(db.Entity):
    original = Required(str)
    translation = Optional(str)
    article = Required(Article)
    index = Required(int)
    para_index = Required(int)

    translate_events = Set("EventTranslateSentence")


# Stats
class EventTranslateSentence(db.Entity):
    date = Required(datetime)
    lang_original = Required(Language, reverse="translate_events_original")
    lang_target = Required(Language, reverse="translate_events_target")
    word_count = Required(int)
    article = Required(Article, reverse="translate_events")
    sentence = Required(Sentence, reverse="translate_events")
