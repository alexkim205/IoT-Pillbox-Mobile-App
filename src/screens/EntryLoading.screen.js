import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, NavigationActions } from "react-navigation";
import { Spinner } from "react-native-ui-kitten";
import { withFirebase } from "../firebase";

class LoadingScreenBase extends React.Component {
  componentDidMount() {
    const { navigation, firebase } = this.props;
    firebase.auth.onAuthStateChanged(user => {
      if (!user) {
        navigation.navigate("EntryNavigator");
      }
      firebase.firestore
        .collection("roles")
        .doc(user.uid)
        .get()
        .then(userRole => {
          if (userRole.role === "patient") {
            navigation.dispatch(
              NavigationActions.navigate({
                routeName: "EntryNavigator",
                action: NavigationActions.navigate({ routeName: "Patient" })
              })
            );
          } else if (userRole.role === "doctor") {
            navigation.dispatch(
              NavigationActions.navigate({
                routeName: "EntryNavigator",
                action: NavigationActions.navigate({ routeName: "Doctor" })
              })
            );
          } else {
            navigation.navigate("EntryNavigator");
          }
        });
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner size="giant" status="success" />
      </SafeAreaView>
    );
  }
}

const LoadingScreen = withFirebase(LoadingScreenBase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LoadingScreen;
