import { decorate, observable } from 'mobx';

const delay = (ms, ...args) => new Promise((resolve) => setTimeout(resolve, ms, ...args));

export default class ItemStore {
  public balance: number = 0;

  constructor(
    public address: string,
    public name: string,
    public roles: string,
  ) {}

  tip(amount: number) {
    return delay(1000).then(() => {
      this.balance += amount;
    });
  }
}

decorate(ItemStore, {
  balance: observable,
  address: observable,
  name: observable,
  roles: observable,
});
