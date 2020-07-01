import React, { useState, useRef, memo } from "react";
import { functions } from "./Functions/Firebase";
import SearchResult from "./FooterComponents/SearchResult";
import UploadImg from "./FooterComponents/UploadImg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import style from "../styles/Footer.module.scss";
import temp from "../styles/ConfigStyle/Template.module.scss";

const loaderStyle = css`
  margin: auto;
`;

type SourceType = "Giphy" | "Tenor";
const searchSources: SourceType[] = ["Giphy", "Tenor"];

let getTimer: NodeJS.Timeout,
  sourceName = "Giphy";

const Footer: React.FC = memo(() => {
  const inputRef = useRef<HTMLInputElement>(null);
  const changePlaceHolder = (e: { currentTarget: { id: string } }) => {
    sourceName = e.currentTarget.id;
    if (inputRef.current)
      inputRef.current.placeholder = "Search (Powered by " + sourceName + ")";
  };
  const SearchSource = searchSources.map((source: SourceType, index) => (
    <div className={style.footer__selectButton} key={index}>
      <input
        onClick={changePlaceHolder}
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

  const [uploading, setUploading] = useState(false);

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
          aria-label="search gif form"
        />
        <UploadImg setUploading={setUploading} />
      </div>
    </footer>
  );
});

export default Footer;
