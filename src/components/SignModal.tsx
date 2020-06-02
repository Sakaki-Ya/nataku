import React from "react";
import { useSign, useSetSign } from "../index";
import style from "../styles/SignModal.module.scss";
import temp from "../styles/Template.module.scss";

const SignModal: React.FC = () => {
  const sign = useSign();
  const setSign = useSetSign();

  const closeModal = () => {
    setSign("");
  };

  return (
    <div className={style.sign__wrap}>
      <div onClick={closeModal} className={style.sign__background} />
      <div className={style.sign__contents}>
        <h2>{sign}</h2>
        <p>Please enter your email and password.</p>
        <div className={style.sign__form}>
          <span>&#x1f4e7;</span>
          <div className={style.sign__balloons}>
            <input placeholder="email" type="email" aria-label="email" />
          </div>
        </div>
        <div className={style.sign__form}>
          <span>&#x1f511;</span>
          <div className={style.sign__balloons}>
            <input
              placeholder="password"
              type="password"
              aria-label="password"
            />
          </div>
        </div>
        <div style={{ marginBottom: 0 }}>
          <button className={temp.greenButton} aria-label="sign up or sign in">
            {sign}
          </button>
          <button
            onClick={closeModal}
            className={style.sign__close}
            aria-label="close"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignModal;
