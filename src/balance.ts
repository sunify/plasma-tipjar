import Web3Store from "./web3";
import { decorate, observable, autorun, reaction } from "mobx";
import LatestBlock from "./latestBlock";

class Balance {
  public value: number;

  constructor(
    public address: string,
    public web3: Web3Store,
    public latestBlock: LatestBlock,
  ) {
    this.loadBalance = this.loadBalance.bind(this);
    autorun(this.loadBalance);
    reaction(() => this.latestBlock.updated, (updated) => {
      if (updated) {
        this.loadBalance();
      }
    });
  }

  public loadBalance() {
    this.web3.local.eth.getBalance(this.address).then(balance => {
      this.value = Number(balance);
    });
  }
}

decorate(Balance, {
  value: observable,
  address: observable,
})

export default Balance;