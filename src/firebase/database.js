import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGDp5Pf4L0JdY2BywfxDI88Abwy09i4G4",
    authDomain: "adv-web-assignment.firebaseapp.com",
    databaseURL: "https://adv-web-assignment-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "adv-web-assignment",
    storageBucket: "adv-web-assignment.appspot.com",
    messagingSenderId: "831433916933",
    appId: "1:831433916933:web:c5d9e0caa636c03ebb126c",
    measurementId: "G-J43RTZD1CW"
};


// Initalize Firebase
firebase.initializeApp(firebaseConfig);
const firebaseAuthentication = firebase.auth();
const firebaseFireStore = firebase.firestore();

export { firebaseAuthentication, firebaseFireStore};
