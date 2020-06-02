import React from "react";
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from "recoil";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const signState = atom({
  key: "sign",
  default: "",
});
const sideState = atom({
  key: "side",
  default: "",
});

export const useSign = () => {
  const sign = useRecoilValue(signState);
  return sign;
};
export const useSetSign = () => {
  const setSign = useSetRecoilState(signState);
  return setSign;
};
export const useSide = () => {
  const side = useRecoilValue(sideState);
  return side;
};
export const useSetSide = () => {
  const setSide = useSetRecoilState(sideState);
  return setSide;
};

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
