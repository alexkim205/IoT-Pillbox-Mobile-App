import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Text } from "react-native-ui-kitten";
import { withFirebase } from "../../firebase";
import BackButton from "../../components/BackButton";
import randomColor from "randomcolor";

const PatientsScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <BackButton scene={"Home"} />
      <View style={styles.header}>
        <Text style={styles.title} category="h5">
          Your patients
        </Text>
      </View>
      <PatientsList {...props} />
    </SafeAreaView>
  );
};

class PatientsListBase extends React.Component {
  state = {
    patients: []
  };
  componentDidMount() {
    const { firebase, navigation } = this.props;
    firebase.auth.onAuthStateChanged(user => {
      if (!user) {
        navigation.navigate("EntryNavigator");
      } else {
        return firebase
          .doGetDoctorPatients(user.uid)
          .then(patients =>
            Promise.all(
              patients.map(patient_uid =>
                firebase.doGetPatientInfo(patient_uid).then(patientInfo => ({
                  ...patientInfo,
                  circle_color: randomColor(),
                  patient_uid
                }))
              )
            )
          )
          .then(patient_infos => {
            console.log("PATIENTS", patient_infos);
            return this.setState({ patients: patient_infos });
          });
      }
    });
  }
  render() {
    const { patients } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        {patients &&
          patients.map(
            (
              { first_name, last_name, medical_id, circle_color, patient_uid },
              i
            ) => (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  navigation.navigate("Medications", {
                    first_name,
                    last_name,
                    medical_id,
                    patient_uid
                  })
                }
              >
                <View style={styles.card}>
                  <View
                    style={{
                      ...styles.profileCircle,
                      backgroundColor: circle_color
                    }}
                  />
                  <View style={styles.body}>
                    <Text
                      style={styles.name}
                    >{`${first_name} ${last_name}`}</Text>
                    <Text style={styles.medicalId}>{medical_id}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          )}
      </ScrollView>
    );
  }
}

const PatientsList = withFirebase(PatientsListBase);

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
    width: 230,
    backgroundColor: "#F1F1F1",
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30
  },
  body: {
    flex: 1,
    justifyContent: "flex-start",
    // alignItems: "center",
    flexDirection: "column"
  },
  profileCircle: {
    borderRadius: 100,
    width: 64,
    height: 64,
    marginRight: 10
  },
  name: {
    marginBottom: 5,
    fontWeight: "600"
  },
  medicalId: {
    color: "#747474"
  }
});

export default PatientsScreen;
