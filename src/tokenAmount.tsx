import * as React from 'react';

type TokenAmountProps = {
  amount: number | string;
};

const TokenAmount: React.SFC<TokenAmountProps> = (props) => {
  const amount = Number(props.amount) / (10 ** 18);
  return (
    <>
      {Math.round(amount * 100) / 100}
    </>
  );
}

export default TokenAmount;
