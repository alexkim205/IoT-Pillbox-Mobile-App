import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, NavigationActions } from "react-navigation";
import {Spinner} from 'react-native-ui-kitten'
import {withFirebase} from '../../firebase'

class LoadingScreenBase extends React.Component {
  componentDidMount() {
    const { navigation, firebase } = this.props;
    firebase.auth.onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate("Auth");
      }
      firebase.firestore
        .collection("roles")
        .doc(user.uid)
        .get()
        .then(userRole => {
          if (userRole.role === "patient") {
            navigation.navigate("App")
          } else {
            firebase.doSignOut().then(()=>navigation.navigate("Auth"))
          }
        });
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner size='giant' status='success'/>
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
