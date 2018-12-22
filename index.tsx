import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import App from './src/app';
import ItemsStore from './src/itemsStore';
import Web3Store from './src/web3';
import Account from './src/account';
import LatestBlock from './src/latestBlock';

const web3 = new Web3Store();
const latestBlock = new LatestBlock(web3);
const account = new Account(web3, latestBlock);
const items = new ItemsStore(web3, latestBlock, account);

render(
  <Provider
    items={items}
    web3={web3}
    account={account}
  >
    <App />
  </Provider>,
  document.getElementById('app')
);
