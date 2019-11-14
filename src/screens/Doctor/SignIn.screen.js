import React from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Text, Button, Input, Icon } from "react-native-ui-kitten";
import { withFirebase } from "../../firebase";

const INITIAL_STATE = {
  username: "",
  password: "",
  secureTextEntry: true,
  error: null
};

const SignInScreen = props => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <Text style={styles.title} category="h5">
        Doctor Login
      </Text>
      <SignInForm navigation={props.navigation}/>
    </KeyboardAvoidingView>
  );
};

class SignInFormBase extends React.Component {
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
    const { username, password } = this.state;
    firebase
      .doSignInWithEmailAndPassword(
        `${username}@doctor.com`,
        password
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
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          icon={this.renderIcon}
          secureTextEntry={this.state.secureTextEntry}
          onIconPress={this.onIconPress}
          placeholder="Password"
        />
        <View style={styles.buttonbox}>
          <Button
          appearance="filled"
            style={styles.buttonLeft}
            status={"primary"}
            onPress={this.onSubmit}
          >
            Sign In
          </Button>
          <Button
            appearance="outline"
            style={styles.buttonRight}
            status={"primary"}
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            Sign Up
          </Button>
        </View>
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
  buttonbox: {
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row'
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

export default SignInScreen;
