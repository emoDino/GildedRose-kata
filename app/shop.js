class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    let currItem, qualityChange = 0;

    for (var i = 0; i < this.items.length; i++) {
      currItem = this.items[i];
      if (currItem.name === 'Sulfuras, Hand of Ragnaros') {
        // do nothing
        currItem.quality = 80;
      } else {
        // update quality
        switch (currItem.name) {
          case 'Aged Brie':
            qualityChange++;
            break;
          case 'Backstage passes to a TAFKAL80ETC concert':
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