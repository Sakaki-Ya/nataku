import React, { useState, memo } from "react";
import SideBack from "./SideBack";
import { CSSTransition } from "react-transition-group";
import "../styles/ConfigStyle/Transition.scss";
import style from "../styles/Menu.module.scss";
import temp from "../styles/ConfigStyle/Template.module.scss";
import logoType from "../img/logoType.svg";
import About from "./MenuComponents/About";
import PrivacyPolicy from "./MenuComponents/PrivacyPolicy";
import Contact from "./MenuComponents/Contact";

type MenuType = "About" | "How to" | "Privacy Policy" | "Contact";
const menuContent: MenuType[] = ["About", "Privacy Policy", "Contact"];

type MenuPropsType = {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu: React.FC<MenuPropsType> = memo(({ menu, setMenu }) => {
  const [content, setContent] = useState("");

  const menuClose = () => {
    setMenu(false);
    setContent("");
  };

  const SideMenu = menuContent.map((item, index) => (
    <li key={index}>
      <button onClick={() => setContent(item)}>{item}</button>
    </li>
  ));

  const SideText = menuContent.map((item, index) => {
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
    <>
      <SideBack state={menu} setState={setMenu} />
      <CSSTransition
        in={menu}
        classNames="sideLeft"
        timeout={{
          enter: 0,
          exit: 500,
        }}
        unmountOnExit
      >
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
      </CSSTransition>
    </>
  );
});

export default Menu;
