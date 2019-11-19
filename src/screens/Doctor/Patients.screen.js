import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { withFirebase } from "../../firebase";
import BackButton from "../../components/BackButton";

const PatientsScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <BackButton scene={"Home"} />
      <PatientsList />
    </SafeAreaView>
  );
};

class PatientsListBase extends React.Component {
  render() {
    return (
      <View>
        <Text>PatientsList</Text>
      </View>
    );
  }
}

const PatientsList = withFirebase(PatientsListBase);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default PatientsScreen;
