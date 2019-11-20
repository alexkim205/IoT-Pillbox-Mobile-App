import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView, withNavigation } from "react-navigation";
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
          Your medication
        </Text>
      </View>
      <MedicationsList />
    </SafeAreaView>
  );
};

class MedicationsListBase extends React.Component {
  state = {
    medications: []
  };

  componentDidMount() {
    const { firebase, navigation } = this.props;
    firebase.auth.onAuthStateChanged(user => {
      if (!user) {
        navigation.navigate("Auth");
      } else {
        return firebase.doGetPatientMedication(user.uid).then(medications => {
          return this.setState({ medications });
        });
      }
    });
  }

  render() {
    const { medications } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        {medications &&
          Object.keys(medications).map((k, i) => (
            <MedicineCard info={medications[k]} key={i} />
          ))}
      </ScrollView>
    );
  }
}

const MedicationsList = withNavigation(withFirebase(MedicationsListBase));

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
  }
});

export default MedicationsScreen;
