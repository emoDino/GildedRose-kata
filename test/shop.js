const assert = require('chai').assert;

const Item = require('../app/item.js');
const Shop = require('../app/shop.js');

const agedBrie =        new Item('Aged Brie', 100, 25);
const backstagePasses = new Item('ETC Backstage Passes', 15, 30);
const item =            new Item('Item', 7, 7);
const sulfuras =        new Item('Sulfuras', 100, 80);

describe('Shop', () => {
  let myShop;

  describe('updateQuality', () => {
    beforeEach(() => {
      
    });

    it('should decrement the sellIn property', done => {
      myShop.updateQuality();
      const firstItem = myShop.items[0];
      assert.equal( firstItem.sellIn, 99 );
      done();
    });

    it('should update the quality of the item', done => {
      done();
    });

    it('should never increment the quality of an item over 50', done => {
      done();
    });

    describe('Aged Brie', () => {
      it('should increase the quality', done => {
        done();
      });
    });

    describe('Sulfuras', () => {
      it('should never decrease in quality', done => {
        done();
      });
    });

    describe('Backstage Passes', () => {
      it('should increase in quality by 2 for < 10 days left', done => {
        done();
      });

      it('should increase in quality by 3 for < 5 days left', done => {
        done();
      });

      it('should drop to 0 quality after sellIn date', done => {
        done();
      });
    });
  });
});