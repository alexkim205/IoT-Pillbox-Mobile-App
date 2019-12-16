import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Layout, Button, Input } from "react-native-ui-kitten";
import { withFirebase } from "../firebase";
import { SafeAreaView } from "react-navigation";

const patient1Credentials = {
  first_name: "Sabin",
  last_name: "Z",
  medical_id: "SZ2859",
  uid: "nUW9UUUkk3XmwJO5uplvmAE4Q4Z2"
};
const patient2Credentials = {
  first_name: "Ryan",
  last_name: "D",
  medical_id: "RTD2119",
  uid: "yuUkAoTNGjgiN0UxJNLgxRIFytA3"
};
const doctor1Credentials = {
  first_name: "Alex",
  last_name: "K",
  username: "AGK2144",
  password: "AGK2144",
  uid: "IkTrYF3DMZhW12xMfRYBAq5eD343"
};

class AdminScreen extends React.Component {
  dispenseAllPills = (pillKey, patientCreds) => {
    const { firebase } = this.props;
    firebase.doDispenseAllPatientPills(patientCreds.uid, pillKey, 4); // Thursday
  };

  resetAllPills = (pillKey, patientCreds) => {
    const { firebase } = this.props;
    firebase.doResetPills(patientCreds.uid, pillKey, 4); // Thursday
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll}>
          <Button
            style={styles.button}
            status={"warning"}
            onPress={() => this.resetAllPills("p1", patient1Credentials)}
          >
            Reset Sabin pill type 1.
          </Button>
          <Button
            style={styles.button}
            status={"warning"}
            onPress={() => this.resetAllPills("p2", patient1Credentials)}
          >
            Reset Sabin pill type 2.
          </Button>
          <Button
            style={styles.button}
            status={"warning"}
            onPress={() => this.resetAllPills("p3", patient1Credentials)}
          >
            Reset Sabin pill type 3.
          </Button>
          <Button
            style={styles.button}
            status={"success"}
            onPress={() => this.dispenseAllPills("p1", patient1Credentials)}
          >
            Dispense all Sabin pill type 1.
          </Button>
          <Button
            style={styles.button}
            status={"success"}
            onPress={() => this.dispenseAllPills("p2", patient1Credentials)}
          >
            Dispense all Sabin pill type 2.
          </Button>
          <Button
            style={styles.button}
            status={"success"}
            onPress={() => this.dispenseAllPills("p3", patient1Credentials)}
          >
            Dispense all Sabin pill type 3.
          </Button>

          <Button
            style={styles.button}
            status={"warning"}
            onPress={() => this.resetAllPills("p1", patient2Credentials)}
          >
            Reset Ryan pill type 1.
          </Button>
          <Button
            style={styles.button}
            status={"warning"}
            onPress={() => this.resetAllPills("p2", patient2Credentials)}
          >
            Reset Ryan pill type 2.
          </Button>
          <Button
            style={styles.button}
            status={"warning"}
            onPress={() => this.resetAllPills("p3", patient2Credentials)}
          >
            Reset Ryan pill type 3.
          </Button>
          <Button
            style={styles.button}
            status={"success"}
            onPress={() => this.dispenseAllPills("p1", patient2Credentials)}
          >
            Dispense all Ryan pill type 1.
          </Button>
          <Button
            style={styles.button}
            status={"success"}
            onPress={() => this.dispenseAllPills("p2", patient2Credentials)}
          >
            Dispense all Ryan pill type 2.
          </Button>
          <Button
            style={styles.button}
            status={"success"}
            onPress={() => this.dispenseAllPills("p3", patient2Credentials)}
          >
            Dispense all Ryan pill type 3.
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    marginVertical: 4,
    marginHorizontal: 4,
    width: 180
  },
  scroll: {
    width: "100%",
    paddingBottom: 30
  }
});

export default withFirebase(AdminScreen);
