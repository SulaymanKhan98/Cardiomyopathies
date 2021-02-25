import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDQ4vfovtx4c0DPhYCgdxFP6_SW3fQrWCQ",
  authDomain: "adv-web-assignment-9d7f8.firebaseapp.com",
  projectId: "adv-web-assignment-9d7f8",
  storageBucket: "adv-web-assignment-9d7f8.appspot.com",
  messagingSenderId: "442633321590",
  appId: "1:442633321590:web:b1d28fc492e989eb497357",
  measurementId: "G-6NTLFCBJJ9"
};
// Initalize Firebase
firebase.initializeApp(firebaseConfig);
const firebaseAuthentication = firebase.auth();
const firebaseFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const userSubmissions = firebaseFireStore.collection("users");

firebaseFireStore.settings({ timestampsInSnapshoot: true });

export const createSubmission = (submission) => {
  //Add user ID property from auth
  submission.userId = firebaseAuthentication.currentUser.uid;
  return userSubmissions
    .doc(submission.userId)
    .collection("submissions")
    .add(submission);
};
export const firestoreQuery = async (internalResults) => {
  const query =  await firebaseFireStore
    .collectionGroup("submissions")
    .where("tags", "array-contains", internalResults).get();
      return query.docs.map((doc)=>{
        return doc.data();
      });
  };

export const deleteUserSubmission = async (selectedDoc) => {
  userSubmissions.doc(firebaseAuthentication.currentUser.uid)
    .collection("submissions")
    .where("tags", "==", selectedDoc).get().then((qSnap)=>{
       qSnap.docs.forEach(doc => doc.ref.delete())
    });
};

export const getAllSubmissions = async () => {
  const query = await userSubmissions
    .doc(firebaseAuthentication.currentUser.uid)
    .collection("submissions")
    .where("userId", "==", firebaseAuthentication.currentUser.uid)
    .get();
  return query.docs.map((doc) => {
    return doc.data();
  });
};

export { firebaseAuthentication, firebaseFireStore, timestamp };
