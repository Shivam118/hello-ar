import React, { useEffect } from "react";
import Header from "../components/Header";
import { MdPlayCircle } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Sidebar from "../components/Sidebar";
import MediaPlayer from "../components/MediaPlayer";
import { useState } from "react";
import AddScreenModal from "../components/AddScreenModal";
import styles from "../assets/styles/MusicDashboard.module.css";
import { useNavigate } from "react-router-dom";
import songs from "../assets/Songs";

const MusicDashboard = () => {
  const navigate = useNavigate();
  const [addSongScreen, setAddSongScreen] = useState(false);
  const [currSong, setCurrSong] = useState(null);
  const [songsList, setSongsList] = useState(songs);

  const deleteSong = (id) => {};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {addSongScreen && (
        <AddScreenModal
          addSongScreen={setAddSongScreen}
          songsList={setSongsList}
        />
      )}
      <Sidebar />
      <div className={styles.music_box}>
        <Header addSongScreen={setAddSongScreen} />
        <table className={styles.tableContent} cellSpacing={0} cellPadding={0}>
          <thead>
            <tr>
              <th>SONG NAME</th>
              <th>SOURCE</th>
              <th>ADDED ON</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <br />
          <br />
          <tbody>
            {songsList.map((item) => (
              <tr key={item.id}>
                <td className={styles.photu}>
                  <img src={item.photoAlbum} alt="albumLogo" />
                  {item.name}
                </td>
                <td>{item.source}</td>
                <td>{item.date}</td>
                <td
                  className={styles.clickable}
                  onClick={() => setCurrSong(item.name)}
                >
                  <MdPlayCircle color="#FDB927" size="40px" />
                </td>
                <td
                  className={styles.clickable}
                  onClick={() => deleteSong(item.id)}
                >
                  <AiOutlineDelete size="14px" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <MediaPlayer playing={currSong} songs={songsList} />
      </div>
    </div>
  );
};

export default MusicDashboard;
