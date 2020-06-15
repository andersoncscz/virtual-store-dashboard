import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-L9GmuqoRGgjqr9dzFviRllgi2zpy4uw",
  authDomain: "virtual-store-7f3ff.firebaseapp.com",
  databaseURL: "https://virtual-store-7f3ff.firebaseio.com",
  projectId: "virtual-store-7f3ff",
  storageBucket: "virtual-store-7f3ff.appspot.com",
  messagingSenderId: "981878168394",
  appId: "1:981878168394:web:b035af9359dfa761",
};

const initializeFireBase = () => firebase.initializeApp(firebaseConfig);

export default initializeFireBase;
