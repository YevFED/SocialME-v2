import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">SocialMe</Link>
      <div className={styles.links}> 
        {localStorage.getItem("token") ? (
          <Link to="/profile">{/* Will be the userAvatar */}</Link>
        ) : (
          <Link to="/login">
            <FaUser fill="black" size={25} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
