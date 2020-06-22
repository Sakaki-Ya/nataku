import React, { useState } from "react";
import { functions } from "../../Firebase";
import { toast, Slide } from "react-toastify";
import style from "../../styles/Menu/Contact.module.scss";
import temp from "../../styles/Template.module.scss";

const submitAlert = () =>
  toast.info("Submit Message", {
    position: "bottom-center",
    autoClose: 1500,
    transition: Slide,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });

const Contact: React.FC = () => {
  const [input, setInput] = useState(["", "", ""]);
  const [inputName, inputEmail, inputMessage] = [input[0], input[1], input[2]];

  const checkForm = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    if (name === "name") {
      return value
        ? setInput([value, inputEmail, inputMessage])
        : setInput(["", inputEmail, inputMessage]);
    }
    if (name === "email") {
      return value.match(/.+@.+\..+/)
        ? setInput([inputName, value, inputMessage])
        : setInput([inputName, "", inputMessage]);
    }
    if (name === "message") {
      value
        ? setInput([inputName, inputEmail, value])
        : setInput([inputName, inputEmail, ""]);
    }
  };

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!input) return;
    const submitEmail = functions.httpsCallable("submitEmail");
    const data = { name: inputName, email: inputEmail, message: inputMessage };
    await submitEmail(data);
    submitAlert();
  };

  return (
    <div className={style.policy__wrap}>
      <h2>Contact</h2>
      <hr />
      <form onSubmit={submit}>
        <p>Name</p>
        <input
          onChange={checkForm}
          className={temp.input}
          type="text"
          name="name"
          aria-label="name"
          placeholder="Name"
        />
        <p>Email</p>
        <input
          onChange={checkForm}
          className={temp.input}
          type="email"
          name="email"
          aria-label="email"
          placeholder="Email"
        />
        <p>Message</p>
        <textarea
          onChange={checkForm}
          className={temp.input}
          name="message"
          aria-label="message"
          placeholder="Message"
        ></textarea>
        <div>
          <button
            type="submit"
            className={temp.greenButton}
            disabled={input.some((boolean) => !boolean)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
