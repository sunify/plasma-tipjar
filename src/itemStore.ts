import { decorate, observable, autorun } from 'mobx';
import Web3Store from './web3';
import Balance from './balance';
import LatestBlock from './latestBlock';
import Account from './account';
import { helpers, Tx } from 'leap-core';

export default class ItemStore {
  public balance: Balance;

  constructor(
    public address: string,
    public name: string,
    public roles: string,
    public web3: Web3Store,
    public latestBlock: LatestBlock,
    public account: Account,
  ) {
    this.balance = new Balance(this.address, this.web3, this.latestBlock);
  }

  public tip(amount: number) {
    const cents = Balance.toCents(amount);
    return this.web3.local.getUnspent(this.account.address)
      .then(utxos => {
        const inputs = helpers.calcInputs(utxos, this.account.address, cents, 0);
        const outputs = helpers.calcOutputs(utxos, inputs, this.account.address, this.address, cents, 0);
        return Tx.transfer(inputs, outputs).signWeb3(this.web3.injected);
      })
      .then(signed => {
        return this.web3.local.eth.sendSignedTransaction(signed.toRaw() as any);
      }).then(res => {
        console.log(res);
      });

    // return new Promise((resolve, reject) => {
    //   const promiEvent = this.web3.injected.eth.sendTransaction({
    //     from: this.account.address,
    //     to: this.address,
    //     value: cents,
    //   });
    //   promiEvent.once('transactionHash', resolve);
    //   promiEvent.once('error', reject);
    //   promiEvent.catch(reject);
    // });
  }
}

decorate(ItemStore, {
  balance: observable,
  address: observable,
  name: observable,
  roles: observable,
});
