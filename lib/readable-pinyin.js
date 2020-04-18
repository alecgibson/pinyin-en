const toneRegex = /([^:]+)(:?\d)/
const vowelRegex = /[aeiou]/i;

const tonalLetters = {
  a: ['', 'ā', 'á', 'ǎ', 'à'],
  e: ['', 'ē', 'é', 'ě', 'è'],
  i: ['', 'ī', 'í', 'ǐ', 'ì'],
  o: ['', 'ō', 'ó', 'ǒ', 'ò'],
  u: ['', 'ū', 'ú', 'ǔ', 'ù'],
  v: ['', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
}

function wordWithTone(word) {
  const matches = word.match(toneRegex);
  if (!matches) return word;
  let [match, pinyin, tone] = matches;
  if (!tone || tone === '5') return pinyin;
  if (pinyin.match('a')) return pinyin.replace('a', tonalLetters.a[+tone]);
  if (pinyin.match('e')) return pinyin.replace('e', tonalLetters.e[+tone]);
  if (pinyin.match('ou')) return pinyin.replace('o', tonalLetters.o[+tone]);
  let vowel = finalVowel(word);
  if (!vowel) return word; // Some words exist like "m2"
  if (tone.startsWith(':')) {
    vowel = 'v';
    tone = tone.substring(1);
  }
  return pinyin.replace(vowel, tonalLetters[vowel][+tone]);
}

function finalVowel(word) {
  for (let i = word.length - 1; i >= 0; i--) {
    if (word[i].match(vowelRegex)) return word[i].toLowerCase();
  }
}

module.exports = (pinyin) => {
  return pinyin
    .split(/\s+/g)
    .map(wordWithTone)
    .join('')
};
