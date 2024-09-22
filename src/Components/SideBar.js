import React, { useContext, useEffect, useState } from "react";
import "./myStyles.css";
import {
  AccountCircle,
  AddCircle,
  Chat,
  GroupAdd,
  LightMode,
  Logout,
  Nightlight,
  PersonAdd,
  Search,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Features/themeSlice";
import { AnimatePresence, motion } from "framer-motion";
import Conversation from "./Conversation";

const SideBar = () => {
  const isLight = useSelector((state) => state.themeKey);

  const [isMobileScreen, setIsMobileScreen] = useState(
    window.screen.width < 640
  );
  const [showConversations, setShowConversations] = useState(false);

  const setScreen = () => {
    setIsMobileScreen(window.screen.width < 640);
    console.log(isMobileScreen);
  };
  useEffect(() => {
    window.addEventListener("resize", setScreen);
    return () => window.removeEventListener("resize", setScreen);
  }, [setScreen]);

  
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: "0.3",
        }}
        className="sidebarContainer"
      >
        <div className={"sb-header " + (isLight ? "" : "dark")}>
          <div>
            <IconButton>
              <AccountCircle className={isLight ? "" : "dark"} />
            </IconButton>
          </div>
          <div>
            {isMobileScreen && (
              <IconButton
                onClick={() => {
                  setShowConversations(true);
                  navigate("/app/conversation");
                }}
              >
                <Chat className={isLight ? "" : "dark"} />
              </IconButton>
            )}

            <IconButton
              onClick={() => {
                navigate("users");
              }}
            >
              <PersonAdd className={isLight ? "" : "dark"} />
            </IconButton>
            <IconButton
              onClick={() => {
                navigate("groups");
              }}
            >
              <GroupAdd className={isLight ? "" : "dark"} />
            </IconButton>
            <IconButton
              onClick={() => {
                navigate("create-groups");
              }}
            >
              <AddCircle className={isLight ? "" : "dark"} />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(toggleTheme());
              }}
            >
              {isLight ? (
                <LightMode />
              ) : (
                <Nightlight className={isLight ? "" : "dark"} />
              )}
            </IconButton>
            <IconButton>
              <Logout
                className={isLight ? "" : "dark"}
                onClick={logOutHandler}
              />
            </IconButton>
          </div>
        </div>
        <div className={"sb-search " + (isLight ? "" : "dark")}>
          <IconButton className={isLight ? "" : "dark"}>
            <Search />
          </IconButton>
          <input
            placeholder="search"
            className={"search-box " + (isLight ? "" : "dark")}
          />
        </div>
        {isMobileScreen ?"":(
          <div className="sb-conversations">
          <Conversation />
          </div>
          
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SideBar;
