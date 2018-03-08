'use strict';

const AGED_BRIE        = 'Aged Brie'.toUpperCase();
const SULFURAS         = 'Sulfuras, Hand of Ragnaros'.toUpperCase();

function isAgedBrie(item) {
  return item.name.toUpperCase() === AGED_BRIE;
}

function isBackstagePass(item) {
  return item.name.toUpperCase().includes('BACKSTAGE PASSES');
}

function isConjured(item) {
  return item.name.toUpperCase().includes('CONJURED');
}

function isSulfuras(item) {
  return item.name.toUpperCase() === SULFURAS;
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    let currItem, qualityChange = 0;

    for (let i = 0; i < this.items.length; i++) {
      currItem = this.items[i];
      if (isSulfuras(currItem)) {
        // do nothing
        currItem.quality = 80;
      } else {
        // update quality
        if (isAgedBrie(currItem)) {
          qualityChange++;
        }
        else if (isBackstagePass(currItem)) {
          qualityChange++;
          if (currItem.sellIn <= 10) qualityChange++;
          if (currItem.sellIn <= 5) qualityChange++;
          if (currItem.sellIn === 0) {
            qualityChange = 0;
            currItem.quality = 0;
          }
        } else {
          if (currItem.sellIn <= 0 ) qualityChange--;
          qualityChange--;
          if (isConjured(currItem)) qualityChange *= 2;
        }


        currItem.quality += qualityChange;
        if (currItem.quality < 0) currItem.quality = 0;
        if (currItem.quality > 50) currItem.quality = 50;

        // update sellin for every item
        currItem.sellIn = (currItem.sellIn === 0) ? 0 : currItem.sellIn - 1;
      }
    }
    return this.items;
  };
}

module.exports = Shop;