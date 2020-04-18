import React from "react";

const PoolSummary = ({pool}) => {
  if (pool.donationAmount === 0) return null;
  return <div className="PoolSummary">{pool.donationAmount / 100} repas collecté</div>;
};

export default PoolSummary;
