from functools import lru_cache

from flask import Blueprint, request
from flask_api import status
from yandex_translate import YandexTranslate

from config import config

translate_api = Blueprint("translate", __name__)

translate = YandexTranslate(config["integrations"]["yandex-translate"]["key"])


@lru_cache(maxsize=2048)
def yandex_translate_cached(text, langs):
    return translate.translate(text, langs)


@translate_api.route("/yandex/translate", methods=["POST"])
def yandex_translate():
    req_json = request.data
    if "text" not in req_json:
        return {}, status.HTTP_400_BAD_REQUEST
    translate_res = yandex_translate_cached(req_json["text"], "es-en")
    if translate_res["code"] != 200:
        return {}, status.HTTP_500_INTERNAL_SERVER_ERROR
    return {"text": translate_res["text"]}
