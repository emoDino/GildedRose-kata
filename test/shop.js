const assert = require('chai').assert;

const Item = require('../app/item.js');
const Shop = require('../app/shop.js');

const agedBrie =        new Item('Aged Brie', 100, 25);
const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 30);
const sulfuras =        new Item('Sulfuras, Hand of Ragnaros', 100, 80);

describe('Shop', () => {
  let myShop;

  describe('updateQuality', () => {
    beforeEach(() => {
      myShop = new Shop([ new Item('Item', 5, 5) ]);
    });

    it('should decrement the sellIn property', done => {
      myShop.updateQuality();
      const firstItem = myShop.items[0];
      assert.equal( firstItem.sellIn, 4 );
      done();
    });

    it('should update the quality of the item', done => {
      myShop.updateQuality();
      const firstItem = myShop.items[0];
      assert.equal( firstItem.quality, 4 );
      done();
    });

    it('should decrement the quality twice when past sellIn', done =>{
      myShop = new Shop([ new Item( 'item', 0, 10 ) ]);
      myShop.updateQuality();
      const firstItem = myShop.items[0];      
      assert.equal(firstItem.quality, 8);
      done();
    })

    it('should never increment the quality of an item over 50', done => {
      myShop = new Shop([
        new Item('Aged Brie', 3, 50),
        new Item('Backstage passes to a TAFKAL80ETC concert', 3, 49),
      ]);
      myShop.updateQuality();
      const brie =   myShop.items[0];
      const passes = myShop.items[1];
      assert.equal( brie.quality, 50 );
      assert.equal( brie.quality, 50 );      
      done();
    });

    describe('Aged Brie', () => {
      it('should increase the quality', done => {
        myShop = new Shop([ agedBrie ]);
        myShop.updateQuality();
        const brie = myShop.items[0];
        assert.equal(brie.quality, 26);
        done();
      });
    });

    describe('Sulfuras', () => {
      beforeEach(() => {
        myShop = new Shop([ sulfuras ]);
      });

      it('should always be quality 80', done => {
        myShop.updateQuality();
        const myHandOfRag = myShop.items[0];
        assert.equal(myHandOfRag.quality, 80);
        done();
      });

      it('should never have to be sold', done => {
        myShop.updateQuality();
        const myHandOfRag = myShop.items[0];
        assert.equal(myHandOfRag.sellIn, 100);
        done();
      });
    });

    describe('Backstage Passes', () => {
      it('should increase in quality by 1 for > 10 days left', done => {
        myShop = new Shop([ backstagePasses ]);
        myShop.updateQuality();
        const myPasses = myShop.items[0];
        assert.equal(myPasses.quality, 31);
        done();
      });
      it('should increase in quality by 2 for <= 10 days left', done => {
        myShop = new Shop([ 
          new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0), 
        ]);
        myShop.updateQuality();
        const myPasses = myShop.items[0];
        assert.equal(myPasses.quality, 2);
        done();
      });

      it('should increase in quality by 3 for <= 5 days left', done => {
        myShop = new Shop([ 
          new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0), 
        ]);
        myShop.updateQuality();
        const myPasses = myShop.items[0];
        assert.equal(myPasses.quality, 3);
        done();
      });

      it('should drop to 0 quality after sellIn date', done => {
        myShop = new Shop([ 
          new Item('Backstage passes to a TAFKAL80ETC concert', 0, 999), 
        ]);
        myShop.updateQuality();
        const myPasses = myShop.items[0];
        assert.equal(myPasses.quality, 0);
        done();
      });
    });
  });
});