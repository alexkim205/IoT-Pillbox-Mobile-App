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
    // Use second app to create users without signing in.
    // https://stackoverflow.com/questions/37517208/firebase-kicks-out-current-user/38013551#38013551
    let primaryApp = firebase.apps.find(a => a.name === "Primary");
    let secondaryApp = firebase.apps.find(a => a.name === "Secondary");
    if (!primaryApp) {
      primaryApp = firebase.initializeApp(firebaseConfig, "Primary");
    }
    if (!secondaryApp) {
      secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");
    }

    this.auth = primaryApp.auth();
    this.auth2 = secondaryApp.auth();
    this.firestore = primaryApp.firestore();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doCreateUserWithEmailAndPasswordWithoutLogin = (email, password) =>
    this.auth2
      .createUserWithEmailAndPassword(email, password)
      .then(res => this.auth2.signOut().then(() => res));
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Firestore ***
  doCreatePatient = (uid, medical_id, first_name, last_name, pills) =>
    this.firestore
      .collection("patients")
      .doc(uid)
      .set({
        medical_id,
        first_name,
        last_name,
        pills
      });
  doCreateDoctor = (uid, username, first_name, last_name, patients) =>
    this.firestore
      .collection("doctors")
      .doc(uid)
      .set({
        username,
        first_name,
        last_name,
        patients
      });
  doAddPatientToDoctor = (doctor_uid, patient_uid) =>
    this.firestore
      .collection("doctors")
      .doc(doctor_uid)
      .update({
        patients: firebase.firestore.FieldValue.arrayUnion(patient_uid)
      });
  doGetDoctorPatients = doctor_uid =>
    this.firestore
      .collection("doctors")
      .doc(doctor_uid)
      .get()
      .then(doc => doc.data().patients);
      doGetPatientInfo = patient_uid =>
      this.firestore
        .collection("patients")
        .doc(patient_uid)
        .get()
        .then(doc => doc.data());
  doGetPatientMedication = patient_uid =>
    this.firestore
      .collection("patients")
      .doc(patient_uid)
      .get()
      .then(doc => doc.data().pills);
  doPutPatientTookPill = (patient_uid, pill_key, day_idx) =>
    this.firestore
      .collection("patients")
      .doc(patient_uid)
      .get()
      .then(doc => {
        const newTaken = doc.data().pills[pill_key].taken;
        newTaken[day_idx] -= 1;
        return newTaken;
      })
      .then(newTaken => {
        const newPills = {};
        newPills[`pills.${pill_key}.taken`] = newTaken;
        return this.firestore
          .collection("patients")
          .doc(patient_uid)
          .update(newPills);
      });
}
export default Firebase;
