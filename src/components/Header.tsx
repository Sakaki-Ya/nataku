import React from "react";
import { useSetSign, useSetSide } from "../index";
import style from "../styles/Header.module.scss";
import temp from "../styles/Template.module.scss";
import logo from "../img/logo.svg";

let signined = false;
let userName = "foo";

type formType = "Sign Up" | "Sign In";

const Header: React.FC = () => {
  const setSide = useSetSide();
  const setSign = useSetSign();

  const forms: formType[] = ["Sign Up", "Sign In"];
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

  return (
    <header className={style.header__wrap}>
      <div className={style.header__contents}>
        <img
          onClick={() => setSide("menu")}
          className={style.header__logo}
          src={logo}
          alt="Nataku"
        />
        {signined ? (
          <button
            className={style.header__user}
            onClick={() => setSide("user")}
          >
            <img className={style.header__avatar} src={logo} alt="avatar" />
            <span>{userName}</span>
          </button>
        ) : (
          <div className={style.header__signButtons}>{SignButton}</div>
        )}
      </div>
    </header>
  );
};

export default Header;
