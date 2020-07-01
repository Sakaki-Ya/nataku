import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: "AIzaSyAEFfVnQAWzjJKdgBhKLLnHJ8xE3ji2Zt8",
  authDomain: "nataku-13968.firebaseapp.com",
  databaseURL: "https://nataku-13968.firebaseio.com",
  projectId: "nataku-13968",
  storageBucket: "nataku-13968.appspot.com",
  messagingSenderId: "716770121125",
  appId: "1:716770121125:web:69f0c9c05640db91ec444c",
  measurementId: "G-1NREN7VBXV",
};

firebase.initializeApp(fbConfig);

// eslint-disable-next-line no-undef
attachCustomCommands({ Cypress, cy, firebase });
