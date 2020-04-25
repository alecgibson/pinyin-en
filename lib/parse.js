const dictionary = require('./dictionary');
const jieba = require('nodejieba');

function parse(characters) {
  const segments = jieba.cut(characters);
  const converted = [];
  for (const segment of segments) converted.push(definition(segment));
  return converted;
};

function definition(chinese) {
  if (!chinese) return null;
  if (dictionary[chinese]) return dictionary[chinese];

  let pinyin = '';
  for (const character of chinese) {
    if (dictionary[character]) pinyin += dictionary[character][0].pinyin
    else pinyin += character;
  }
  return [{chinese, pinyin, english: []}];
}

module.exports = parse;
