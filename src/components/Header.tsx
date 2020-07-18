import React, { useState, useEffect, lazy, Suspense } from "react";
import { auth } from "./Functions/Firebase";
import Menu from "./Menu";
import style from "../styles/Header.module.scss";
import logo from "../img/logo.svg";

const Header: React.FC = () => {
  const [menu, setMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  const HeaderButton = lazy(() => {
    if (currentUser) return import("./HeaderCopmonents/UserButton");
    return import("./HeaderCopmonents/SignButtons");
  });

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
        <Suspense fallback="">
          <HeaderButton currentUser={currentUser ? currentUser : null} />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
