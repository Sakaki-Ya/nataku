import "reset-css";
import "../src/styles/Global.scss";
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from "recoil";

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
