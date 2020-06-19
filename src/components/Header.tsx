import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";
import Menu from "./Menu";
import SignModal from "./SignModal";
import User from "./User";
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
        {menu && <Menu setMenu={setMenu} />}
        {!currentUser ? (
          <>
            <div className={style.header__signButtons}>{SignButton}</div>
            {sign !== "" && <SignModal sign={sign} setSign={setSign} />}
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
            {userSide && <User setUserSide={setUserSide} />}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
