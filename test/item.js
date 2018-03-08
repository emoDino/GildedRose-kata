const assert = require('chai').assert;

const Item = require('../app/item.js');

const testItem = new Item('Aged Brie', 100, 100);

describe('Item', () => {
  let myItem;
  describe('constructor', () => {
    beforeEach(() => {
      myItem = new Item('Aged Brie', 100, 100);
    });
    it('should initialize the name field', done => {
      assert.equal(myItem.name, 'Aged Brie');
      done();
    });
    it('should initialize the sellIn field', done => {
      assert.equal(myItem.sellIn, 100);
      done();
    });
    it('should initialize the quality field', done => {
      assert.equal(myItem.quality, 100);
      done();
    });
  });
});