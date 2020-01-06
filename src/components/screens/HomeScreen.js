import React, {Component} from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Container, Header, Content, Button, Text, Icon} from 'native-base';
import ScanbotSDK, {
  Page,
  BarcodeScannerConfiguration,
  MrzScannerConfiguration,
} from 'react-native-scanbot-sdk';
import {connect} from 'react-redux';

import * as actionType from './../../redux/actionType';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'OCR SCANNER',
  };

  render() {
    return (
      <Container>
        <Content>
          <Button
            block
            style={styles.button}
            onPress={this.startDocumentScannerButtonTapped}>
            <Text style={styles.text}>Take Photo</Text>
          </Button>
          <Button
            block
            style={styles.button}
            onPress={this.viewImageResultsButtonTapped}>
            <Text style={styles.text}>Gallery</Text>
          </Button>
          <Button 
            block 
            style={styles.button}
            onPress={this.viewAccountButtonTapped}>
            <Text style={styles.text}>Account</Text>
          </Button>
          <Button block style={styles.button}>
            <Text style={styles.text}>Upload</Text>
          </Button>
          <Button block style={styles.button}>
            <Text style={styles.text}>Download</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  viewImageResultsButtonTapped = async () => {
    this.gotoImageResults();
  };

  viewAccountButtonTapped = async () => {
    this.gotoAccountScreen();
  };

  startDocumentScannerButtonTapped = async () => {
    const result = await ScanbotSDK.UI.startDocumentScanner({
      polygonColor: '#00ffff',
      cameraPreviewMode: 'FIT_IN',
      orientationLockMode: 'PORTRAIT',
      pageCounterButtonTitle: '%d Page(s)',
      multiPageEnabled: true,
      ignoreBadAspectRatio: true,
    });
    if (result.status === 'OK') {
      this.props.addScannedPages(result.pages);
      this.gotoImageResults();
    }
  };

  gotoImageResults = () => {
    this.props.navigation.push('ImageResults');
  };

  gotoAccountScreen = () => {
    this.props.navigation.push('Account');
  };
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: '#f28080',
    justifyContent: 'center',
    margin: 15,
    textTransform: 'none',
    borderRadius: 45,
},
text:{
    fontSize: 19,
fontWeight: 'bold',
color: '#000000',
textAlign: 'center',
justifyContent:'center',
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

export default connect(null, mapDispatchToProps)(HomeScreen);
