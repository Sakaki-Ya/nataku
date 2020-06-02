import React from "react";
import style from "../../styles/Menu/Contact.module.scss";
import temp from "../../styles/Template.module.scss";

const Contact: React.FC = () => {
  return (
    <div className={style.policy__wrap}>
      <h2>Contact</h2>
      <hr />
      <form action="/">
        <p>Name</p>
        <input className={temp.input} type="text" placeholder="Name" />
        <p>Email</p>
        <input className={temp.input} type="email" placeholder="Email" />
        <p>Message</p>
        <textarea
          className={temp.input}
          name=""
          placeholder="Message"
        ></textarea>
        <div>
          <button className={temp.greenButton}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
