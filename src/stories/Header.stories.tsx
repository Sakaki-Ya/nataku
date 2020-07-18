import React from "react";
import Header from "../components/Header";
import { withA11y } from "@storybook/addon-a11y";

import SignSideBar from "../components/HeaderCopmonents/SignSideBar";
import User from "../components/HeaderCopmonents/User";

export default {
  component: Header,
  title: "Header",
  decorators: [withA11y],
};

export const Header_ = () => <Header />;

export const SignUp = () => <SignSideBar sign={"Sign Up"} setSign={() => {}} />;
export const SignIn = () => <SignSideBar sign={"Sign In"} setSign={() => {}} />;

export const UserSideBar = () => <User setUserSide={() => {}} />;
