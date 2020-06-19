import { firebase, auth, db } from "./Firebase";
import defaultAvatar from "./img/logo.svg";

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
  if (!currentUser) return alert("error");
  let docRef = await db.collection("users").doc(currentUser.uid);
  let doc = await docRef.get();
  if (doc.exists) {
    // sign in
    return alert("Sign in");
  }
  // sign up
  const userName = currentUser.displayName;
  const avatar = currentUser.photoURL;
  const email = currentUser.email;
  await docRef.set({
    name: userName ? userName : "Anonymous",
    avatar: avatar ? avatar : defaultAvatar,
    email: email ? email : "",
    uid: currentUser.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  alert("Create");
};

export default signFucntion;
