import Web3Store from "./web3";
import { decorate, observable, computed } from "mobx";

class LatestBlock {
  public latestBlockNumber = 0;
  public prevLatestBlockNumber = 0;

  public get updated() {
    return this.latestBlockNumber - this.prevLatestBlockNumber > 0;
  }

  constructor(public web3: Web3Store) {
    this.loadBlockNumber = this.loadBlockNumber.bind(this);
    this.updateBlockNumber = this.updateBlockNumber.bind(this);
    setInterval(this.loadBlockNumber, 20000);
  }

  public updateBlockNumber(blockNumber: number) {
    this.prevLatestBlockNumber = this.latestBlockNumber;
    this.latestBlockNumber = blockNumber;
  }

  private loadBlockNumber() {
    this.web3.local.eth.getBlockNumber().then(blockNumber => {
      this.prevLatestBlockNumber = this.latestBlockNumber;
      this.latestBlockNumber = blockNumber;
    });
  }
}

decorate(LatestBlock, {
  latestBlockNumber: observable,
  prevLatestBlockNumber: observable,
  updated: computed,
});

export default LatestBlock;