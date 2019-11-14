import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { withFirebase } from "../../firebase"

const MedicationsScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <MedicationsList/>
    </SafeAreaView>
  );
};

class MedicationsListBase extends React.Component {
  render() {
    return (
      <View>
        <Text>
          MedicationsList
        </Text>
      </View>
    )
  }
}

const MedicationsList = withFirebase(MedicationsListBase)

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
});

export default MedicationsScreen;