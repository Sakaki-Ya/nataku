import React, { useState, useEffect } from "react";
import { auth } from "./Functions/Firebase";
import Menu from "./Menu";
import SignButtons from "./HeaderCopmonents/SignButtons";
import UserButton from "./HeaderCopmonents/UserButton";
import style from "../styles/Header.module.scss";
import logo from "../img/logo.svg";

const Header: React.FC = () => {
  const [menu, setMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  return (
    <header className={style.header__wrap}>
      <div className={style.header__contents}>
        <img
          onClick={() => setMenu(true)}
          className={style.header__logo}
          src={logo}
          alt="Nataku"
        />
        <Menu menu={menu} setMenu={setMenu} />
        {!currentUser ? (
          <SignButtons />
        ) : (
          <UserButton currentUser={currentUser} />
        )}
      </div>
    </header>
  );
};

export default Header;
