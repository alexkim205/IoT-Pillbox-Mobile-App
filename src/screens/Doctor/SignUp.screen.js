import React from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Text, Button, Input, Icon } from "react-native-ui-kitten";
import { withFirebase } from "../../firebase";

const INITIAL_STATE = {
  username: "",
  first_name: "",
  last_name: "",
  password: "",
  secureTextEntry: true,
  error: null
};

const SignUpScreen = props => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <SignUpForm navigation={props.navigation} />
    </KeyboardAvoidingView>
  );
};

class SignUpFormBase extends React.Component {
  state = { ...INITIAL_STATE };

  onIconPress = () => {
    const secureTextEntry = !this.state.secureTextEntry;
    this.setState({ secureTextEntry });
  };

  renderIcon = style => {
    const iconName = this.state.secureTextEntry ? "eye-off" : "eye";
    return <Icon {...style} name={iconName} />;
  };

  onSubmit = event => {
    const { navigation, firebase } = this.props;
    const { username, first_name, last_name, password } = this.state;
    firebase
      .doCreateUserWithEmailAndPassword(`${username}@doctor.com`, password)
      .then(({ user }) =>
        firebase.firestore
          .collection("roles")
          .doc(user.uid)
          .set({ role: "doctor" })
      )
      .then(() => firebase.doCreateDoctor(username, first_name, last_name, []))
      .then(() => {
        navigation.navigate("App");
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  render() {
    return (
      <View style={styles.card}>
        <View style={styles.circle}>
          <Icon name="person-done" width={80} height={80} fill="#FFFFFF" />
        </View>
        <View style={styles.errorbox}>
          {this.state.error && (
            <Text category="c2" status="danger">
              {this.state.error.message}
            </Text>
          )}
        </View>
        <Input
          style={styles.input}
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
          placeholder="Username"
        />
        <Input
          style={styles.input}
          value={this.state.first_name}
          onChangeText={first_name => this.setState({ first_name })}
          placeholder="First"
        />
        <Input
          style={styles.input}
          value={this.state.last_name}
          onChangeText={last_name => this.setState({ last_name })}
          placeholder="Last"
        />
        <Input
          style={styles.input}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          icon={this.renderIcon}
          secureTextEntry={this.state.secureTextEntry}
          onIconPress={this.onIconPress}
          placeholder="Password"
        />
        <View style={styles.buttonbox}>
          <Button
            appearance="outline"
            style={styles.buttonLeft}
            status={"primary"}
            onPress={() => this.props.navigation.navigate("SignIn")}
          >
            Sign In
          </Button>
          <Button
            appearance="filled"
            style={styles.buttonRight}
            status={"primary"}
            onPress={this.onSubmit}
          >
            Sign Up
          </Button>
        </View>
      </View>
    );
  }
}

const SignUpForm = withFirebase(SignUpFormBase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    borderRadius: 100,
    backgroundColor: "#3466FF",
    height: 125,
    width: 125,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  errorbox: {
    minHeight: 5,
    marginVertical: 10,
    justifyContent: "center",
    textAlign: "center"
  },
  card: {
    display: "flex",
    width: 300,
    backgroundColor: "#F1F1F1",
    borderRadius: 5,
    padding: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    marginTop: 5,
    marginBottom: 5
  },
  buttonbox: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row"
  },
  buttonLeft: {
    flex: 1,
    marginRight: 5
  },
  buttonRight: {
    flex: 1,
    marginLeft: 5
  }
});

export default SignUpScreen;
