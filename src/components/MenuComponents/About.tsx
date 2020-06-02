import React from "react";
import logoType from "../../img/logoType.svg";
import style from "../../styles/Menu/About.module.scss";

type SourceType = "Giphy" | "Tenor" | "Imgur";

const About: React.FC = () => {
  const searchSources: SourceType[] = ["Giphy", "Tenor", "Imgur"];
  const sourceList = searchSources.map((item: SourceType, index) => {
    const sourceUrl = (item: SourceType) => {
      switch (item) {
        case "Giphy":
          return "https://giphy.com";
        case "Tenor":
          return "https://tenor.com";
        case "Imgur":
          return "https://imgur.com";
        default:
          return "/";
      }
    };

    return (
      <li key={index}>
        <div className={style.about__link}>
          <a href={sourceUrl(item)} target="_blank" rel="noopener noreferrer">
            {item}
          </a>
        </div>
        <img src={"/" + item + ".png"} alt={item} />
      </li>
    );
  });

  return (
    <div className={style.about__wrap}>
      <h2>About</h2>
      <hr />
      <img src={logoType} alt="nataku" />
      <p>Nataku is a textless chat application.</p>
      <p>The images are taken from the following services</p>
      <ul>{sourceList}</ul>
      <p>By signing in, you can add your own name and avatar to your posts.</p>
    </div>
  );
};

export default About;
