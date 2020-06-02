import React from "react";
import { useSetSide } from "../index";
import style from "../styles/User.module.scss";
import temp from "../styles/Template.module.scss";
import logo from "../img/logo.svg";

let userName = "foo";

const User: React.FC = () => {
  const setSide = useSetSide();

  return (
    <>
      <div onClick={() => setSide("")} className={style.user__background} />
      <div className={style.user__contents}>
        <div className={style.user__avatarSection}>
          <img className={style.user__avatar} src={logo} alt="Nataku" />
          <input
            type="file"
            id="changeImage"
            aria-label="change image"
            hidden
          />
          <label className={style.user__upload} htmlFor="changeImage">
            &#x2b06;Change Image
          </label>
        </div>
        <div className={style.user__name}>
          <p>&#x1f58a; Name</p>
          <input
            className={temp.input}
            defaultValue={userName}
            type="text"
            placeholder="Your name"
          />
        </div>
        <div className={style.user__buttons}>
          <div className={style.user__saveClose}>
            <button className={style.user__save}>Save</button>
            <button onClick={() => setSide("")} className={style.user__close}>
              Close
            </button>
          </div>
          <div>
            <button className={style.user__signOut}>Sign Out</button>
          </div>
          <div>
            <button className={style.user__delete}>Delete Account</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
