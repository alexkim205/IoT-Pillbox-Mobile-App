import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Button, Text } from "react-native-ui-kitten";
import { withFirebase } from "../../firebase";
import { withNavigation } from "react-navigation";

const HomeScreen = props => {
  const { navigation } = props;

  return (
    <Layout style={styles.container}>
      <Text style={styles.title} category="h6">
        I want to...
      </Text>
      <Button
        style={styles.button}
        status={"success"}
        onPress={() => navigation.navigate("AddPatient")}
        size="large"
      >
        add a patient.
      </Button>
      <Button
        style={styles.button}
        status={"success"}
        onPress={() => navigation.navigate("Patients")}
        size="large"
      >
        view my patients.
      </Button>
      <SignOutButton/>
    </Layout>
  );
};

class SignOutButtonBase extends React.Component {
  render() {
    return (
      <Button
        style={styles.button}
        status={"danger"}
        onPress={() => {
          this.props.firebase
            .doSignOut()
            .then(() => this.props.navigation.navigate("EntryNavigator"));
        }}
        size="large"
      >
        sign out.
      </Button>
    );
  }
}

const SignOutButton = withNavigation(withFirebase(SignOutButtonBase));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginVertical: 10
  },
  button: {
    marginVertical: 4,
    marginHorizontal: 4,
    width: 180
  }
});

export default HomeScreen;
