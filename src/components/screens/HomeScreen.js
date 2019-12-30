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
            <Text style={styles.text}>Scan Documents</Text>
          </Button>
          <Button
            block
            style={styles.button}
            onPress={this.viewImageResultsButtonTapped}>
            <Text style={styles.text}>Gallery</Text>
          </Button>
          <Button block style={styles.button}>
            <Text style={styles.text}>Do later</Text>
          </Button>
          <Button block style={styles.button}>
            <Text style={styles.text}>Do later</Text>
          </Button>
          <Button block style={styles.button}>
            <Text style={styles.text}>Do later</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  viewImageResultsButtonTapped = async () => {
    this.gotoImageResults();
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
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8bbabb',
    margin: 10,
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ededed',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    addScannedPages: (pages: Page[]) =>
      dispatch({type: actionType.ACTION_ADD_PAGES, pages: pages}),
  };
};

export default connect(null, mapDispatchToProps)(HomeScreen);
