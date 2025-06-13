import React, { useEffect } from "react";
import styles from "./Profile.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import userImage from "../../assets/userImage.png"; // Default user image

const Profile = () => {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  console.log("User " + user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileBlock}>
        <div className={styles.blockWrapper}>
          <div className={styles.avatar}>
            <img
              src={!loading && user.profilepic ? user.profilepic : userImage}
              alt="Profile Avatar"
            />
          </div>
          <div className={styles.profileInfo}>
            <p className={styles.profileName}>Yevhenii Chaika</p>

            <p className={styles.profileBio}>Developer</p>
          </div>
          <div className={styles.profileSettings}>
            <Link to="/settings" className={styles.settingsLink}>
              Settings
            </Link>
            <p onClick={handleLogout} className={styles.logoutLink}>
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
