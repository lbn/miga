from urllib.parse import urlparse
from collections import namedtuple

from pony.orm import db_session, commit
import newspaper

from models import Article, Sentence, Language

SplitSentence = namedtuple("SplitSentence", "text para_index")


def split_sentences(text):
    paras = text.split("\n\n")
    for pi, para in enumerate(paras):
        for sent in para.split("."):
            if len(sent) == 0:
                continue
            yield SplitSentence(text=sent.strip()+".", para_index=pi)


@db_session
def create_article(title, text, source="text"):
    article = Article(source=source, lang_original=Language.get(name="Spanish"), lang_target=Language.get(name="English"))
    Sentence(original=title.strip(), index=0, article=article, para_index=0)
    for i, sent in enumerate(split_sentences(text)):
        Sentence(original=sent.text, index=i+1, para_index=sent.para_index+1,
                 article=article)
    commit()
    return {"articleID": article.id}


def upload_url(url):
    article = newspaper.Article(url)
    article.download()
    article.parse()
    return create_article(article.title, article.text,
                          source=urlparse(url).netloc)
