import React, {Component} from 'react';
import {StyleSheet, Platform, Image, TextInput} from 'react-native';
import {View, Header, Content, Button, Text, Icon} from 'native-base';
import {connect} from 'react-redux';

import * as actionType from './../../redux/actionType';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      pass: '',
    };
  }

  render() {
    return (
      <View style={styles.layout}>
        <View style={styles.coverLayout}>
          <Image
            style={styles.coverPicture}
            source={require('./../../../images/cover.png')}
          />
          <Text style={styles.coverText}>OCR Scanning</Text>
        </View>

        <View style={styles.inforLayout}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={text => this.setState({text})}
            value={this.state.text}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={pass => this.setState({pass})}
            value={this.state.pass}
          />
          <Button block style={styles.button} onPress={this.LoginTapped}>
            <Text style={styles.text}>Sign In</Text>
          </Button>
        </View>
      </View>
    );
  }

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
    addScannedPages: (pages: Page[]) =>
      dispatch({type: actionType.ACTION_ADD_PAGES, pages: pages}),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
