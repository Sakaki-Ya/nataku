import React from "react";
import Posts from "../components/Posts";
import { withA11y } from "@storybook/addon-a11y";

export default {
  component: Posts,
  title: "Posts",
  decorators: [withA11y],
};

export const Posts_ = () => <Posts />;
