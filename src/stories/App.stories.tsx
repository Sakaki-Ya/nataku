import React from "react";
import App from "../App";
import { withA11y } from "@storybook/addon-a11y";

export default {
  component: App,
  title: "Global",
  decorators: [withA11y],
};

export const Global = () => <App />;
