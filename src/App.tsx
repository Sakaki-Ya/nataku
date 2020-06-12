import React from "react";
import { useSign, useSide } from "./index";
import "reset-css";
import "./styles/Global.scss";
import style from "./styles/App.module.scss";
import Post from "./components/Post";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignModal from "./components/SignModal";
import Menu from "./components/Menu";
import User from "./components/User";

const App = () => {
  const sign = useSign();
  const side = useSide();

  return (
    <div className={style.app__wrap}>
      <Post />
      <Header />
      <Footer />
      {sign !== "" && <SignModal />}
      {side === "menu" && <Menu />}
      {side === "user" && <User />}
    </div>
  );
};

export default App;
