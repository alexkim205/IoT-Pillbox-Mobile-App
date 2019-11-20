import React from "react";
import { View, StyleSheet } from "react-native";
import { Text} from "react-native-ui-kitten";
import { withFirebase } from "../firebase";
import { withNavigation } from "react-navigation";
import { zip } from "lodash";

const DAYS = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};

class MedicineCard extends React.Component {
  state = {
    today: new Date().getDay()
  };

  render() {
    const { info } = this.props;
    const { name, description, prescribed, taken } = info;
    const { today } = this.state;
    const zipped = zip(prescribed, taken);

    return (
      <View style={styles.card}>
        <Text style={styles.name}>{name.toUpperCase()}</Text>
        <Text
          style={styles.description}
        >{`Prescribed for ${description}.`}</Text>
        {zipped.map(([p, t], i) => {
          console.log(p, t, i);
          if (p === 0) return;
          let color = "#C4C4C4",
            textColor = "#747474";
          if (i < today) {
            if (t >= p) {
              color = "#46E297";
            } else {
              color = "#FF7A7A";
            }
          }
          if (i < today) {
            textColor = "#000000";
          } else if (i === today) {
            textColor = "#4876FF";
          }
          return (
            <View style={styles.day} key={i}>
              <View
                style={{ ...styles.statusCircle, backgroundColor: color }}
              />
              <Text style={{ ...styles.weekday, color: textColor }}>
                {DAYS[i]}
              </Text>
              <View style={styles.stretch} />
              <Text style={styles.count}>{`${t} of ${p}`}</Text>
              <Text style={styles.gray}> taken</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    width: 300,
    backgroundColor: "#F1F1F1",
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 30
  },
  name: {
    fontWeight: "600",
    marginVertical: 5
  },
  description: {
    marginBottom: 15,
    color: "#747474"
  },
  weekday: {
    fontWeight: "600"
  },
  day: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10
  },
  statusCircle: {
    borderRadius: 100,
    width: 32,
    height: 32,
    marginRight: 10
  },
  stretch: {
    flex: 1
  },
  count: {
    fontWeight: "600",
    width: 45
  },
  gray: { color: "#747474" }
});

export default withFirebase(withNavigation(MedicineCard));
