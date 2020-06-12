import React from "react";
import { useSign, useSetSign, useSetUser } from "../index";
import signFunction from "../SignFunction";
import style from "../styles/SignModal.module.scss";
import temp from "../styles/Template.module.scss";

type SNSType =
  | "Google"
  | "Facebook"
  | "Twitter"
  | "GitHub"
  | "Yahoo"
  | "Microsoft";

const SignModal: React.FC = () => {
  const sign = useSign();
  const setSign = useSetSign();
  const setUser: any = useSetUser();

  const SNS: SNSType[] = [
    "Google",
    "Facebook",
    "Twitter",
    "GitHub",
    "Yahoo",
    "Microsoft",
  ];
  const SNSBUtton = SNS.map((item, index) => {
    return (
      <div className={style.sign__SNSButtons} key={index}>
        <button
          onClick={(e) => signAction(e)}
          name={item}
          className={`${style.sign__baseSNSButton} ${style[item]}`}
        >
          {item}
        </button>
      </div>
    );
  });

  const signAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    const SNSName = name as SNSType;
    const data = await signFunction(SNSName);
    setUser(data);
    setSign("");
  };

  return (
    <>
      <div onClick={() => setSign("")} className={style.sign__background} />
      <div className={style.sign__wrap}>
        <div className={style.sign__contents}>
          <h2>{sign}</h2>
          <hr />
          <div style={{ textAlign: "left" }}>
            <p>Do you have one of the following accounts?</p>
            <p>If you have it, you can {sign} right away!</p>
          </div>
          <div>{SNSBUtton}</div>
          <div style={{ textAlign: "right" }}>
            <button onClick={() => setSign("")} className={temp.greenUnderline}>
              close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignModal;
