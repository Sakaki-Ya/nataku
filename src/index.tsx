import React from "react";
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from "recoil";
import { firebase } from "./Firebase";
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
const userState = atom<firebase.firestore.DocumentData | undefined>({
  key: "user",
  default: undefined,
});

const useSign = () => {
  const sign = useRecoilValue(signState);
  return sign;
};
const useSetSign = () => {
  const setSign = useSetRecoilState(signState);
  return setSign;
};
const useSide = () => {
  const side = useRecoilValue(sideState);
  return side;
};
const useSetSide = () => {
  const setSide = useSetRecoilState(sideState);
  return setSide;
};
const useUser = () => {
  const user = useRecoilValue(userState);
  return user;
};
const useSetUser = () => {
  const setUser = useSetRecoilState(userState);
  return setUser;
};

export { useSign, useSetSign, useSide, useSetSide, useUser, useSetUser };

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
