import * as React from 'react';
import TipJar from './tipJar';

export class App extends React.Component {
  render() {
    return (
      <div className="jars">
        <TipJar />
        <TipJar />
        <TipJar />
        <TipJar />
        <TipJar />
        <TipJar />
      </div>
    );
  }
}
