import React, { useEffect, useState } from "react";
import Logo from "../images/live-chat.png";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [logInStatus, setLogInStatus] = useState("");
  const [signInStatus, setSignInStatus] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      navigate("/app/welcome");
    }
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    setLoading(false)
    try{
      const config={
        headers:{
          "Content-type":"application/json"
        }
      }
      const response = await axios.post(
        "https://chatappbackend-gkwr.onrender.com/user/login/",
        data,
        config
      )
      setLogInStatus({msg:"success",key:Math.random()})
      setLoading(false)
      localStorage.setItem("userData",JSON.stringify(response))
      navigate("/app/welcome")
    }catch(error){
      setLogInStatus({
        msg:"Invalid User name or password",
        key:Math.random()
      })
      setLoading(false);
    }
  };

  const signUpHandler = async (e) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "https://chatappbackend-gkwr.onrender.com/user/register/",
        data,
        config
      );
      console.log(response);
      setSignInStatus({ msg: "Success", key: Math.random() });
      navigate("/app/welcome");
      localStorage.setItem("userData", JSON.stringify(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.status === 405) {
        setSignInStatus({
          msg: "User with this email to already Exists",
        });

      }
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <div className="imageContainer">
        <img src={Logo} alt="Live Chat" className="welcomeLogo" />
      </div>
      <div className="loginDetailContainer">
        {isLoginPage ? (
          <p className="loginText">Login to your Account</p>
        ) : (
          <p className="loginText">Register yourself to continue!</p>
        )}
        <TextField
          onChange={changeHandler}
          id="standard-basic"
          label="Enter User name"
          variant="outlined"
          name="name"
        />
        {!isLoginPage && (
          <TextField
            onChange={changeHandler}
            id="standard-basic"
            label="Enter Email Address"
            variant="outlined"
            name="email"
          />
        )}
        <TextField
          onChange={changeHandler}
          id="standard-password-input"
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
        />

        <Button
          onClick={isLoginPage?loginHandler:signUpHandler}
          variant="outlined"
          color="success"
          disabled={loading}
        >
          
          {loading?"Loading":(isLoginPage ? "Login" : "Sign Up")}
        </Button>

        {isLoginPage ? (
          <p>
            Don't have an Account?{" "}
            <span
              onClick={() => setIsLoginPage((prev) => !prev)}
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Already have an account!{" "}
            <span
              onClick={() => setIsLoginPage((prev) => !prev)}
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Log In
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
