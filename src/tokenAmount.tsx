import * as React from 'react';

type TokenAmountProps = {
  amount: number | string | undefined;
};

const TokenAmount: React.SFC<TokenAmountProps> = (props) => {
  if (props.amount === undefined) {
    return <>...</>;
  }
  const amount = Number(props.amount) / (10 ** 18);
  return (
    <>
      {Math.round(amount * 100) / 100} LEAP
    </>
  );
}

export default TokenAmount;
