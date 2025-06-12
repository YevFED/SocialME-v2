import React from "react";
import styles from "./Profile.module.scss";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileBlock}>
        <div className={styles.avatar}>
          <img src="/" alt="Profile Avatar" />
        </div>
        <div className={styles.profileInfo}>
          <p className={styles.profileName}></p>
          <p className={styles.profileBio}></p>
        </div>
        <div className={styles.profileSettings}>
          <Link to="/settings" className={styles.settingsLink}>
            Settings
          </Link>
          <Link to="/logout" className={styles.logoutLink}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
