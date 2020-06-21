import React from "react";
import "reset-css";
import "./styles/Global.scss";
import style from "./styles/App.module.scss";
import Post from "./components/Post";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className={style.app__wrap}>
      <Post />
      <Footer />
      <Header />
    </div>
  );
};

export default App;
