import React, { createContext, useEffect, useState } from "react";
import "./myStyles.css";
import SideBar from "./SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export const myContext = createContext();

const MainContainer = () => {
  const isLight = useSelector((state) => state.themeKey);
  const [refresh, setRefresh] = useState(true);
  const nav = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    console.log("User not authorized");
    nav("/");
  }

  return (
    <div className={"mainContainer" + (isLight ? "" : " mainDark")}>
      <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
        <SideBar />
        <Outlet />
      </myContext.Provider>
    </div>
  );
};

export default MainContainer;
