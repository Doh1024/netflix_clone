import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/*const firebaseConfig = {
  apiKey: "AIzaSyBuXqVHYZpURapAYnQaVCmhvEAG4CCraiA",
  authDomain: "netflix-clone-82148.firebaseapp.com",
  projectId: "netflix-clone-82148",
  storageBucket: "netflix-clone-82148.appspot.com",
  messagingSenderId: "1048936338282",
  appId: "1:1048936338282:web:6a06316226abffdf0c4b13",
  measurementId: "G-QPYCBV8ZLG"
};*/

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_APIKEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth }
export default db;
