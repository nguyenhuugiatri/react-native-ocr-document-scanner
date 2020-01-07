import React, {Component} from 'react';
import {Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {Provider} from 'react-redux';
import {DocumentDirectoryPath, ExternalDirectoryPath} from 'react-native-fs';

import Store from './src/redux/store';
import HomeScreen from './src/components/screens/HomeScreen';
import ImageResultsScreen from './src/components/screens/ImageResultsScreen';
import ImageViewScreen from './src/components/screens/ImageViewScreen';
import AccountScreen from './src/components/screens/AccountScreen';
import LoginScreen from './src/components/screens/LoginScreen';
import SignUpScreen from './src/components/screens/SignUpScreen';

const SDK_LICENSE_KEY =
  'mUI1geNDOHudUYHokX4EyschlOqx6D' +
  'W0GfC6780kn3QY0as+AInBwxmU0tQj' +
  'yg/16DSUJr2tY6kUxeYZi1x2t2GxYW' +
  '76jewc10Y6fozXXk6GEq6D/hhD+F6O' +
  '3HsdCWJwZTraX9YzmeEbkC5d4TqCrJ' +
  '0iBL/weIUY38f3TQJ/mngTNXfa1p6B' +
  '+ycvYbNnG6i06IKHHQX75GtRnJRntx' +
  'i1xViQl+E2qsBTD2cTfhXLGdPGVjWp' +
  '78BezY9mDonlBKdG4v+IqBRksyc9gG' +
  'EjajrGXMOhDzj10/H30ScDWTOoQOku' +
  'ebeOBfE1uZ5afGNe8Pv/Q4dCabtPto' +
  '74n87gLPFJlQ==\nU2NhbmJvdFNESw' +
  'pjb20uaGNtdXNfbm1jbnBtX29jcnNj' +
  'YW5uZXIKMTU4MDQyODc5OQoxMDcxMD' +
  'IKMw==\n';

const MainStack = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Home: HomeScreen,
    ImageResults: ImageResultsScreen,
    ImageView: ImageViewScreen,
    Account: AccountScreen,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f28080',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <AppContainer />
      </Provider>
    );
  }

  componentDidMount() {
    this.initializeSDK();
  }

  async initializeSDK() {
    const options = {
      licenseKey: SDK_LICENSE_KEY,
      loggingEnabled: true,
      storageImageFormat: 'JPG',
      storageImageQuality: 80,
      storageBaseDirectory: this.getCustomStoragePath(),
    };
    try {
      const result = await ScanbotSDK.initializeSDK(options);
      console.log(
        'Scanbot SDK initialization result: ' + JSON.stringify(result),
      );
    } catch (ex) {
      console.error(
        'Scanbot SDK initialization error: ' + JSON.stringify(ex.error),
      );
    }
  }

  getCustomStoragePath(): string {
    if (Platform.OS === 'ios') {
      return DocumentDirectoryPath;
    } else if (Platform.OS === 'android') {
      return ExternalDirectoryPath;
    }
    return null;
  }
}
