import React, {Component} from 'react';
import {StyleSheet, Image, TextInput, Alert} from 'react-native';
import {View, Button, Text} from 'native-base';
import {connect} from 'react-redux';
import * as actionType from './../../redux/actionType';
import CoverImage from './../../../images/cover.png';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.layout}>
        <View style={styles.coverLayout}>
          <Image style={styles.coverPicture} source={CoverImage} />
          <Text style={styles.coverText}>OCR Scanning</Text>
        </View>

        <View style={styles.inforLayout}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={username => this.setState({username})}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={password => this.setState({password})}
          />
          <Button
            block
            style={styles.button}
            onPress={() => this.submit(this.state, this.props.navigation)}>
            <Text style={styles.text}>Sign In</Text>
          </Button>
          <Button block style={styles.button} onPress={this.singupButtonTaped}>
            <Text style={styles.text}>Sign Up</Text>
          </Button>
        </View>
      </View>
    );
  }

  submit = (user, navigation) => {
    if (!user.username || user.username.trim().length === 0) {
      this.showAlert('Warning !', 'Username is required');
      return;
    }
    if (!user.password || user.password.trim().length === 0) {
      this.showAlert('Warning !', 'Password is required');
      return;
    }
    this.props.login(user, navigation);
  };

  singupButtonTaped = () => {
    this.goToSignUpScreen();
  };

  gotoHomeScreen = () => {
    this.props.navigation.push('Home');
  };

  goToSignUpScreen = () => {
    this.props.navigation.push('SignUp');
  };

  showAlert = (title: string, message: string, delayed: boolean = false) => {
    if (delayed) {
      setTimeout(() => {
        Alert.alert(title, message);
      }, 200);
    } else {
      Alert.alert(title, message);
    }
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
  coverPicture: {
    alignContent: 'center',
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  coverText: {
    alignSelf: 'center',
    alignContent: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
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
  inputPass: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 45,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    login: (user, navigation) =>
      dispatch({type: actionType.ACTION_LOGIN, user, navigation}),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
