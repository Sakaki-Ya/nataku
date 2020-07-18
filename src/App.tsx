import React from "react";
import Posts from "./components/Posts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reset-css";
import "./styles/Global.scss";
import style from "./styles/App.module.scss";

const App: React.FC = () => (
  <div className={style.app__wrap}>
    <Posts />
    <Footer />
    <Header />
    <ToastContainer />
  </div>
);

export default App;
