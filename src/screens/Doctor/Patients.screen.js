import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { withFirebase } from "../../firebase"

const PatientsScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
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
