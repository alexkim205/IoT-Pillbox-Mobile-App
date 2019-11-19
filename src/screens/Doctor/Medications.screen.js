import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { withFirebase } from "../../firebase";
import BackButton from "../../components/BackButton";

const MedicationsScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <BackButton/>
      <MedicationsList />
    </SafeAreaView>
  );
};

class MedicationsListBase extends React.Component {
  render() {
    return <Text>MedicationsList</Text>;
  }
}

const MedicationsList = withFirebase(MedicationsListBase);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default MedicationsScreen;
