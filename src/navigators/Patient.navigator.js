import React from "react";
import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoadingScreen from "../screens/Loading.screen";
import MedicationsScreen from "../screens/Patient/Medications.screen";
import SignInScreen from "../screens/Patient/SignIn.screen";
import HomeScreen from "../screens/Patient/Home.screen";

const PatientStackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Medications: { screen: MedicationsScreen }
  },
  {
    headerMode: "none"
  }
);

const PatientSwitchNavigator = createSwitchNavigator({
  Loading: { screen: p => <LoadingScreen {...p} forRole={"patient"} /> },
  App: { screen: PatientStackNavigator },
  Auth: { screen: SignInScreen }
});
  
export default PatientSwitchNavigator;
