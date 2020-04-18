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
  if (!chinese) return null;

  if (dictionary[chinese]) {
    const pinyin = dictionary[chinese][0].pinyin;
    const english = dictionary[chinese][0].english;
    const ambiguous = dictionary[chinese].length > 1;
    return {chinese, pinyin, english, ambiguous};
  };

  let pinyin = '';
  for (const character of chinese) {
    if (dictionary[character]) pinyin += dictionary[character][0].pinyin
    else pinyin += character;
  }
  // Mark as ambiguous because the dictionary was missing this entry
  return {chinese, pinyin, english: [], ambiguous: true};
}

module.exports = parse;
