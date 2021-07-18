import logo from "./logo.svg";
import "./App.css";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <header className="App-header"> */}
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
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
          <Route path="/todo"><TodoPage /></Route>
          {/* <Route path="/users">
            <Users />
          </Route> */}
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
