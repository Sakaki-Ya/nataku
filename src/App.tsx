import React, { useCallback } from "react";
import { RecoilRoot, atom, useRecoilState } from "recoil";
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
  default: Math.random(),
});
export const useUpdate = () => {
  const [update, setRandom] = useRecoilState(updateState);
  const setUpdate = useCallback(
    (num: number) => {
      setRandom(num);
    },
    [setRandom]
  );
  return [update, setUpdate] as const;
};

const App: React.FC = () => (
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
