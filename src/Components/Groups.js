import React, { useContext, useEffect, useState } from "react";
import "./myStyles.css";
import { Refresh, Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Logo from "../images/live-chat.png";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { refreshSidebarFun } from "../Features/refreshSidebar";
import { useNavigate } from "react-router-dom";

const Groups = () => {
  const refresh = useSelector((state)=>state.refreshKey);
  const isLight = useSelector((state) => state.themeKey);
  const dispatch = useDispatch();
  const [groups, SetGroups] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const user = userData.data;
  const nav = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    nav("/");
  }
  useEffect(() => {
    console.log("Users refreshed : ", user.token);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .get("https://chatappbackend-gkwr.onrender.com/chat/fetchGroups", config)
      .then((response) => {
        console.log("Group Data from API ", response.data);
        SetGroups(response.data);
      });
  }, [refresh]);




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
        className="list-container"
      >
        <div className={"ug-header" + (isLight ? "" : " dark")}>
          <img
            src={Logo}
            style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
          />
          <p className={"ug-title" + (isLight ? "" : " dark")}>
            Available Groups
          </p>
          <IconButton
            className={"icon" + (isLight ? "" : " dark")}
            onClick={() => {
              dispatch(refreshSidebarFun())
            }}
          >
            <Refresh />
          </IconButton>
        </div>
        <div className={"sb-search" + (isLight ? "" : " dark")}>
          <IconButton className={"icon" + (isLight ? "" : " dark")}>
            <Search />
          </IconButton>
          <input
            placeholder="Search"
            className={"search-box" + (isLight ? "" : " dark")}
          />
        </div>
        <div className="ug-list">
          {groups.map((group, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={"list-item" + (isLight ? "" : " dark")}
                key={index}
                onClick={() => {
                  console.log("Creating chat with group", group.name);
                  const config = {
                    headers: {
                      Authorization: `Bearer ${userData.data.token}`,
                    },
                  };
                  axios.put(
                    "https://chatappbackend-gkwr.onrender.com/chat/addSelfToGroup",
                    {
                      chatId:group._id,
                      userId: user._id,
                    },
                    config
                  );
                  dispatch(refreshSidebarFun());
                }}
              >
                <p className={"conIcon" + (isLight ? "" : " conIconDark")}>T</p>
                <p className={"conTitle" + (isLight ? "" : " conTitleDark")}>
                  {group.chatName}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Groups;
