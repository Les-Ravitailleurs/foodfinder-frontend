import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

import Landing from "./landing/Landing";
import Pool from "./pool/Pool";
import DonationSuccess from "./pool/DonationSuccess";

const customHistory = createBrowserHistory();

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("UA-162359879-1");
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
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}
