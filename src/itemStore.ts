import { decorate, observable, autorun } from 'mobx';
import Web3Store from './web3';

const delay = (ms, ...args) => new Promise((resolve) => setTimeout(resolve, ms, ...args));

export default class ItemStore {
  public balance: number = 0;

  constructor(
    public address: string,
    public name: string,
    public roles: string,
    public web3: Web3Store,
  ) {
    this.loadBalance = this.loadBalance.bind(this);
    setInterval(this.loadBalance, 3000);
    autorun(this.loadBalance);
  }

  public loadBalance() {
    this.web3.local.eth.getBalance(this.address).then(balance => {
      this.balance = Number(balance);
    });
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
