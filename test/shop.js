const assert = require('chai').assert;

const Shop = require('../app/shop.js');
const Item = require('../app/item.js');

const testItem = new Item('Aged Brie', 100, 100);

describe('Shop', () => {
  let myShop;
  beforeEach(() => {
    myShop = new Shop([ testItem ]);
  });
  describe('updateQuality', () => {
    it('should decrement the sellIn property', done => {
      myShop.updateQuality();
      const firstItem = myShop.items[0];
      assert.equal( firstItem.sellIn, 99 );
      done();
    });
  });
});