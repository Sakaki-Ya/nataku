import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reset-css";
import "./styles/Global.scss";
import style from "./styles/App.module.scss";
import Post from "./components/Post";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => (
  <div className={style.app__wrap}>
    <Post />
    <Footer />
    <Header />
    <ToastContainer />
  </div>
);

export default App;
