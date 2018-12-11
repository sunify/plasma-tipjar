import Web3Store from "./web3";
import { reaction, decorate, observable, computed } from "mobx";
import Balance from "./balance";
import LatestBlock from "./latestBlock";

class Account {
  public address: string;

  public get balance(): Balance {
    if (this.address) {
      return new Balance(this.address, this.web3, this.latestBlock);
    }

    return undefined;
  }

  constructor(public web3: Web3Store, public latestBlock: LatestBlock) {
    this.loadAddress = this.loadAddress.bind(this);
    this.watchAddress = this.watchAddress.bind(this);
    if (this.web3.injected) {
      this.watchAddress();
    } else {
      reaction(() => this.web3.injected, this.watchAddress);
    }
  }

  private watchAddress() {
    this.loadAddress();
    setInterval(this.loadAddress, 1000);
  }

  private loadAddress() {
    if (this.web3.injected) {
      this.web3.injected.eth.getAccounts().then(([address]) => {
        if (this.address !== address) {
          this.address = address;
        }
      });
    }
  }
}

decorate(Account, {
  address: observable,
  balance: computed,
});

export default Account;