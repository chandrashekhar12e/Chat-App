import { Delete, Send } from "@mui/icons-material";
import { IconButton, Skeleton } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import MessageOthers from "./MessageOthers";
import MessageSelf from "./MessageSelf";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { myContext } from "./MainContainer";
import { io } from "socket.io-client";

const ENDPOINT = "https://chatappbackend-gkwr.onrender.com";

let socket;

const ChatArea = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const nav = useNavigate();
  if (!userData) {
    console.log("User not authorized");
    nav("/");
  }
  const isLight = useSelector((state) => state.themeKey);
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&");

  const [allMessages, setAllMessages] = useState([]);

  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setloaded] = useState(false);

  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);
  const [fetch, setFetch] = useState(false);

  const sendMessage = () => {
    var data = null;
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .post(
        "https://chatappbackend-gkwr.onrender.com/message/",
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        data = response.data;
        console.log("Message Fired");
        socket.emit("newMessage", data);
        setFetch((prev) => !prev);
      });
  };

  useEffect(() => {
    console.log("connected");
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connection", () => {
      setSocketConnectionStatus(!socketConnectionStatus);
    });
    socket.on("messageRecieved", (newMessage) => {
      console.log("---------------------------------message recieved");
      setAllMessages((prev) => [...prev, newMessage]);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current &&
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
  });

  useEffect(() => {
    console.log("Users refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .get("https://chatappbackend-gkwr.onrender.com/message/" + chat_id, config)
      .then(({ data }) => {
        setAllMessages(data);
        setloaded(true);
        socket.emit("joinChat", chat_id);
      });
    setAllMessagesCopy(allMessages);
  }, [refresh, chat_id, userData.data.token, fetch]);

  if (!loaded) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  } else {
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
          className="chatareaContainer"
        >
          <div className={"chatAreaHeader" + (isLight ? "" : " dark")}>
            <p className="conIcon">{chat_user[0]}</p>
            <div className="headerText">
              <p className={"conTitle" + (isLight ? "" : " dark")}>
                {chat_user}
              </p>
            </div>
            <IconButton>
              <Delete className={isLight ? "" : " dark"} />
            </IconButton>
          </div>
          <div className={"messagesContainer" + (isLight ? "" : " dark")}>
            {allMessages.slice(0).map((message, index) => {
              const sender = message.sender;
              const self_id = userData.data._id;
              if (sender._id === self_id) {
                return <MessageSelf props={message} key={index} />;
              } else {
                return <MessageOthers props={message} key={index} />;
              }
            })}
            <div ref={messagesEndRef} className="BOTTOM" />
          </div>
          <div className={"textInputArea" + (isLight ? "" : " dark")}>
            <input
              placeholder="Type a Message"
              className={"search-box" + (isLight ? "" : " dark")}
              value={messageContent}
              onChange={(e) => {
                setMessageContent(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  console.log("----send-----");
                  sendMessage();
                  setMessageContent("");
                  setRefresh(!refresh);
                }
              }}
            />
            <IconButton
              className={"icon" + (isLight ? "" : " dark")}
              onClick={() => {
                sendMessage();
                setMessageContent("");
                setRefresh(!refresh);
              }}
            >
              <Send />
            </IconButton>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
};

export default ChatArea;
