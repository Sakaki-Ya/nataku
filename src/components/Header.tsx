import React from "react";
import { useSetSign, useSetSide, useUser } from "../index";
import style from "../styles/Header.module.scss";
import temp from "../styles/Template.module.scss";
import logo from "../img/logo.svg";

type formType = "Sign Up" | "Sign In";

const Header: React.FC = () => {
  const setSide = useSetSide();
  const setSign = useSetSign();
  const user = useUser();

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
        {user === undefined ? (
          <div className={style.header__signButtons}>{SignButton}</div>
        ) : (
          <button
            className={style.header__user}
            onClick={() => setSide("user")}
          >
            <img
              className={style.header__avatar}
              src={user?.avatar === null ? logo : user?.avatar}
              alt="avatar"
            />
            <span>{user?.name === null ? "anonymas" : user?.name}</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
