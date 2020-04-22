const readable = require('../lib/readable-pinyin');
const expect = require('chai').expect;

describe('readable pinyin', () => {
  describe('tones', () => {
    it('applies first tone to the letter a', () => {
      expect(readable('ma1')).to.equal('mā');
    });

    it('respects fifth tone', () => {
      expect(readable('le5')).to.equal('le');
    });

    it('applies umlauts', () => {
      expect(readable('nu:3')).to.equal('nǚ')
    });

    it('allows m2 (嘸)', () => {
      expect(readable('m2')).to.equal('m');
    });

    it('puts the tone over the o in ou', () => {
      expect(readable('gou3')).to.equal('gǒu');
    });

    it('returns the pinyin if no tone is defined', () => {
      expect(readable('AA')).to.equal('AA');
    });
  });

  describe('formatting', () => {
    it('strips whitespace', () => {
      expect(readable('wo3 men5')).to.equal('wǒmen')
    });
  });
});
