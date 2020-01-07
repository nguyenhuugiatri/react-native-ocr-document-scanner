import React, {Component} from 'react';
import {StyleSheet, Platform, Dimensions, Image} from 'react-native';
import {
  Container,
  View,
  Header,
  Content,
  Button,
  Text,
  Icon,
} from 'native-base';
import {connect} from 'react-redux';
import * as actionType from './../../redux/actionType';
import {TouchableOpacity} from 'react-native-gesture-handler';

class AccountScreen extends Component {
  static navigationOptions = {
    title: 'Account',
  };

  render() {
    return (
      <View style={styles.big}>
        <View style={styles.layout}>
          <Image
            style={styles.picture}
            source={require('./../../../images/account.png')}
          />
          <Text flex={1} style={styles.username}>
            NgVanA
          </Text>
        </View>
        <View style={styles.layout2}>
          <Button style={styles.button} onPress={this.changepasswordTapped}>
            <Text style={styles.text}>Change password</Text>
          </Button>

          <Button style={styles.button} onPress={this.feedbackTapped}>
            <Text style={styles.text}>Feedback</Text>
          </Button>

          <Button style={styles.button} onPress={this.logoutTapped}>
            <Text style={styles.text}>Logout</Text>
          </Button>
        </View>
      </View>
    );
  }

  changepasswordTapped = async () => {};

  feedbackTapped = async () => {};

  logoutTapped = async () => {
    this.gotoLoginScreen();
  };

  gotoLoginScreen = () => {
    this.props.navigation.push('Login');
  };
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#f28080',
  },
  layout2: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    backgroundColor: '#f28080',
    justifyContent: 'center',
    margin: 20,
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
  username: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  big: {
    backgroundColor: '#f000',
    flex: 1,
  },
  picture: {
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
    height: 100,
    resizeMode: 'stretch',
  },
});
// export default class AccountImage extends Component {
//     render() {
//         return (
//             <View>
//                 <Image source={require('./../../../images/account.png')} />
//             </View>
//         );
//     }
// }

const mapDispatchToProps = dispatch => {
  return {
    removeScannedPage: (page: Page) =>
      dispatch({type: actionType.ACTION_REMOVE_PAGE, page: page}),
    updateScannedPage: (page: Page) =>
      dispatch({type: actionType.ACTION_UPDATE_OR_ADD_PAGE, page: page}),
  };
};

export default connect(null, mapDispatchToProps)(AccountScreen);
