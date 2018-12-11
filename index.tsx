import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import { App } from './src/app';

render(<Provider><App /></Provider>, document.getElementById('app'));
