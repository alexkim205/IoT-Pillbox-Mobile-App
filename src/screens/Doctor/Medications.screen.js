import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView, NavigationActions } from "react-navigation";
import { Text } from "react-native-ui-kitten";
import { withFirebase } from "../../firebase";
import BackButton from "../../components/BackButton";
import MedicineCard from "../../components/MedicineCard";

const MedicationsScreen = props => {
  return (
    <SafeAreaView style={styles.container} forceInset={{ bottom: "never" }}>
      <BackButton />
      <View style={styles.header}>
        <Text style={styles.title} category="h5">
          Patient medication
        </Text>
      </View>
      <MedicationsList {...props} />
    </SafeAreaView>
  );
};

class MedicationsListBase extends React.Component {
  state = {
    medications: []
  };

  componentDidMount() {
    const { firebase, navigation } = this.props;
    const patientUid = navigation.getParam("patient_uid", "NO-PATIENT-UID");

    if (patientUid === "NO-PATIENT-UID") {
      navigation.dispatch(NavigationActions.goBack());
      return;
    }

    firebase
      .doGetPatientMedication(patientUid)
      .then(medications => this.setState({ medications }));
  }

  render() {
    const { medications } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <View style={styles.textRow}>
            <Text style={styles.gray}>First Name: </Text>
            <Text style={styles.textData}>
              {navigation.getParam("first_name", "NO-PATIENT-FIRST-NAME")}
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.gray}>Last Name: </Text>
            <Text style={styles.textData}>
              {navigation.getParam("last_name", "NO-PATIENT-LAST-NAME")}
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.gray}>Medical ID: </Text>
            <Text style={styles.textData}>
              {navigation.getParam("medical_id", "NO-PATIENT-MEDICAL-ID")}
            </Text>
          </View>
        </View>
        {medications &&
          Object.keys(medications).map((k, i) => {
            console.log(medications[k]);

            return <MedicineCard info={medications[k]} key={i} />;
          })}
      </ScrollView>
    );
  }
}

const MedicationsList = withFirebase(MedicationsListBase);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  title: {
    marginTop: 10,
    marginBottom: 15
  },
  scroll: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 30
  },
  card: {
    display: "flex",
    width: 300,
    borderColor: "#a0c0da",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    flexDirection: "column",
    marginTop: 30
  },
  textRow: {
    display: "flex",
    flexDirection: "row"
  },
  gray: { color: "#747474", width: 50 },
  textData: { fontWeight: "600" }
});

export default MedicationsScreen;
