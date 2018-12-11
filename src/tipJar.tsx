import * as React from 'react';
import { observable, decorate, Reaction } from 'mobx';
import { observer } from 'mobx-react';

class TipJar extends React.Component {

  public amount = 0;

  public addAmount(add) {
    this.amount = Math.max(0, this.amount + add);
  }

  public handleSubmitClick(e: React.MouseEvent<any>) {
    e.currentTarget.blur();
  }

  public render() {
    return (
      <form className="jar" tabIndex={0}>
        <div className="jar-amount">
          <button type="button" onClick={() => this.addAmount(-1)}>
            <span>−</span>
          </button>

          <div>{this.amount}</div>

          <button type="button" onClick={() => this.addAmount(1)}>
            <span>+</span>
          </button>
        </div>
        <button
          className="jar-cover"
          type="button"
          onClick={(e) => {
            this.handleSubmitClick(e);
          }}
        >
          Put in the jar
        </button>
        <div className="jar-body">
          <div className="jar-total">100 LPD</div>
          <h3>@sunify</h3>
          <p>Memesier</p>
        </div>
      </form>
    );
  }
}

decorate(TipJar, {
  amount: observable
});

export default observer(TipJar);