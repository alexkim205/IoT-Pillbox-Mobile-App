import React from "react";
import { createSwitchNavigator } from "react-navigation";
import LoadingScreen from "../screens/Loading.screen";
import MedicationsScreen from "../screens/Patient/Medications.screen";
import SignInScreen from "../screens/Patient/SignIn.screen";

const PatientSwitchNavigator = createSwitchNavigator({
  Loading: { screen: (p) => <LoadingScreen {...p} forRole={"patient"}/> },
  App: { screen: MedicationsScreen },
  Auth: { screen: SignInScreen }
});

export default PatientSwitchNavigator;
