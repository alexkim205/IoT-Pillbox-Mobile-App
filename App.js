import React from "react";
import { SafeAreaView } from "react-native";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry} from "react-native-ui-kitten";

import Router from "./src/navigators";
import Firebase, { FirebaseContext } from "./src/firebase";

export default function App() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Router />
      </ApplicationProvider>
    </FirebaseContext.Provider>
  );
}
