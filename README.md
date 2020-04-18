# Chinese to Pinyin and English converter

This is a simple library that attempts to take an input of Chinese characters, and return segmented pinyin,
with the English definition.

```javascript
const segments = await pinyinEn('我喜欢你')
```

will return:

```json
[
  {"chinese":"我","pinyin":"wo3","english":["I","me","my"],"ambiguous":false},
  {"chinese":"喜欢","pinyin":"xi3 huan5","english":["to like","to be fond of"],"ambiguous":false},
  {"chinese":"你","pinyin":"ni3","english":["you (informal, as opposed to courteous 您[nin2])"],"ambiguous":false}
]
```

## Ambiguity

Some characters are heteronyms, and will have ambiguous pronunciation and meaning. In these cases, we make a very
rough guess of the "correct" pronunciation and meaning. We do this by simply choosing the pronunciation with the
most English definitions attached as a rough proxy for how commonly used that version of the character is. These
guessed pronunciations will be marked as ambiguous:

```javascript
const segments = await pinyinEn('我都喜欢')
```

will return:

```json
[
  {"chinese":"我","pinyin":"wo3","english":["I","me","my"],"ambiguous":false},
  {
    "chinese":"都",
    "pinyin":"dou1",
    "english":["all","both","entirely","(used for emphasis) even","already","(not) at all"],
    "ambiguous":true
  },
  {"chinese":"喜欢","pinyin":"xi3 huan5","english":["to like","to be fond of"],"ambiguous":false}
]
```
