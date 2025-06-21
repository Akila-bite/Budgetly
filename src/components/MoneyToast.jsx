import React from 'react';
import './MoneyToast.css'; // we'll define styles next

const MoneyToast = ({ message }) => {
  return (
    <div className="money-toast">
      <span className="money-icon">💸💵</span>
      <p>{message}</p>
    </div>
  );
};

export default MoneyToast;
