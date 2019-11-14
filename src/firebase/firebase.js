import firebase from "firebase";
import "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBeEgxIjVbqA8j8U6N6pq_5-4mB_ZTC3tI",
  authDomain: "iot-final-project-f41ca.firebaseapp.com",
  databaseURL: "https://iot-final-project-f41ca.firebaseio.com",
  projectId: "iot-final-project-f41ca",
  storageBucket: "iot-final-project-f41ca.appspot.com",
  messagingSenderId: "225193881879",
  appId: "1:225193881879:web:8caa9c73b1627cfee9c752"
};

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Firestore ***
  doCreatePatient = (medical_id, first_name, last_name, p1, p2, p3) =>
    this.firestore
      .collection("patients")
      .doc(medical_id)
      .set({
        medical_id,
        first_name,
        last_name,
        p1,
        p2,
        p3
      })
  doCreateDoctor = (username, first_name, last_name, patients) =>
    this.firestore
      .collection("doctors")
      .doc(username)
      .set({
        username,
        first_name,
        last_name,
        patients
      });
  doAddPatientToDoctor = (username, patient_medical_id) =>
    this.firestore
      .collection("doctors")
      .doc(username)
      .update({
        patients: firebase.firestore.FieldValue.arrayUnion(patient_medical_id)
      });
}
export default Firebase;
