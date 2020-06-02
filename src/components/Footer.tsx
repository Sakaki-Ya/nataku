import React, { useState } from "react";
import style from "../styles/Footer.module.scss";
import temp from "../styles/Template.module.scss";

type SourceType = "Giphy" | "Tenor" | "Imgur";

const Footer: React.FC = () => {
  const [source, setSource] = useState<SourceType>("Giphy");
  const searchSources: SourceType[] = ["Giphy", "Tenor", "Imgur"];

  const SearchSource = searchSources.map((item: SourceType, index) => (
    <div className={`${style.footer__selectButton} ${style[item]}`} key={index}>
      <input
        id={item}
        type="radio"
        name="sourceSelect"
        hidden
        defaultChecked={item === "Giphy" ? true : false}
      />
      <label onClick={() => setSource(item)} htmlFor={item}>
        {item}
      </label>
    </div>
  ));

  return (
    <footer className={style.footer__wrap}>
      {SearchSource}
      <div className={style.footer__forms}>
        <input
          onChange={() => {}}
          className={`${temp.input} ${style.footer_search}`}
          placeholder={"Search (Powerd by " + source + ")"}
          type="text"
        />
        <input type="file" id="upload" hidden />
        <label className={style.footer__upload} htmlFor="upload">
          <p>&#x2b06;</p>
          <span>Upload</span>
        </label>
      </div>
    </footer>
  );
};

export default Footer;
