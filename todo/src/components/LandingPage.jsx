import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>LANDED HERE</h1>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}
