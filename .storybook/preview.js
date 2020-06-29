import React from "react";
import "reset-css";
import "../src/styles/Global.scss";
import { addDecorator } from "@storybook/react";
import { RecoilRoot } from "recoil";

addDecorator((storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>);
