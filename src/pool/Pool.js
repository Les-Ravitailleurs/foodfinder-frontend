import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";

import "./Pool.css";
import PoolDescription from "./PoolDescription";
import PoolSummary from "./PoolSummary";
import GiveModule from "./GiveModule";
import api from "../api";
import Footer from "../footer/Footer";
import AssoList from "../assoList/AssoList";
import HowWorks from "../howWorks/HowWorks";

import couteau from "./couteau.svg";
import fouet from "./fouet1.svg";
import spatule from "./spatule.svg";

const Pool = () => {
  const { poolId, adminId } = useParams();
  const [pool, setPool] = useState(null);
  const history = useHistory();

  if (adminId) {
    localStorage.setItem(`admin-${poolId}`, adminId);
    history.push(`/collecte/${poolId}`);
  }

  const getPool = useCallback(async () => {
    try {
      const savedAdminId = localStorage.getItem(`admin-${poolId}`);
      const { data } = await api.get(
        `/pool/${poolId}${savedAdminId ? `?adminId=${savedAdminId}` : ""}`
      );
      if (savedAdminId && data.admin === false) {
        localStorage.removeItem(`admin-${poolId}`);
      }
      setPool(data);
    } catch (e) {
      history.push("/");
    }
  }, [history, poolId]);

  useEffect(() => {
    getPool();
  }, [getPool]);

  return (
    <div className="Pool">
      <div className="PoolLeft">
        <div style={{ maxWidth: "1000px", margin: "auto" }}>
          <img alt="fouet" src={fouet} className="PoolLeft__bgFouet" />
          <img alt="spatule" src={spatule} className="PoolLeft__bgSpatule" />
          <img alt="couteau" src={couteau} className="PoolLeft__bgCouteau" />
          {pool && (
            <>
              <PoolDescription pool={pool} getPool={getPool} />
              {!isMobile && (
                <>
                  <br />
                  <HowWorks />
                  <br />
                </>
              )}
              {isMobile && <GiveModule pool={pool} />}
              {isMobile && <HowWorks />}
              <PoolSummary pool={pool} />
            </>
          )}
          <AssoList />
        </div>
        <Footer />
      </div>
      {!isMobile && (
        <div className="PoolRight">
          {pool && (
            <>
              <GiveModule pool={pool} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Pool;
