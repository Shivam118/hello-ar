import React from "react";
import styles from "../assets/styles/Header.module.css";

const Header = (props) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.menu}>
        First-level Menu / Second-level Menu / <span>Current Page</span>
      </div>
      <div className={styles.songSection}>
        <h1 className={styles.songText}>Songs</h1>
        <button onClick={() => props.addSongScreen(true)}>Add Songs</button>
      </div>
    </div>
  );
};

export default Header;
