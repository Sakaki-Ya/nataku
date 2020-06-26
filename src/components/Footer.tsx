import React, { useState, useRef } from "react";
import { functions } from "../Firebase";
import SearchResult from "./FooterComponents/SearchResult";
import UploadImg from "./FooterComponents/UploadImg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "../styles/Footer.module.scss";
import temp from "../styles/ConfigStyle/Template.module.scss";

type SourceType = "Giphy" | "Tenor";
const searchSources: SourceType[] = ["Giphy", "Tenor"];

let getTimer: NodeJS.Timeout;
let sourceName = "Giphy";

const Footer: React.FC = () => {
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

  const [res, setRes] = useState<string[]>([]);
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

  return (
    <footer className={style.footer__wrap}>
      {res !== [] && (
        <SearchResult res={res} setRes={setRes} inputRef={inputRef} />
      )}
      {SearchSource}
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
        <UploadImg />
      </div>
    </footer>
  );
};

export default Footer;
