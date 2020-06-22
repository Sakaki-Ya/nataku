import React, { useState, useRef, useEffect } from "react";
import { firebase, auth, db, functions, storage } from "../Firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "../styles/Footer.module.scss";
import temp from "../styles/Template.module.scss";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";

type SourceType = "Giphy" | "Tenor";

let getTimer: NodeJS.Timeout;
let sourceName = "Giphy";
let swipe = false;

const settings = {
  className: "slider variable-width",
  dots: false,
  arrows: false,
  infinite: true,
  centerMode: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
};

const searchSources: SourceType[] = ["Giphy", "Tenor"];

const loaderStyle = css`
  margin: auto;
`;

const Footer: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  const SearchSource = searchSources.map((source: SourceType, index) => (
    <div
      className={`${style.footer__selectButton} ${style[source]}`}
      key={index}
    >
      <input
        onClick={(e) => {
          sourceName = e.currentTarget.id;
          if (inputRef.current)
            inputRef.current.placeholder =
              "Search (Powered by " + sourceName + ")";
        }}
        id={source}
        type="radio"
        name="sourceSelect"
        hidden
        defaultChecked={source === "Giphy" ? true : false}
        accept="image/*"
      />
      <label htmlFor={source}>{source}</label>
    </div>
  ));

  const [res, setRes] = useState([]);
  const searchGifs = (e: {
    persist: () => void;
    target: { value: string };
  }) => {
    e.persist();
    if (getTimer) clearTimeout(getTimer);
    getTimer = setTimeout(async () => {
      const getGifs = functions.httpsCallable("getGifs");
      const props = { source: sourceName, keyword: e.target.value };
      const response = await getGifs(props);
      setRes(response.data);
    }, 300);
  };

  const getGifURL = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    if (swipe) return;
    const src = e.currentTarget.src;
    const date = new Date().getTime().toString();
    const postsRef = await db.collection("posts").doc(date);
    await postsRef.set({
      url: src,
      avatar: currentUser ? currentUser.photoURL : null,
      name: currentUser ? currentUser.displayName : null,
      uid: currentUser ? currentUser.uid : null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setRes([]);
    if (inputRef.current) inputRef.current.value = "";
  };
  const searchResult = res.map((src, index) => {
    return (
      <div key={index}>
        <img
          onTouchStart={() => {
            if (inputRef.current) inputRef.current.blur();
          }}
          onMouseDown={() => (swipe = false)}
          onMouseMove={() => (swipe = true)}
          onMouseUp={getGifURL}
          src={src}
          className={style.footer__gif}
          alt="gif"
        />
      </div>
    );
  });

  const [uploading, setUploading] = useState(false);
  const uploadImg = async (file: FileList | null) => {
    if (!file) return;
    setUploading(true);
    const date = new Date().getTime().toString();
    const uploadRef = await storage.ref().child("posts/" + date);
    const uploadPost = file[0];
    await uploadRef.put(uploadPost);
    const uploadURL = await uploadRef.getDownloadURL();
    const postsRef = await db.collection("posts").doc(date);
    await postsRef.set({
      url: uploadURL,
      avatar: currentUser ? currentUser.photoURL : null,
      name: currentUser ? currentUser.displayName : null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setUploading(false);
  };

  return (
    <footer className={style.footer__wrap}>
      <BarLoader
        css={loaderStyle}
        width={200}
        height={12}
        color={"#3ab549"}
        loading={uploading}
      />
      {res !== [] && (
        <div className={style.footer__searchResult}>
          <Slider {...settings}>{searchResult}</Slider>
        </div>
      )}
      <div>{SearchSource}</div>
      <div className={style.footer__forms}>
        <input
          onChange={searchGifs}
          ref={inputRef}
          className={`${temp.input} ${style.footer_search}`}
          placeholder={
            inputRef.current
              ? inputRef.current.placeholder
              : "Search (Powerd by Giphy)"
          }
          type="text"
        />
        <input
          onChange={(e) => uploadImg(e.target.files)}
          type="file"
          id="upload"
          hidden
        />
        <label className={style.footer__upload} htmlFor="upload">
          <p>&#x2b06;</p>
          <span>Upload</span>
        </label>
      </div>
    </footer>
  );
};

export default Footer;
