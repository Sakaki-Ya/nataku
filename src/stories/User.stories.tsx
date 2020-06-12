import React from "react";
import { addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withA11y } from "@storybook/addon-a11y";
import User from "../components/User";
import { RecoilRoot } from "recoil";

export default {
  title: "UserComponent",
  component: User,
  decorators: [withA11y],
};

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});

export const UserSideBar = () => (
  <RecoilRoot>
    <User />
  </RecoilRoot>
);
