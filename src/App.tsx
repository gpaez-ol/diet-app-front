import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Configurator from "./modules/admin/components/Configurator";
import Login from "./modules/auth/components/Login";
import Signup from "./modules/auth/components/Signup";
import Browse from "./modules/browse/components/Browse";
import Dashboard from "./modules/dashboard/components/Dashboard";
import { Routes } from "./modules/general/utils/routes";
import AppBar from "./modules/navigation/components/AppBar";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={Routes.signup} exact>
            <Signup />
          </Route>
          <Route path={Routes.login} exact>
            <Login />
          </Route>
          <Route path={Routes.customerBrowse} exact>
            <AppBar />
            <Browse />
          </Route>
          <Route path={Routes.adminConfigurator} exact>
            <AppBar />
            <Configurator />
          </Route>
          <Route path={Routes.customerDashboard} exact>
            <AppBar />
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
