import { observable, decorate } from 'mobx';
import ItemStore from './itemStore';

export default class ItemsStore {
  public list = observable.array([
    new ItemStore(
      '0x51bab87c42d384d1cd3056d52d97c84ddaa65fe4',
      'Jan',
      'Main-net commander'
    ),
    new ItemStore(
      '0x8ab21c65041778dfc7ec7995f9cdef3d5221a5ad',
      'Alex',
      'Memesier'
    ),
    new ItemStore(
      '0xaf0939af286a35dbfab7ded7c777a5f6e8be26a8',
      'Kosta',
      'Docs Maintainer'
    ),
    new ItemStore(
      '0x8db6b632d743aef641146dc943acb64957155388',
      'Johann',
      'Researcher'
    ),
    new ItemStore(
      '0x3b528d4aB08EF019972E6bD7f40D55ab35c0846b',
      'Evgeni',
      'Testnet Commander'
    ),
  ]);

  public itemByAddress(address: string) {
    let index = -1;
    for (let i = 0; i < this.list.length; i += 1) {
      if (this.list[i].address === address) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      return undefined;
    }

    return this.list[index];
  }
}

decorate(ItemsStore, {
  list: observable,
});