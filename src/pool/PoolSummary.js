import React from "react";

import CopyPaste from "../copyPaste/CopyPaste";

const PoolSummary = ({ pool }) => {
  if (pool.donationAmount === 0) return null;
  return (
    <div className="PoolSummary">
      <div className="PoolSummary__MealCount">
        <span>Repas récoltés</span>
        <h1>{pool.donationAmount / 100}</h1>
      </div>
      <CopyPaste poolId={pool.id} />
    </div>
  );
};

export default PoolSummary;
