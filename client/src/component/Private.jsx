import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function Private() {
  const { currUser } = useSelector((state) => state.user);
  return currUser ? <Outlet /> : <Navigate to={"/sign-in"} />;
}

export default Private;
