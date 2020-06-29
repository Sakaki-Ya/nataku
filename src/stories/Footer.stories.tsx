import React from "react";
import Footer from "../components/Footer";
import { withA11y } from "@storybook/addon-a11y";

export default {
  component: Footer,
  title: "Footer",
  decorators: [withA11y],
};

export const Footer_ = () => <Footer />;
