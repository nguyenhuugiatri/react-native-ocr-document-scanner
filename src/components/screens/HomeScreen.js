import React, {Component} from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import {
  Container,
  Content,
  Text,
  ListItem,
  List,
  Right,
  Left,
  Icon,
} from 'native-base';
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
        <Content style={styles.content}>
          <List>
            <ListItem itemHeader first>
              <Text>DOCUMENT SCANNER</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    margin: 10,
  },
});

export default HomeScreen;
