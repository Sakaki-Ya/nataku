import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";
import Menu from "./Menu";
import SignModal from "./SignModal";
import User from "./User";
import { CSSTransition } from "react-transition-group";
import "../styles/Transition.scss";
import style from "../styles/Header.module.scss";
import temp from "../styles/Template.module.scss";
import logo from "../img/logo.svg";

type formType = "Sign Up" | "Sign In";
const forms: formType[] = ["Sign Up", "Sign In"];

const Header: React.FC = () => {
  const [sign, setSign] = useState("");
  const [menu, setMenu] = useState(false);
  const [userSide, setUserSide] = useState(false);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  const SignButton = forms.map((item: formType, index) => (
    <div key={index}>
      <button
        onClick={() => setSign(item)}
        className={item === "Sign Up" ? temp.greenButton : style.header__signIn}
      >
        {item}
      </button>
    </div>
  ));

  const avatar = currentUser?.photoURL;
  const name = currentUser?.displayName;

  return (
    <header className={style.header__wrap}>
      <div className={style.header__contents}>
        <img
          onClick={() => setMenu(true)}
          className={style.header__logo}
          src={logo}
          alt="Nataku"
        />
        <CSSTransition
          in={menu}
          classNames="sideBackground"
          timeout={{
            enter: 0,
            exit: 500,
          }}
          unmountOnExit
        >
          <div onClick={() => setMenu(false)} className={temp.sideBackground} />
        </CSSTransition>
        <CSSTransition
          in={menu}
          classNames="sideLeft"
          timeout={{
            enter: 0,
            exit: 500,
          }}
          unmountOnExit
        >
          <Menu setMenu={setMenu} />
        </CSSTransition>
        {!currentUser ? (
          <>
            <div className={style.header__signButtons}>{SignButton}</div>
            <CSSTransition
              in={sign !== ""}
              classNames="sideBackground"
              timeout={{
                enter: 0,
                exit: 500,
              }}
              unmountOnExit
            >
              <div
                onClick={() => setSign("")}
                className={temp.sideBackground}
              />
            </CSSTransition>
            <CSSTransition
              in={sign !== ""}
              classNames="sideRight"
              timeout={{
                enter: 0,
                exit: 500,
              }}
              unmountOnExit
            >
              <SignModal sign={sign} setSign={setSign} />
            </CSSTransition>
          </>
        ) : (
          <>
            <button
              className={style.header__user}
              onClick={() => setUserSide(true)}
            >
              <img
                className={style.header__avatar}
                src={avatar ? avatar : logo}
                alt="avatar"
              />
              <span>{name ? name : "Anonymas"}</span>
            </button>
            <CSSTransition
              in={userSide}
              classNames="sideBackground"
              timeout={{
                enter: 0,
                exit: 500,
              }}
              unmountOnExit
            >
              <div
                onClick={() => setUserSide(false)}
                className={temp.sideBackground}
              />
            </CSSTransition>
            <CSSTransition
              in={userSide}
              classNames="sideRight"
              timeout={{
                enter: 0,
                exit: 500,
              }}
              unmountOnExit
            >
              <User setUserSide={setUserSide} />
            </CSSTransition>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
