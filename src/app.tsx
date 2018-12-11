import * as React from 'react';
import TipJar from './tipJar';
import { inject, observer } from 'mobx-react';
import ItemsStore from './itemsStore';
import Web3Store from './web3';
import Account from './account';
import TokenAmount from './tokenAmount';

type AppProps = {
  items?: ItemsStore;
  web3?: Web3Store;
  account?: Account;
}

class App extends React.Component<AppProps, any> {
  render() {
    const { items, web3, account } = this.props;

    if (!items) {
      return null;
    }

    return (
      <div>
        {account.balance &&
          <>MetaMask Balance: <TokenAmount amount={account.balance.value} /></>}

        {web3.injectedReady && web3.injectedAvailable && !web3.injected &&
          <button onClick={() => web3.enable()}>Connect 🦊</button>}
        <div className="jars">
          {items.list.map(item => (
            <TipJar
              key={item.address}
              address={item.address}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default inject('items', 'web3', 'account')(observer(App));