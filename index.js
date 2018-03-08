'use strict';

const Item = require('./app/item.js');
const Shop = require('./app/shop.js');

const shop = new Shop([ new Item('Aged Brie', 100, 100) ])
shop.updateQuality();

console.log(shop.items);
