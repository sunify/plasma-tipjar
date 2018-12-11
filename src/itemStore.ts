import { decorate, observable, autorun } from 'mobx';
import Web3Store from './web3';
import Balance from './balance';
import LatestBlock from './latestBlock';

export default class ItemStore {
  public balance: Balance;

  constructor(
    public address: string,
    public name: string,
    public roles: string,
    public web3: Web3Store,
    public latestBlock: LatestBlock,
  ) {
    this.balance = new Balance(this.address, this.web3, this.latestBlock);
  }

  public tip(amount: number) {
    const cents = amount * (10 ** 18);
    return this.web3.injected.eth.getAccounts().then(([from]) => {
      return new Promise((resolve, reject) => {
        const promiEvent = this.web3.injected.eth.sendTransaction({
          from,
          to: this.address,
          value: cents,
        });
        promiEvent.once('transactionHash', resolve);
        promiEvent.once('error', reject);
        promiEvent.catch(reject);
      })
    });
  }
}

decorate(ItemStore, {
  balance: observable,
  address: observable,
  name: observable,
  roles: observable,
});
