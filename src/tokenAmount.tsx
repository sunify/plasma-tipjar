import * as React from 'react';
import Balance from './balance';

type TokenAmountProps = {
  amount: number | string | undefined;
};

const TokenAmount: React.SFC<TokenAmountProps> = (props) => {
  if (props.amount === undefined) {
    return <>...</>;
  }
  const amount = Balance.toTokens(props.amount);
  return (
    <>
      {Math.round(amount * 100) / 100} LEAP
    </>
  );
}

export default TokenAmount;
