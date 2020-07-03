import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reset-css";
import "./styles/Global.scss";
import style from "./styles/App.module.scss";
import Posts from "./components/Posts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/AuthContext";

const App: React.FC = () => (
  <div className={style.app__wrap}>
    <AuthProvider>
      <Posts />
      <Footer />
      <Header />
    </AuthProvider>
    <ToastContainer />
  </div>
);

export default App;
