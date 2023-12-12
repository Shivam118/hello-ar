import React from "react";
import { BsGrid } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import styles from "../assets/styles/Sidebar.module.css";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const options = [
    { icon: <BsGrid className={styles.icongrid} size="25px" />, text: "Songs" },
  ];
  return (
    <div className={styles.sidebarContainer}>
      <h1 className={styles.logoText}>Logo</h1>
      <div className={styles.sidebarPortion}>
        {options.map((option, index) => (
          <div className={styles.sideText} key={index}>
            {option.icon}
            {"    "}
            {option.text}
          </div>
        ))}
        <div
          className={styles.logout}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          <IoExitOutline size="25px" />
          {"   "}
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
