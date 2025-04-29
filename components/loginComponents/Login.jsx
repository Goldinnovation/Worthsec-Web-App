"use client";
import React, { useState } from "react";
import style from "@styles/login-sign.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginAPI } from "@/app/api/login/loginApi";

const Login = () => {
  const router = useRouter();
  const [loginData, setloginData] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  const [flashtoggle, setFlashToggle] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const handleInput = (e) => {
    setloginData({ ...loginData, [e.target.className]: e.target.value });
  };

  const handleInputToBackend = async (email, password) => {
    try {
      
       const res = await LoginAPI(email, password)
      if (!res.ok) {
        throw new error();
      } else {
        setFlashToggle(true);
        setFlashMessage("Login Successful - page is loading...");
     
        const data = await res.json();
        if (data.message === "Login Successful") {
          const user = data.userNameData;
          const username = user?.userName;

          const intervalId = setInterval(() =>{
            setFlashToggle(false);
            setFlashMessage("");
            router.prefetch(`/user/${username}`);
            router.push(`/user/${username}`);
            clearInterval(intervalId)
          }, 3000)
          
         
        } else {
          console.error("failed to handle data message", data.message);
        }
      }
    } catch (error) {
      console.error("fetch error");
    }
  };

  const handleUserPasswordString = (email, password) => {
    if (
      password &&
      password.length > 7 &&
      !password.includes(" ") &&
      !password.includes("--") &&
      !password.includes("++") &&
      !password.includes("./")
    ) {
      handleInputToBackend(email, password);
      setloginData({
        loginEmail: "",
        loginPassword: "",
        });

    } else {
      setFlashToggle(true);
      setFlashMessage("Password is invalid.");

      const intervalId = setInterval(() => {
        setFlashToggle(false);
        setFlashMessage("");
        clearInterval(intervalId);
      }, 3000);
    }
  };
  const handleSubmit = async (e) => {
    const userEmail = loginData.loginEmail;
    const userPassword = loginData.loginPassword;
    if (!userEmail || !userPassword) {
      console.log("Email and password are required");
      return;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.(com|de)$/;

      if (
        emailRegex.test(userEmail) &&
        !userEmail.includes("--") &&
        !userEmail.includes("++") &&
        !userEmail.includes("./")
      ) {
        handleUserPasswordString(userEmail, userPassword);
      } else {
        console.log("Email is incorrect");
        setFlashToggle(true);
        setFlashMessage(
          "Email is invalid. Please ensure it includes '@', ends with '.com' or '.de', and does not contain '--', '++', or './'."
        );

        const intervalId = setInterval(() => {
          setFlashToggle(false);
          setFlashMessage("");
          clearInterval(intervalId);
        }, 3000);
      }
    }

    e.preventDefault();
  };


  return (
    <div>
 
      <div className={style["logoWorthsec"]}>
        <button className={style["worthsecAreabtn"]} disabled>
          WORTHSEC
        </button>
      </div>

      {flashtoggle && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.36)",
            width: "18%",
            height: "10%",
            position: "absolute",
            top: "67%",
            left: "73%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid white",
            color: "white",
            borderRadius: "7px",
            fontSize: "12px",
            textAlign: "center",
            padding: "3%",
          }}
        >
          {" "}
          {flashMessage}
        </div>
      )}
      <div className={style["loginSection"]}>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.92)",
            height: "450px",
            width: "20%",
            position: "absolute",
            top: "20%",
            left: " 72%",
            borderRadius: "10px ",
            display: "flex",
            flexDirection: " column",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(99, 99, 99, 0.61)",
              height: "100%",
              textAlign: "center",
              border: "1px solid white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                height: "100%",
              }}
            >
              <div
                style={{
                  color: "white",
                  height: "10%",
                  // backgroundColor:"orange",
                  borderBottom: "1px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h2>Login</h2>
                {/* <hr /> */}
              </div>
              <div
                style={{
                  //   backgroundColor: "green",
                  height: "45%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "25%",
                  //   marginTop: "10%",
                }}
              >
                <div className={style["loginEmailName"]}>
                  <input
                    type="email"
                    name=""
                    id=""
                    className="loginEmail"
                    style={{
                      // height: "5%",
                      width: "70%",
                      border: "1px solid black",
                      borderRadius: "7px",
                      paddingLeft: "2%",
                    }}
                    onChange={handleInput}
                    placeholder="Enter your Email"
                  />
                </div>
                <div className={style["loginPassword"]}>
                  <input
                    type="password"
                    className="loginPassword"
                    style={{
                      width: "70%",
                      border: "1px solid black",
                      borderRadius: "7px",
                      paddingLeft: "2%",
                    }}
                    onChange={handleInput}
                    placeholder="Enter your Password"
                  />
                </div>
              </div>

              <div
                style={{
                  //   backgroundColor: "pink",
                  height: "10%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <button
                  style={{
                    backgroundColor: "white",
                    border: "1px solid black",
                    height: "60%",
                    width: "50%",
                    borderRadius: "50px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adds shadow
                    cursor: "pointer", // Makes it look clickable
                    fontSize: "16px", // Adjusts font size
                    fontWeight: "400", // Makes text bold
                    transition: "all 0.3s ease-in-out",
                  }}
                  onClick={handleSubmit}
                >
                  Create Account
                </button>
              </div>

              <div
                style={{
                  // backgroundColor: "blue",
                  height: "30%",
                  display: "flex",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10%",
                }}
              >
                <p className={style["noAccText"]}>No Account ?</p>
                <Link
                  href={"/signUp"}
                  style={{
                    width: "40%",
                    fontSize: "15px",
                    color: "skyblue",
                    border: "1px solid white",
                    backgroundColor: "rgba(18, 18, 18, 0.32)",
                    textDecoration: "none",
                    borderRadius: "7px",
                    padding: "3%",
                  }}
                >
                  Create New Account{" "}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
