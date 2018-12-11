import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import App from './src/app';
import ItemsStore from './src/itemsStore';

render(
  <Provider
    items={new ItemsStore()}
  >
    <App />
  </Provider>,
  document.getElementById('app')
);
