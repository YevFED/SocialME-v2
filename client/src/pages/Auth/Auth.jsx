import React, { useState } from "react";
import styles from "./Auth.module.scss";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className={styles.wrapper}>
      {isLogin ? (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <h2 className={styles.formTitle}>Login</h2>
          <input
            type="email"
            placeholder="Email"
            required
            className={styles.formInput}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={styles.formInput}
          />

          <button type="submit" className={styles.formButton}>
            Login
          </button>
          <p className={styles.formChanger} onClick={() => setIsLogin(false)}>
            Don't have an account?
          </p>
        </form>
      ) : (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <h2 className={styles.formTitle}>Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            required
            className={styles.formInput}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className={styles.formInput}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={styles.formInput}
          />
          <button type="submit" className={styles.formButton}>
            Sign Up
          </button>
          <p className={styles.formChanger} onClick={() => setIsLogin(true)}>
            Already have an account?
          </p>
        </form>
      )}
    </div>
  );
};

export default Auth;
