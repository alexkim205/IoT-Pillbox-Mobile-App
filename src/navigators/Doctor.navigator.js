import React from "react";
import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/Doctor/Home.screen";
import PatientsScreen from "../screens/Doctor/Patients.screen";
import AddPatientScreen from "../screens/Doctor/AddPatient.screen";
import MedicationsScreen from "../screens/Doctor/Medications.screen";
import SignInScreen from "../screens/Doctor/SignIn.screen";
import SignUpScreen from "../screens/Doctor/SignUp.screen";
import LoadingScreen from "../screens/Loading.screen";

const DoctorStackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Patients: { screen: PatientsScreen },
    AddPatient: { screen: AddPatientScreen },
    Medications: { screen: MedicationsScreen }
  },
  {
    headerMode: "none",
  }
);

const DoctorAuthSwitchNavigator = createSwitchNavigator({
  SignIn: { screen: SignInScreen },
  SignUp: { screen: SignUpScreen }
});

const DoctorSwitchNavigator = createSwitchNavigator({
  Loading: { screen: p => <LoadingScreen {...p} forRole={"doctor"} /> },
  App: { screen: DoctorStackNavigator },
  Auth: { screen: DoctorAuthSwitchNavigator }
});

export default DoctorSwitchNavigator;
