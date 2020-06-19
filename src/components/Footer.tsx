import React, { useState, useRef, useEffect } from "react";
import { firebase, auth, db, functions, storage } from "../Firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "../styles/Footer.module.scss";
import temp from "../styles/Template.module.scss";

type SourceType = "Giphy" | "Tenor";

let getTimer: NodeJS.Timeout;
let source = "Giphy";
let swipe = false;

const settings = {
  className: "slider variable-width",
  dots: false,
  infinite: true,
  centerMode: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
};

const searchSources: SourceType[] = ["Giphy", "Tenor"];

const Footer: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);
  const inputRef = useRef<any>("");

  const SearchSource = searchSources.map((item: SourceType, index) => (
    <div className={`${style.footer__selectButton} ${style[item]}`} key={index}>
      <input
        onClick={(e) => {
          source = e.currentTarget.id;
          inputRef.current.placeholder = "Search (Powered by " + source + ")";
        }}
        id={item}
        type="radio"
        name="sourceSelect"
        hidden
        defaultChecked={item === "Giphy" ? true : false}
        accept="image/*"
      />
      <label htmlFor={item}>{item}</label>
    </div>
  ));

  const [res, setRes] = useState([]);
  const searchGifs = (value: string) => {
    if (!value.match(/^[A-Za-z0-9]*$/))
      return alert("Please enter half-width alphanumeric characters.");
    if (getTimer) clearTimeout(getTimer);
    getTimer = setTimeout(async () => {
      const getGifs = functions.httpsCallable("getGifs");
      const props = { source: source, keyword: value };
      const response = await getGifs(props);
      setRes(response.data);
    }, 300);
  };

  const getGifURL = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    if (swipe) return;
    const src = e.currentTarget.src;
    const postsRef = await db.collection("posts").doc();
    await postsRef.set({
      url: src,
      avatar: currentUser ? currentUser.photoURL : null,
      name: currentUser ? currentUser.displayName : null,
      uid: currentUser ? currentUser.uid : null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setRes([]);
    inputRef.current.value = "";
  };
  const searchResult = res.map((item, index) => {
    return (
      <div key={index}>
        <img
          onMouseDown={() => (swipe = true)}
          onMouseMove={() => (swipe = true)}
          onMouseUp={() => (swipe = false)}
          onClick={(e) => getGifURL(e)}
          src={item}
          className={style.footer__gif}
          alt="gif"
        />
      </div>
    );
  });

  const uploadImg = async (file: FileList | null) => {
    if (!file) return;
    const random = Math.random().toString(32).substring(2).toString();
    const uploadRef = await storage.ref().child("posts/" + random);
    const uploadPost = file[0];
    await uploadRef.put(uploadPost);
    const uploadURL = await uploadRef.getDownloadURL();
    const postsRef = await db.collection("posts").doc();
    await postsRef.set({
      url: uploadURL,
      avatar: currentUser ? currentUser.photoURL : null,
      name: currentUser ? currentUser.displayName : null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <footer className={style.footer__wrap}>
      {res !== [] && (
        <div className={style.footer__searchResult}>
          <Slider {...settings}>{searchResult}</Slider>
        </div>
      )}
      <div>{SearchSource}</div>
      <div className={style.footer__forms}>
        <input
          onChange={(e) => searchGifs(e.target.value)}
          ref={inputRef}
          className={`${temp.input} ${style.footer_search}`}
          pattern="^[0-9A-Za-z]+$"
          placeholder={
            inputRef.current.placeholder
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
