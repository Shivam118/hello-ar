import React, { useState } from "react";
import styles from "../assets/styles/AddScreen.module.css";
import previewImg from "../assets/images/image.png";

const AddScreenModal = (props) => {
  const [fileName, setFileName] = useState("");

  console.log(fileName);

  const handleAddSong = (e) => {
    e.preventDefault();

    const date = new Date();
    const songName = e.target.sName.value;
    const songURL = e.target.sLink.value;
    const songSource = e.target.sSource.value;
    props.songsList((prev) => [
      ...prev,
      {
        name: songName,
        source: songSource,
        url: songURL,
        date: date.toLocaleDateString().split("/").reverse().join("-"),
        photoAlbum: previewImg,
      },
    ]);
    props.addSongScreen(false);
  };

  return (
    <div className={styles.AddScreenModal}>
      <div className={styles.container}>
        <span className={styles.header}>
          <h5>Add Song</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            onClick={() => props.addSongScreen(false)}
          >
            <path
              d="M8.92473 7.99919L13.6122 2.41169C13.6908 2.31884 13.6247 2.17776 13.5033 2.17776H12.0783C11.9944 2.17776 11.914 2.21526 11.8587 2.27955L7.99258 6.88848L4.12651 2.27955C4.07294 2.21526 3.99258 2.17776 3.90687 2.17776H2.48187C2.36044 2.17776 2.29437 2.31884 2.37294 2.41169L7.06044 7.99919L2.37294 13.5867C2.35534 13.6074 2.34405 13.6327 2.3404 13.6596C2.33676 13.6866 2.34092 13.714 2.35239 13.7386C2.36386 13.7632 2.38216 13.784 2.40511 13.7986C2.42806 13.8131 2.4547 13.8208 2.48187 13.8206H3.90687C3.9908 13.8206 4.07115 13.7831 4.12651 13.7188L7.99258 9.10991L11.8587 13.7188C11.9122 13.7831 11.9926 13.8206 12.0783 13.8206H13.5033C13.6247 13.8206 13.6908 13.6796 13.6122 13.5867L8.92473 7.99919Z"
              fill="black"
              fillOpacity="0.45"
            />
          </svg>
        </span>
        <hr />
        <form onSubmit={handleAddSong}>
          <div className={styles.FormFields}>
            <label htmlFor="sName">Song Name</label>
            <br />
            <input type="text" id="sName" placeholder="Song Name" /> <br />
            <br />
            <label htmlFor="sLink">Song Link</label>
            <br />
            <input type="text" id="sLink" placeholder="URL" /> <br /> <br />
            <label htmlFor="sSource">Song Source</label>
            <br />
            <input type="text" id="sSource" placeholder="Song Source" />
            <br />
            <br />
            <label className={styles.uploadBtn} htmlFor="uploadFile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M4.81235 3.96851H5.96704V9.25444C5.96704 9.32319 6.02329 9.37944 6.09204 9.37944H7.02954C7.09829 9.37944 7.15454 9.32319 7.15454 9.25444V3.96851H8.31235C8.41704 3.96851 8.47485 3.84819 8.41079 3.76694L6.66079 1.55132C6.64909 1.53638 6.63415 1.52429 6.6171 1.51599C6.60004 1.50768 6.58132 1.50336 6.56235 1.50336C6.54338 1.50336 6.52465 1.50768 6.5076 1.51599C6.49054 1.52429 6.4756 1.53638 6.46391 1.55132L4.71391 3.76538C4.64985 3.84819 4.70766 3.96851 4.81235 3.96851ZM12.2811 8.78569H11.3436C11.2748 8.78569 11.2186 8.84194 11.2186 8.91069V11.3169H1.9061V8.91069C1.9061 8.84194 1.84985 8.78569 1.7811 8.78569H0.843597C0.774847 8.78569 0.718597 8.84194 0.718597 8.91069V12.0044C0.718597 12.281 0.942035 12.5044 1.2186 12.5044H11.9061C12.1827 12.5044 12.4061 12.281 12.4061 12.0044V8.91069C12.4061 8.84194 12.3498 8.78569 12.2811 8.78569Z"
                  fill="black"
                  fillOpacity="0.85"
                />
              </svg>
              {"           "}
              Click to Upload Profile Thumbnail
            </label>
            <input
              type="file"
              id="uploadFile"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => setFileName(e.target.files)}
            />
            <br />
            <br />
            <div className={styles.previewFile}>
              <span>
                {/* <img src={""} className={styles.previewFileImg} /> */}
                {/* <span className={styles.previewFileName}>{fileName}</span> */}
                <img
                  src={previewImg}
                  alt="preview File"
                  className={styles.previewFileImg}
                />
                <span className={styles.previewFileName}>
                  {fileName ? fileName[0].name : "No File Selected"}
                </span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <g clipPath="url(#clip0_18_158)">
                  <path
                    d="M4.62476 1.87372H4.49976C4.56851 1.87372 4.62476 1.81747 4.62476 1.74872V1.87372H9.37476V1.74872C9.37476 1.81747 9.43101 1.87372 9.49976 1.87372H9.37476V2.99872H10.4998V1.74872C10.4998 1.19716 10.0513 0.748718 9.49976 0.748718H4.49976C3.94819 0.748718 3.49976 1.19716 3.49976 1.74872V2.99872H4.62476V1.87372ZM12.4998 2.99872H1.49976C1.22319 2.99872 0.999756 3.22216 0.999756 3.49872V3.99872C0.999756 4.06747 1.05601 4.12372 1.12476 4.12372H2.06851L2.45444 12.2956C2.47944 12.8284 2.92007 13.2487 3.45288 13.2487H10.5466C11.081 13.2487 11.5201 12.83 11.5451 12.2956L11.931 4.12372H12.8748C12.9435 4.12372 12.9998 4.06747 12.9998 3.99872V3.49872C12.9998 3.22216 12.7763 2.99872 12.4998 2.99872ZM10.4263 12.1237H3.57319L3.19507 4.12372H10.8044L10.4263 12.1237Z"
                    fill="black"
                    fillOpacity="0.45"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_18_158">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <br />
            <br />
            <span>
              Image has to be of aspect ratio 1:1 with a size of 3000 pixels x
              3000 pixels
            </span>
          </div>
          <div className={styles.actionBtn}>
            <button
              className={styles.cancelBtn}
              onClick={() => props.addSongScreen(false)}
            >
              Cancel
            </button>
            <input type="submit" value="Add" className={styles.addBtn} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScreenModal;
