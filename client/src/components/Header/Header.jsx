import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const token = localStorage.getItem("token");
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.headerLogo}>
        SocialMe
      </Link>
      <div className={styles.links}>
        {token ? (
          <Link className={styles.profileLink} to="/profile">
            {/* Will be the userAvatar */}
          </Link>
        ) : (
          <Link to="/auth" className={styles.link}>
            <FaUser fill="#ffffff" size={20} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
