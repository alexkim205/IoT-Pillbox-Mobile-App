import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Button } from "react-native-ui-kitten";

const EntryScreen = props => {
  const { navigation } = props;

  return (
    <Layout style={styles.container}>
      <Button
        style={styles.button}
        status={"success"}
        onPress={() => navigation.navigate("Patient")}
        size='large'
      >
        I am a patient.
      </Button>
      <Button
        style={styles.button}
        status={"success"}
        onPress={() => navigation.navigate("Doctor")}
        size='large'
      >
        I am a doctor.
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    marginVertical: 4,
    marginHorizontal: 4,
    width: 180,
  }
});

export default EntryScreen;
