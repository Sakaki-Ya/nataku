import { firebase, auth, db } from "./Firebase";
import defaultAvatar from "../../img/defaultAvatar.svg";

type SNSType =
  | "Google"
  | "Facebook"
  | "Twitter"
  | "GitHub"
  | "Yahoo"
  | "Microsoft";

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const yahooProvider = new firebase.auth.OAuthProvider("yahoo.com");
const msProvider = new firebase.auth.OAuthProvider("microsoft.com");

const setProvider = (name: SNSType) => {
  let provider: firebase.auth.AuthProvider;
  switch (name) {
    case "Google":
      provider = googleProvider;
      break;
    case "Facebook":
      provider = facebookProvider;
      break;
    case "Twitter":
      provider = twitterProvider;
      break;
    case "GitHub":
      provider = githubProvider;
      break;
    case "Yahoo":
      provider = yahooProvider;
      break;
    case "Microsoft":
      provider = msProvider;
      break;
    default:
      provider = googleProvider;
  }
  return provider;
};

const signFucntion = async (name: SNSType) => {
  const provider = await setProvider(name);
  await auth.signInWithPopup(provider);
  const currentUser = auth.currentUser;
  if (!currentUser) return;
  let docRef = await db.collection("users").doc(currentUser.uid);
  let doc = await docRef.get();
  if (doc.exists) return "Sign In";
  const userName = currentUser.displayName;
  const avatar = currentUser.photoURL;
  await docRef.set({
    name: userName ? userName : "Anonymous",
    avatar: avatar ? avatar : defaultAvatar,
    uid: currentUser.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  return "Sign Up";
};

export default signFucntion;
