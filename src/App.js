import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

import Landing from "./landing/Landing";
import Pool from "./pool/Pool";
import Livreur from "./livreur/Livreur";
import DonationSuccess from "./pool/DonationSuccess";

const customHistory = createBrowserHistory();

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("UA-162359879-1");
  ReactGA.set({ page: customHistory.location.pathname });
  ReactGA.pageview(customHistory.location.pathname);
  customHistory.listen((location) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });
}

export default function App() {
  return (
    <Router history={customHistory}>
      <Switch>
        <Route path="/collecte/:poolId/merci/:mealCount">
          <DonationSuccess />
        </Route>
        <Route path="/collecte/:poolId/admin/:adminId">
          <Pool />
        </Route>
        <Route path="/collecte/:poolId">
          <Pool />
        </Route>
        <Route path="/livreur/:livreurId">
          <Livreur />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}
