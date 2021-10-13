import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Browse from "./modules/browse/components/Browse";
import Dashboard from "./modules/dashboard/components/Dashboard";
import AppBar from "./modules/navigation/components/AppBar";

export interface User {
  id: string;
  name: string;
  img: string;
}

export interface AccountMenuProps {
  user: User;
  updateUser: () => void;
}

export default function App() {
  let mockUser: User = { id: "someId", name: "Juan", img: "someURL" };

  const [user, setUser] = React.useState<User>({ id: "", name: "", img: "" });

  const toggleUser = () => {
    setUser(mockUser);
  };

  return (
    <Router>
      <div>
        <AppBar {...{ user: user, updateUser: toggleUser }} />
        <Switch>
          <Route path="/browse" exact>
            <Browse />
          </Route>
          <Route path="/" exact>
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
