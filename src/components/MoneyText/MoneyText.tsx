import React from 'react';

import './MoneyText.css';

export interface MoneyTextProps {
  value: string | number;
}

export const MoneyText = ({ value }: MoneyTextProps) => {
  return <span>$ {value}</span>;
};
