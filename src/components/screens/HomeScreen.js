import React, {Component} from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Container, Header, Content, Button, Text, Icon} from 'native-base';
import ScanbotSDK, {
  Page,
  BarcodeScannerConfiguration,
  MrzScannerConfiguration,
} from 'react-native-scanbot-sdk';
import {connect} from 'react-redux';

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
            <Text>Scan Documents</Text>
          </Button>
          <Button block style={styles.button}>
            <Text>Do later</Text>
          </Button>
          <Button block style={styles.button}>
            <Text>Do later</Text>
          </Button>
          <Button block style={styles.button}>
            <Text>Do later</Text>
          </Button>
          <Button block style={styles.button}>
            <Text>Do later</Text>
          </Button>
        </Content>
      </Container>
    );
  }
  startDocumentScannerButtonTapped = async () => {
    const result = await ScanbotSDK.UI.startDocumentScanner({
      polygonColor: '#00ffff',
      cameraPreviewMode: 'FIT_IN',
      orientationLockMode: 'PORTRAIT',
      pageCounterButtonTitle: '%d Page(s)',
      multiPageEnabled: true,
      ignoreBadAspectRatio: true,
    });
  };
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8bbabb',
    margin: 10,
  },
});

export default HomeScreen;
