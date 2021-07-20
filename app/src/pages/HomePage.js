import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = ({ children }) => {
  useEffect(() => {}, []);

  return (
    <>
      <h5>Home</h5> <Link to="/todo">todoo</Link>
    </>
  );
};

export default HomePage;
