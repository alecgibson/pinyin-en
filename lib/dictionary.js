const fs = require('fs');
const readline = require('readline');

function byNumberOfDefinitions(entry1, entry2) {
  return entry2.english.length - entry1.english.length;
}

module.exports = async () => {
  const input = fs.createReadStream('data/dictionary.txt');
  const lines = readline.createInterface({input, crlfDelay: Infinity});
  const lineRegex = /(.+)\s+(.+)\s+\[(.+)\]\s+\/(.+)\//
  const dictionary = {};

  for await (const line of lines) {
    // Ignore comments
    if (line.startsWith('#')) continue;
    const [match, traditional, simplified, pinyin, definitions] = line.match(lineRegex);
    const english = definitions.split('/');
    dictionary[simplified] = dictionary[simplified] || [];
    dictionary[simplified].push({pinyin, english});
    // Use the number of definitions as a very rough guide as to how likely
    // it is that - in an arbitrary sentence - this definition is the correct
    // definition
    dictionary[simplified].sort(byNumberOfDefinitions);
  }

  return dictionary;
};
