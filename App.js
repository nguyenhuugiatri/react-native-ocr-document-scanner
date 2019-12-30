import React, {Component} from 'react';
import {Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {Provider} from 'react-redux';
import {DocumentDirectoryPath, ExternalDirectoryPath} from 'react-native-fs';

import Store from './Store';
import HomeScreen from './src/components/screens/HomeScreen';

const SDK_LICENSE_KEY =
  'Rn4S4wfk3OluZ2iIzswWpWrPt7ktmS' +
  'bMfxWYP/xknWtUJbx4NvRbonOO3rYd' +
  'JVMnfBrPkxeVZfpXPevPV+TfR6hdgT' +
  'cxvAyE8n4SNUvaIfkubVkxDNqI7SRy' +
  'C5mOsRbsvysu3rPJ6S13/OWA9plp32' +
  '/J3h7XjYZD9T6tocAQT6ZmgJuq9a9J' +
  '33VlY87EEzGbY1+DRrllPGsafDGDsL' +
  '16m9Y3k7dOj0ft/K1N4oCK76kGn/2t' +
  '6BRX/SepbBH4H9I+6p2ro9xW0jW2IN' +
  'oPqHF6sCAKt7duW5SSkqewmmeRpWv9' +
  'BGmsvc5q1sNFAYRsS7O+BSQGIJ5Cj3' +
  'zbeYvADE9zLA==\nU2NhbmJvdFNESw' +
  'pjb20uaGNtdXNfbm1jbnBtX29jcnNj' +
  'YW4KMTU4MDQyODc5OQo1OTAKMw==\n';

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#FF2729C3',
      },
      headerTintColor: '#fff',
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
      return DocumentDirectoryPath + '/OCRScaner-storage';
    } else if (Platform.OS === 'android') {
      return ExternalDirectoryPath + '/OCRScaner-storage';
    }
    return null;
  }
}
