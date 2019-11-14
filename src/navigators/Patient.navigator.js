import { createSwitchNavigator } from "react-navigation";
import LoadingScreen from "../screens/Patient/Loading.screen";
import MedicationsScreen from "../screens/Patient/Medications.screen";
import SignInScreen from "../screens/Patient/SignIn.screen";

const PatientSwitchNavigator = createSwitchNavigator({
  Loading: { screen: LoadingScreen },
  App: { screen: MedicationsScreen },
  Auth: { screen: SignInScreen }
});

export default PatientSwitchNavigator;
