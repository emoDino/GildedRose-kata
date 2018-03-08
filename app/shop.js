const AGED_BRIE        = 'Aged Brie';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS         = 'Sulfuras, Hand of Ragnaros';

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    let currItem, qualityChange = 0;

    for (let i = 0; i < this.items.length; i++) {
      currItem = this.items[i];
      if (currItem.name === SULFURAS) {
        // do nothing
        currItem.quality = 80;
      } else {
        // update quality
        switch (currItem.name) {
          case AGED_BRIE:
            qualityChange++;
            break;
          case BACKSTAGE_PASSES:
            qualityChange++;
            if (currItem.sellIn <= 10) qualityChange++;
            if (currItem.sellIn <= 5) qualityChange++;
            if (currItem.sellIn === 0) {
              qualityChange = 0;
              currItem.quality = 0;
            }
            break;
          default:
            if (currItem.sellIn <= 0 ) qualityChange--;
            qualityChange--;
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