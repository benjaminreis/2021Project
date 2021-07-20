import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const ProtectedRoute = ({ children, user, ...rest }) => {
  const [name, setName] = useState("");

  useEffect(() => {}, []);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user?.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
