import React, {Component} from 'react';
import {StyleSheet, TextInput, Alert} from 'react-native';
import {View, Button, Text} from 'native-base';
import {connect} from 'react-redux';
import * as actionType from './../../redux/actionType';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      fullname: '',
      email: '',
      phone: '',
    };
  }

  render() {
    return (
      <View style={styles.layout}>
        <View style={styles.inforLayout}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={username => this.setState({username})}
            value={this.state.username}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={password => this.setState({password})}
            value={this.state.password}
          />
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            onChangeText={fullname => this.setState({fullname})}
            value={this.state.fullname}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={email => this.setState({email})}
            value={this.state.email}
          />
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            onChangeText={phone => this.setState({phone})}
            value={this.state.phone}
          />
          <Button
            block
            style={styles.button}
            onPress={() => this.submit(this.state, this.props.navigation)}>
            <Text style={styles.text}>Sign Up</Text>
          </Button>
        </View>
      </View>
    );
  }

  showAlert = (title: string, message: string, delayed: boolean = false) => {
    if (delayed) {
      setTimeout(() => {
        Alert.alert(title, message);
      }, 200);
    } else {
      Alert.alert(title, message);
    }
  };

  submit = (user, navigation) => {
    if (!user.username || user.username.trim().length === 0) {
      this.showAlert('Warning !', 'Username is required');
      return;
    }
    if (!user.password || user.password.trim().length === 0) {
      this.showAlert('Warning !', 'Password is required');
      return;
    }
    if (!user.fullname || user.fullname.trim().length === 0) {
      this.showAlert('Warning !', 'Full name is required');
      return;
    }
    if (!user.email || user.email.trim().length === 0) {
      this.showAlert('Warning !', 'Email is required');
      return;
    }
    if (!user.phone || user.phone.trim().length === 0) {
      this.showAlert('Warning !', 'Phone is required');
      return;
    }
    this.props.signUp(user, navigation);
  };

  LoginTapped = async () => {
    this.gotoHomeScreen();
  };

  gotoHomeScreen = () => {
    this.props.navigation.push('Home');
  };
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  coverLayout: {
    flex: 1,
    padding: 10,
  },
  inforLayout: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 45,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    paddingLeft: 20,
  },
  button: {
    backgroundColor: '#f28080',
    justifyContent: 'center',
    margin: 15,
    textTransform: 'none',
    borderRadius: 45,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    signUp: (user, navigation) =>
      dispatch({type: actionType.ACTION_SIGN_UP, user, navigation}),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
