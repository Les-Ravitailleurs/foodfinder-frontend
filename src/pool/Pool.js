import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "./Pool.css";
import PoolDescription from "./PoolDescription";
import PoolSummary from "./PoolSummary";
import GiveModule from "./GiveModule";
import api from "../api";

import couteau from "./couteau.svg";
import fouet from "./fouet1.svg";
import spatule from "./spatule.svg";

const Pool = () => {
  const { poolId } = useParams();
  const [pool, setPool] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const getPool = async () => {
      try {
        const { data } = await api.get(`/pool/${poolId}`);
        setPool(data);
      } catch (e) {
        history.push("/");
      }
    };
    getPool();
  }, [poolId, history]);

  return (
    <div className="Pool">
      <div className="PoolLeft">
        <img alt="fouet" src={fouet} className="PoolLeft__bgFouet" />
        <img alt="spatule" src={spatule} className="PoolLeft__bgSpatule" />
        <img alt="couteau" src={couteau} className="PoolLeft__bgCouteau" />
        {pool && (
          <>
            <PoolDescription pool={pool} />
            <PoolSummary pool={pool} />
          </>
        )}
      </div>
      <div className="PoolRight">
        {pool && (
          <>
            <GiveModule pool={pool} />
          </>
        )}
      </div>
    </div>
  );
};

export default Pool;
