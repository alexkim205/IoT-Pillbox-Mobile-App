import React from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Text, Button, Input, Icon } from "react-native-ui-kitten";
import { withFirebase } from "../../firebase";

const INITIAL_STATE = {
  first_name: "",
  last_name: "",
  medical_id: "",
  error: null
};

const SignInScreen = props => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Text style={styles.title} category="h5">
        Patient Login
      </Text>
      <SignInForm />
    </KeyboardAvoidingView>
  );
};

class SignInFormBase extends React.Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { navigation, firebase } = this.props;
    const { first_name, last_name, medical_id } = this.state;
    firebase
      .doSignInWithEmailAndPassword(
        `${first_name.trim()}_${last_name.trim()}_${medical_id.trim()}@xyz.com`,
        medical_id
      )
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
          <Icon name="person" width={80} height={80} fill="#FFFFFF" />
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
          value={this.state.medical_id}
          onChangeText={medical_id => this.setState({ medical_id })}
          placeholder="Medical ID"
        />
        <Button
          style={styles.button}
          status={"primary"}
          onPress={this.onSubmit}
        >
          Sign In
        </Button>
      </View>
    );
  }
}

const SignInForm = withFirebase(SignInFormBase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginVertical: 10
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
  button: {
    marginVertical: 20,
    width: "100%"
  }
});

export default SignInScreen;
