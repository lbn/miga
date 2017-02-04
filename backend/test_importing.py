import pytest

from importing import *

@pytest.mark.parametrize("text,expected", [
    ("A. B. C.", [SplitSentence(text=s, para_index=0) for s in ("A.", "B.", "C.")]),
    ("A. B.\n C.", [SplitSentence(text=s, para_index=0) for s in ("A.", "B.", "C.")]),
    ("A. B.\n\n C.", [
        SplitSentence(text="A.", para_index=0),
        SplitSentence(text="B.", para_index=0),
        SplitSentence(text="C.", para_index=1),
    ]),
])
def test_answer(text, expected):
    assert list(split_sentences(text)) == expected
