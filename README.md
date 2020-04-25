# Chinese to Pinyin and English converter

This is a simple library that attempts to take an input of Chinese characters, and return segmented pinyin,
with English definitions.

Segmentation is provided by [`nodejieba`](https://github.com/yanyiwu/nodejieba).
Definitions and pinyin are provided by [CC-CEDICT](https://cc-cedict.org/wiki/).

```javascript
const segments = pinyinEn('我喜欢你')
```

will return:

```json
[
  [{"pinyin":"wǒ","english":["I","me","my"]}],
  [{"pinyin":"xǐhuan","english":["to like","to be fond of"]}],
  [{"pinyin":"nǐ","english":["you (informal, as opposed to courteous 您[nin2])"]}]
]
```

## Ambiguity

Some characters are heteronyms, and will have ambiguous pronunciation and meaning. In these cases, we make a very
rough guess of the "correct" pronunciation and meaning in an arbitrary context. We do this by simply choosing the
pronunciation with the longest English definition as a rough proxy for how commonly used that version of the
character is. This is obviously very fragile, but it's the best we can do without becoming more context-aware.

```javascript
const segments = pinyinEn('我都喜欢')
```

will return:

```json
[
  [{"pinyin":"wǒ","english":["I","me","my"]}],
  [
    {"pinyin":"dōu","english":["all","both","entirely","(used for emphasis) even","already","(not) at all"]},
    {"pinyin":"dū","english":["capital city","metropolis"]},
    {"pinyin":"Dū","english":["surname Du"]}
  ],
  [{"pinyin":"xǐhuan","english":["to like","to be fond of"]}]
]
```
