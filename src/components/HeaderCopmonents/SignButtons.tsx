import React, { useState } from "react";
import SignSideBar from "./SignSideBar";
import { CSSTransition } from "react-transition-group";
import "../../styles/ConfigStyle/Transition.scss";
import style from "../../styles/HeaderStyle/SignButtons.module.scss";
import temp from "../../styles/ConfigStyle/Template.module.scss";

type formType = "Sign Up" | "Sign In";
const forms: formType[] = ["Sign Up", "Sign In"];

const SignButtons: React.FC = () => {
  const [sign, setSign] = useState("");

  const SignButton = forms.map((item: formType, index) => (
    <div key={index}>
      <button
        onClick={() => setSign(item)}
        className={
          item === "Sign Up" ? temp.greenButton : style.signBtn__signIn
        }
      >
        {item}
      </button>
    </div>
  ));

  return (
    <>
      <div className={style.signBtn__signButtons}>{SignButton}</div>
      <CSSTransition
        in={sign !== ""}
        classNames="sideBackground"
        timeout={{
          enter: 0,
          exit: 500,
        }}
        unmountOnExit
      >
        <div onClick={() => setSign("")} className={temp.sideBackground} />
      </CSSTransition>
      <CSSTransition
        in={sign !== ""}
        classNames="sideRight"
        timeout={{
          enter: 0,
          exit: 500,
        }}
        unmountOnExit
      >
        <SignSideBar sign={sign} setSign={setSign} />
      </CSSTransition>
    </>
  );
};

export default SignButtons;
