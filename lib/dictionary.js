const fs = require('fs');
const path = require('path');
const readablePinyin = require('./readable-pinyin');

const input = fs.readFileSync(path.join(__dirname, '..', 'data', 'dictionary.txt'), {encoding: 'utf8'});
const lines = input.split(/[\r\n]+/);
const lineRegex = /(.+)\s+(.+)\s+\[(.+)\]\s+\/(.+)\//;
const dictionary = {};

for (const line of lines) {
  // Ignore comments
  if (line.startsWith('#')) continue;
  const [match, traditional, simplified, py, definitions] = line.match(lineRegex);
  const pinyin = readablePinyin(py);
  const english = definitions.split('/');
  dictionary[simplified] = dictionary[simplified] || [];
  dictionary[simplified].push({pinyin, english});
  // Use the length of definitions as a very rough guide as to how likely
  // it is that - in an arbitrary sentence - this definition is the correct
  // definition
  dictionary[simplified].sort(byLengthOfDefinition);
}

function byLengthOfDefinition(entry1, entry2) {
  if (hasCapital(entry1.pinyin) && !hasCapital(entry2.pinyin)) return 1;
  if (!hasCapital(entry1.pinyin) && hasCapital(entry2.pinyin)) return -1;
  return entry2.english.join('').length - entry1.english.join('').length;
}

function hasCapital(s) {
  return s !== s.toLowerCase();
}

module.exports = dictionary;
