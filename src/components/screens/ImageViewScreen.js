import React, {Component} from 'react';
import {Image, StyleSheet, View, Dimensions, Alert} from 'react-native';
import {
  Container,
  Content,
  Text,
  Footer,
  Button,
  Left,
  Right,
  FooterTab,
} from 'native-base';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ScanbotSDK, {Page} from 'react-native-scanbot-sdk';

class ImageViewScreen extends Component {
  static navigationOptions = {
    title: 'Detail',
  };

  constructor(props) {
    super(props);

    this.state = {
      page: this.props.navigation.getParam('page'),
      spinnerVisible: false,
    };
  }

  componentDidMount() {
    //
  }

  render() {
    const {page} = this.state;
    return (
      <Container>
        <Content>
          <Spinner
            visible={this.state.spinnerVisible}
            textContent={'Processing ...'}
            textStyle={{color: '#FFF'}}
            cancelable={false}
          />
          <View style={styles.content}>
            <Image
              source={{
                uri: `${page.documentPreviewImageFileUri}?${Date.now()}`,
              }}
              style={styles.documentImage}
            />
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button style={styles.button}>
              <Text style={styles.text}>Crop</Text>
            </Button>
            <Button style={styles.button}>
              <Text style={styles.text}>OCR</Text>
            </Button>
            <Button style={styles.button}>
              <Text style={styles.text}>Delete</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  showSpinner() {
    this.setState({spinnerVisible: true});
  }

  hideSpinner() {
    this.setState({spinnerVisible: false});
  }

  showAlert(title: string, message: string, delayed: boolean = false) {
    if (delayed) {
      setTimeout(() => {
        Alert.alert(title, message);
      }, 200);
    } else {
      Alert.alert(title, message);
    }
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  documentImage: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 2,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ededed',
  },
  button: {
    backgroundColor: '#464159',
  },
});

export default connect(null, null)(ImageViewScreen);
