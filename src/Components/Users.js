import React, { useEffect, useState } from "react";
import "./myStyles.css";
import { RefreshOutlined, Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Logo from "../images/live-chat.png";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { refreshSidebarFun } from "../Features/refreshSidebar";

const Users = () => {
  const isLight = useSelector((state) => state.themeKey);
  const [refresh,setRefresh]= useState(true)
  const [users,setUsers] = useState([])
  const userData = JSON.parse(localStorage.getItem("userData"))
  const nav = useNavigate();

  const dispatch = useDispatch();

  useEffect(()=>{
    if(!userData){
      console.log("user not authorized")
      nav("/");
    }
  })


  useEffect(()=>{
    console.log("Users refreshed")
    console.log(userData.data.token)
    const config={
      headers:{
        Authorization: `Bearer ${userData.data.token}`
      }
    }

    axios.get("https://chatappbackend-gkwr.onrender.com/user/fetchusers",config).then((data)=>{
      setUsers(data.data)
    })
  },[refresh])
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
          <Img  src={Logo} style={{ height: "2rem", width: "2rem", marginLeft: "10px" }} />
          <p className={"ug-title" + (isLight ? "" : " dark")}>Available Users</p>
          <IconButton
            className={isLight?"":"dark"}
            onClick={()=>{
              setRefresh(!refresh)

            }}
          >
            <RefreshOutlined/>
          </IconButton>
        </div>
        <div className={"sb-search" + (isLight ? "" : " dark")}>
          <IconButton>
            <Search className={isLight ? "" : " dark"} />
          </IconButton>
          <input
            placeholder="search"
            className={"search-box" + (isLight ? "" : " dark")}
          />
        </div>
        <div className="ug-list">
          {users.map((user,index)=>{
            return(

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={"list-item" + (isLight ? "" : " dark")}
                key={index}
                onClick={()=>{
                  console.log("Creating chat with ",user.name)
                  const config ={
                    headers :{
                      Authorization:`Bearer ${userData.data.token}`
                    }
                  }
                  axios.post(
                    "https://chatappbackend-gkwr.onrender.com/chat/",
                    {
                      userId:user._id
                    },
                    config
                  ).then(

                    dispatch(refreshSidebarFun())
                  )
                }}
              >
                <p className={"conIcon" + (isLight ? "" : " conIconDark")}>{(user.name)[0].toUpperCase()}</p>
                <p className={"conTitle" + (isLight ? "" : " dark")}>{user.name}</p>
              </motion.div>
          
          )
        })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Users;
