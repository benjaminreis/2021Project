import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./utilities/ProtectedRoute";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [user, setUser] = useState();

  return (
    <Router>
      <div className="App">
        {/* <header className="App-header"> */}
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/todo">todoo</Link>
            </li>
            {/* <li>
              <Link to="/users">Users</Link>
            </li> */}
          </ul>
        </nav>
        {/* </header> */}

        <Switch>
          <ProtectedRoute path="/todo" user={user}>
            <TodoPage />
          </ProtectedRoute>
          {/* <Route path="/todo">
            <TodoPage />
          </Route> */}
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/">
            <LoginPage setUser={setUser} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
