const dictionaryFactory = require('../lib/dictionary');
const expect = require('chai').expect;

describe('dictionary', () => {
  let dictionary;

  before((done) => {
    dictionaryFactory().then((dict) => {
      dictionary = dict;
      done();
    })
  });

  it('contains a simple entry', () => {
    expect(dictionary['狗'][0].pinyin).to.equal('gǒu');
    expect(dictionary['狗'][0].english[0]).to.equal('dog');
  });

  describe('heteronyms', () => {
    const heteronyms = [
      {chinese: '了', pinyin: 'le'},
      {chinese: '都', pinyin: 'dōu'},
      {chinese: '还', pinyin: 'hái'},
    ];

    heteronyms.forEach((heteronym) => {
      it(`prioritises the ${heteronym.pinyin} pronunciation of ${heteronym.chinese}`, () => {
        const entries = dictionary[heteronym.chinese];
        expect(entries).to.have.length.greaterThan(0);
        expect(entries[0].pinyin).to.equal(heteronym.pinyin);
      });
    });
  });
});
