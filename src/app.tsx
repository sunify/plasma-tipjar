import * as React from 'react';
import TipJar from './tipJar';
import { inject, observer } from 'mobx-react';
import ItemsStore from './itemsStore';

type AppProps = {
  items?: ItemsStore;
}

class App extends React.Component<AppProps, any> {
  render() {
    const { items } = this.props;

    if (!items) {
      return null;
    }

    return (
      <div className="jars">
        {items.list.map(item => (
          <TipJar
            key={item.address}
            address={item.address}
          />
        ))}
      </div>
    );
  }
}

export default inject('items')(observer(App));