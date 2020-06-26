import React from "react";
import style from "../../styles/MenuStyle/PrivacyPolicy.module.scss";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className={style.privacyPolicy__wrap}>
      <h2>Privacy Policy</h2>
      <hr />
      <h3>About access analysis</h3>
      <p>Nataku uses Google Analytics.</p>
      <p>
        Traffic data is collected anonymously, so it cannot be personally
        identifiable.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
