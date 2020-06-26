import React from "react";
import { CSSTransition } from "react-transition-group";
import "../styles/ConfigStyle/Transition.scss";
import temp from "../styles/ConfigStyle/Template.module.scss";

type SideBackType = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBack: React.FC<SideBackType> = ({ state, setState }) => {
  return (
    <CSSTransition
      in={state}
      classNames="sideBackground"
      timeout={{
        enter: 0,
        exit: 500,
      }}
      unmountOnExit
    >
      <div onClick={() => setState(!state)} className={temp.sideBackground} />
    </CSSTransition>
  );
};

export default SideBack;
