import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  withNavigation,
  NavigationActions
} from "react-navigation";
import { Button, Icon } from "react-native-ui-kitten";

class BackButton extends React.Component {
  onButtonPress = () => {
    const { navigation, scene } = this.props;
    if (!scene) {
      navigation.dispatch(NavigationActions.back());
    } else {
      navigation.dispatch(
        NavigationActions.navigate({
          routeName: scene
        })
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onButtonPress}
          >
            <Icon
                name="arrow-back-outline"
                width={32}
                height={32}
                fill="#000000"
              />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: "100%"
  },
  header: {
    justifyContent: "flex-start"
  },
  button: {
    width: 32,
    height: 32,
    padding: 10,
    backgroundColor: "white",
    borderColor: "white"
  }
});

export default withNavigation(BackButton);
