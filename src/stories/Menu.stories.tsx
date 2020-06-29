import React from "react";
import Menu from "../components/Menu";
import { withA11y } from "@storybook/addon-a11y";

export default {
  component: Menu,
  title: "Menu",
  decorators: [withA11y],
};

export const Menu_ = () => <Menu menu={true} setMenu={() => {}} />;
