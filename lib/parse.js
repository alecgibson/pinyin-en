const dictionaryFactory = require('./dictionary');
const jieba = require('nodejieba');

let dictionary;

async function parse(characters) {
  if (!dictionary) dictionary = await dictionaryFactory();
  const segments = jieba.cut(characters);
  const converted = [];
  for (const segment of segments) {
    converted.push(await definition(segment));
  }
  return converted;
};

async function definition(chinese) {
  if (dictionary[chinese]) {
    const pinyin = dictionary[chinese][0].pinyin;
    const english = dictionary[chinese][0].english;
    const ambiguous = dictionary[chinese].length > 1;
    return {chinese, pinyin, english, ambiguous};
  };

  const pinyin = chinese.reduce((py, character) => py + dictionary[character][0], '');
  // Mark as ambiguous because the dictionary was missing this entry
  return {chinese, pinyin, english: [], ambiguous: true};
}

module.exports = parse;
