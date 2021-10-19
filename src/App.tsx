import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./modules/auth/components/Login";
import Browse from "./modules/browse/components/Browse";
import Dashboard from "./modules/dashboard/components/Dashboard";
import AppBar from "./modules/navigation/components/AppBar";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/browse" exact>
            <AppBar />
            <Browse />
          </Route>
          <Route path="/" exact>
            <AppBar />
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
