import React, { useState } from "react";
import styles from "./Auth.module.scss";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      {isLogin ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            required
            className={styles.formInput}
          />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
          <p onClick={() => setIsLogin(false)}>Don't have an account?</p>
        </form>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Register</h2>
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
          <button type="submit">Sign Up</button>
          <p onClick={() => setIsLogin(true)}>Already have an account?</p>
        </form>
      )}
    </div>
  );
};

export default Auth;
