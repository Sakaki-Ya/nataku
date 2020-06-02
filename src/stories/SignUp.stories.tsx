import React from "react";
import { addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withA11y } from "@storybook/addon-a11y";
import SignModal from "../components/SignModal";

export default {
  title: "SignModalComponent",
  component: SignModal,
  decorators: [withA11y],
};

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});

export const SignUp = () => <SignModal />;
