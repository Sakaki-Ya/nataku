import React, { useEffect, useState, memo } from "react";
import { firebase, db, auth } from "../Functions/Firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "../../styles/FooterStyle/SearchResult.module.scss";

let swipe = false;

const settings = {
  className: "slider variable-width",
  dots: false,
  arrows: false,
  infinite: true,
  centerMode: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  AdaptiveHeight: true,
};

type SearchResultType = {
  res: string[];
  setRes: React.Dispatch<React.SetStateAction<string[]>>;
  inputRef: React.RefObject<HTMLInputElement>;
};

const SearchResult: React.FC<SearchResultType> = memo(
  ({ res, setRes, inputRef }) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => setCurrentUser(user));
    }, []);

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

    const searchResult = res.map(
      (src: string | undefined, index: string | number | undefined) => {
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
              className={style.search__gif}
              alt="gif"
            />
          </div>
        );
      }
    );

    return (
      <div className={style.search__wrap}>
        <Slider {...settings}>{searchResult}</Slider>
      </div>
    );
  }
);

export default SearchResult;
