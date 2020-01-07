import React, {Component} from 'react';
import {StyleSheet, TextInput} from 'react-native';
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
          <Button block style={styles.button} onPress={this.singupButtonTaped}>
            <Text style={styles.text}>Sign Up</Text>
          </Button>
        </View>
      </View>
    );
  }

  LoginTapped = async () => {
    this.gotoHomeScreen();
  };

  singupButtonTaped = () => {
    //TODO
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
    addScannedPages: (pages: Page[]) =>
      dispatch({type: actionType.ACTION_ADD_PAGES, pages: pages}),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
