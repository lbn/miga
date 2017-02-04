from urllib.parse import urlparse

from pony.orm import db_session, commit
import newspaper

from models import Article, Sentence


def split_sentences(text):
    for sent in text.split("."):
        if len(sent) > 0:
            yield sent.strip()+"."


@db_session
def create_article(title, text, source="text"):
    article = Article(source=source)
    Sentence(original=title.strip(), index=0, article=article)
    for i, sent in enumerate(split_sentences(text)):
        Sentence(original=sent.strip(), index=i+1, article=article)
    commit()
    return {"articleID": article.id}


def upload_url(url):
    article = newspaper.Article(url)
    article.download()
    article.parse()
    return create_article(article.title, article.text,
                          source=urlparse(url).netloc)
