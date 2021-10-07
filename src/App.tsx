import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Browse from "./modules/browse/components/Browse";
import Dashboard from "./modules/dashboard/components/Dashboard";
import AppBar from "./modules/navigation/components/AppBar";

export default function App() {
  return (
    <Router>
      <div>
        <AppBar />
        <Switch>
          <Route path="/browse">
            <Browse />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
