import React from "react";
import signFunction from "../SignFunction";
import style from "../styles/SignModal.module.scss";
import temp from "../styles/Template.module.scss";

type SignModalProps = {
  sign: string;
  setSign: React.Dispatch<React.SetStateAction<string>>;
};

type SNSType =
  | "Google"
  | "Facebook"
  | "Twitter"
  | "GitHub"
  | "Yahoo"
  | "Microsoft";

const SNS: SNSType[] = [
  "Google",
  "Facebook",
  "Twitter",
  "GitHub",
  "Yahoo",
  "Microsoft",
];

const SignModal: React.FC<SignModalProps> = ({ sign, setSign }) => {
  const SNSBUtton = SNS.map((item, index) => (
    <div className={style.sign__SNSButtons} key={index}>
      <button
        onClick={(e) => signAction(e)}
        name={item}
        className={`${style.sign__baseSNSButton} ${style[item]}`}
      >
        {item}
      </button>
    </div>
  ));

  const signAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    const SNSName = name as SNSType;
    await signFunction(SNSName);
    setSign("");
  };

  return (
    <>
      <div onClick={() => setSign("")} className={style.sign__background} />
      <div className={style.sign__wrap}>
        <h2>{sign}</h2>
        <hr />
        <div>{SNSBUtton}</div>
        <div style={{ textAlign: "right" }}>
          <button onClick={() => setSign("")} className={temp.greenUnderline}>
            close
          </button>
        </div>
      </div>
    </>
  );
};

export default SignModal;
