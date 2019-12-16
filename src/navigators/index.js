import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import DoctorNavigator from "./Doctor.navigator";
import PatientNavigator from "./Patient.navigator";
import EntryScreen from "../screens/Entry.screen";
import AdminScreen from "../screens/Admin.screen";
import EntryLoadingScreen from "../screens/EntryLoading.screen";

const EntryNavigator = createStackNavigator(
  {
    Entry: { screen: EntryScreen },
    Patient: { screen: PatientNavigator },
    Doctor: { screen: DoctorNavigator },
    Admin: {screen: AdminScreen},
  },
  {
    headerMode: "none"
  }
);

const MainNavigator = createSwitchNavigator({
  EntryLoading: { screen: EntryLoadingScreen },
  EntryNavigator: { screen: EntryNavigator }
});

export default createAppContainer(MainNavigator);
