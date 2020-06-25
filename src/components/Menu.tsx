import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "../styles/Transition.scss";
import style from "../styles/Menu/Menu.module.scss";
import temp from "../styles/Template.module.scss";
import logoType from "../img/logoType.svg";
import About from "./MenuComponents/About";
import PrivacyPolicy from "./MenuComponents/PrivacyPolicy";
import Contact from "./MenuComponents/Contact";

type MenuType = "About" | "How to" | "Privacy Policy" | "Contact";

const Menu: React.FC<{
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setMenu }) => {
  const [content, setContent] = useState("");

  const menuClose = () => {
    setMenu(false);
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
          return <Contact setContent={setContent} />;
        default:
          return <></>;
      }
    };

    return (
      <CSSTransition
        in={content === item}
        classNames="menu"
        timeout={{
          enter: 0,
          exit: 500,
        }}
        unmountOnExit
        key={index}
      >
        <div className={style.menu__text}>{renderContent(item)}</div>
      </CSSTransition>
    );
  });

  return (
    <div className={style.menu__wrap}>
      <div className={style.menu__contents}>
        <img
          onClick={menuClose}
          className={style.menu__logo}
          src={logoType}
          alt="Nataku"
        />
        <ul className={style.menu__list}>{SideMenu}</ul>
        <button
          onClick={menuClose}
          className={temp.greenUnderline}
          style={{ marginBottom: "1rem" }}
        >
          Close
        </button>
        <p className={style.menu__copy}>&copy;2020 Nataku</p>
      </div>
      <div onClick={(e) => e.stopPropagation()}>{SideText}</div>
    </div>
  );
};

export default Menu;
