import React from "react";
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reset-css";
import "./styles/Global.scss";
import style from "./styles/App.module.scss";
import Posts from "./components/Posts";
import Header from "./components/Header";
import Footer from "./components/Footer";

const updateState = atom({
  key: "update",
  default: false,
});
export const useUpdate = () => {
  const update = useRecoilValue(updateState);
  return update;
};
export const useSetUpdate = () => {
  const setUpdate = useSetRecoilState(updateState);
  return setUpdate;
};

const App = () => (
  <div className={style.app__wrap}>
    <RecoilRoot>
      <Posts />
      <Footer />
      <Header />
    </RecoilRoot>
    <ToastContainer />
  </div>
);

export default App;
