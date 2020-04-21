import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./landing/Landing";
import Pool from "./pool/Pool";
import DonationSuccess from "./pool/DonationSuccess";

export default function App() {
  return (
    <Router>
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
