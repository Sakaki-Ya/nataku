import React, { useState } from "react";
import SideBack from "../SideBack";
import { CSSTransition } from "react-transition-group";
import "../../styles/ConfigStyle/Transition.scss";
import User from "./User";
import style from "../../styles/HeaderStyle/UserButton.module.scss";
import defaultAvatar from "../../img/defaultAvatar.svg";

const UserButton: React.FC<{ currentUser: firebase.User | null }> = ({
  currentUser,
}) => {
  const [userSide, setUserSide] = useState(false);
  const avatar = currentUser?.photoURL;
  const name = currentUser?.displayName;

  return (
    <>
      <button
        className={style.userBtn__user}
        onClick={() => setUserSide(true)}
        name="open user button"
      >
        <img
          className={style.userBtn__avatar}
          src={avatar ? avatar : defaultAvatar}
          alt="avatar"
        />
        <span>{name ? name : "Anonymas"}</span>
      </button>
      <SideBack state={userSide} setState={setUserSide} />
      <CSSTransition
        in={userSide}
        classNames="sideRight"
        timeout={{
          enter: 0,
          exit: 500,
        }}
        unmountOnExit
      >
        <User setUserSide={setUserSide} />
      </CSSTransition>
    </>
  );
};

export default UserButton;
