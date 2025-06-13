import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import userImage from "../../assets/userImage.png"; // Default user image

const Header = () => {
  const { user, loading } = useAuthStore();
  const token = localStorage.getItem("token");
  return (
    <header className={styles.header}>
      <Link to="/dashboard" className={styles.headerLogo}>
        SocialMe
      </Link>
      <div className={styles.links}>
        {token ? (
          <Link className={styles.profileLink} to="/profile">
            <div className={styles.profileAvatar}>
              <img
                src={!loading && user.profilepic ? user.profilepic : userImage}
                alt=""
                className={styles.avatar}
              />
            </div>
          </Link>
        ) : (
          <Link to="/auth" className={styles.link}>
            <FaUser fill="#ffffff" size={30} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
