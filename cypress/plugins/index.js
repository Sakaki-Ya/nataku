import admin from "firebase-admin";
import cypressTypeScriptPreprocessor from "./cy-ts-preprocessor";
import { plugin } from "cypress-firebase";

module.exports = (on) => {
  on("file:preprocessor", cypressTypeScriptPreprocessor);
};

module.exports = (on, config) => {
  const extendedConfig = plugin(on, config, admin);
  return extendedConfig;
};
