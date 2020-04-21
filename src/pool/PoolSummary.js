import React from "react";

import CopyPaste from "../copyPaste/CopyPaste";
import SocialShare from '../socialShare/SocialShare';

const PoolSummary = ({ pool }) => {
  return (
    <div className="PoolSummary">
      <div className="PoolSummary__MealCount">
        {pool.mealCount + pool.startAt > 0 && (
          <>
            <span>Repas collectés</span>
            <h1>{pool.mealCount + pool.startAt}</h1>
          </>
        )}
        {pool.mealCount + pool.startAt === 0 && (
          <span>
            {pool.admin
              ? "Votre collecte est vide pour le moment, offrez un premier repas avant de la partager"
              : `La collecte de ${pool.creatorName} est vide pour le moment, soyez le premier à offrir un repas !`}
          </span>
        )}
      </div>
      {pool.mealCount === 0 && pool.startAt > 0 && (
        <div className="PoolSummary__NotEmpty">
          Votre collecte n'est pas vide à sa création car nous avons
          comptabilisé
          <br />
          les repas que vous avez déjà offerts dans une précédente collecte
        </div>
      )}
      <h2>Partagez la collecte</h2>
      <CopyPaste poolId={pool.id} />
      <SocialShare poolId={pool.id} />
      {pool.donationsNames.length > 0 && (
        <div className="PoolSummary__Donateurs">
          <strong>Donateurs</strong>
          <br />
          <br />
          {pool.donationsNames.join(" • ")}
        </div>
      )}
    </div>
  );
};

export default PoolSummary;
