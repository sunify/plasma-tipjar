import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import App from './src/app';
import ItemsStore from './src/itemsStore';
import Web3Store from './src/web3';

const web3 = new Web3Store();
const items = new ItemsStore(web3);

render(
  <Provider
    items={items}
    web3={web3}
  >
    <App />
  </Provider>,
  document.getElementById('app')
);
