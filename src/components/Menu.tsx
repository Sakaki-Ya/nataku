import React, { useState } from "react";
import { useSetSide } from "../index";
import style from "../styles/Menu/Menu.module.scss";
import logoType from "../img/logoType.svg";
import About from "./MenuComponents/About";
import PrivacyPolicy from "./MenuComponents/PrivacyPolicy";
import Contact from "./MenuComponents/Contact";

type MenuType = "About" | "How to" | "Privacy Policy" | "Contact";

const Menu: React.FC = () => {
  const setSide = useSetSide();
  const [content, setContent] = useState("");

  const menuClose = () => {
    setSide("");
    setContent("");
  };

  const menu: MenuType[] = ["About", "Privacy Policy", "Contact"];

  const SideMenu = menu.map((item, index) => (
    <li key={index}>
      <button onClick={() => setContent(item)}>{item}</button>
    </li>
  ));

  const SideText = menu.map((item, index) => {
    const renderContent = (item: MenuType) => {
      switch (item) {
        case "About":
          return <About />;
        case "Privacy Policy":
          return <PrivacyPolicy />;
        case "Contact":
          return <Contact />;
        default:
          return <></>;
      }
    };

    return (
      <div key={index}>
        {content === item && (
          <div className={style.menu__text}>{renderContent(item)}</div>
        )}
      </div>
    );
  });

  return (
    <>
      <div onClick={menuClose} className={style.menu__background} />
      <div className={style.menu__wrap}>
        <div className={style.menu__contents}>
          <img
            onClick={menuClose}
            className={style.menu__logo}
            src={logoType}
            alt="Nataku"
          />
          <ul className={style.menu__list}>{SideMenu}</ul>
          <button onClick={menuClose} className={style.menu__close}>
            Close
          </button>
          <p className={style.menu__copy}>&copy;2020 Nataku</p>
        </div>
        {SideText}
      </div>
    </>
  );
};

export default Menu;
