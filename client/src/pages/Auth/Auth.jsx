import React, { useState } from "react";
import styles from "./Auth.module.scss";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { useAuthStore } from "../../store/useAuthStore";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { checkAuth } = useAuthStore();

  const changeAuth = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setFullName("");
  };

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/signup", {
        fullName: fullName,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        console.log(response.data.error);
        return;
      }

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Created " + response.data.token);
        await checkAuth();
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Logined");
        await checkAuth();
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const token = localStorage.getItem("token");
  if (token) {
    navigate("/dashboard");
  }
  return (
    <div className={styles.wrapper}>
      {isLogin ? (
        <form className={styles.form} onSubmit={handleLogIn}>
          <h2 className={styles.formTitle}>Login</h2>
          <input
            type="email"
            placeholder="Email"
            required
            className={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={styles.formInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={styles.formButton}>
            Login
          </button>
          <p className={styles.formChanger} onClick={() => changeAuth()}>
            Don't have an account?
          </p>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleSignUp}>
          <h2 className={styles.formTitle}>Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            required
            className={styles.formInput}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={styles.formInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.formButton}>
            Sign Up
          </button>
          <p className={styles.formChanger} onClick={() => changeAuth()}>
            Already have an account?
          </p>
        </form>
      )}
    </div>
  );
};

export default Auth;
