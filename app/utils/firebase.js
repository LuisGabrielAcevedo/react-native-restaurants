import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCQTSKzv32RNA-98OapCIg-VehEwGgA_7g",
  authDomain: "react-native-restaurants-bfa64.firebaseapp.com",
  databaseURL: "https://react-native-restaurants-bfa64.firebaseio.com",
  projectId: "react-native-restaurants-bfa64",
  storageBucket: "react-native-restaurants-bfa64.appspot.com",
  messagingSenderId: "183577334326",
  appId: "1:183577334326:web:d355e75cde47ab70d7be97",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
