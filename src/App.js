import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga";

import Landing from "./landing/Landing";
import Pool from "./pool/Pool";
import Livreur from "./livreur/Livreur";
import DonationSuccess from "./pool/DonationSuccess";

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("UA-162359879-1");
}

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    }
  }, [location]);

  return (
    <Switch>
      <Route path="/collecte/merci/:mealCount">
        <DonationSuccess />
      </Route>
      {/* <Route path="/collecte/:poolId/admin/:adminId">
        <Pool />
      </Route> */}
      <Route path="/collecte">
        <Pool />
      </Route>
      <Route path="/livreur/:livreurId">
        <Livreur />
      </Route>
      <Route path="/">
        <Landing />
      </Route>
    </Switch>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
