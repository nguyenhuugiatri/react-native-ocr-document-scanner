import React, {Component} from 'react';
import {Alert, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {
  Button,
  Container,
  Content,
  Text,
  Footer,
  Right,
  Left,
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import ScanbotSDK, {Page} from 'react-native-scanbot-sdk';

class ImageResultsScreen extends Component {
  static navigationOptions = {
    title: 'Image Results',
  };

  constructor(props) {
    super(props);

    this.state = {
      spinnerVisible: false,
    };
  }

  componentDidMount() {
    //
  }

  render() {
    const {scannedPages} = this.props;
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
            {this.renderThumbnails(scannedPages)}
          </View>
        </Content>
        <Footer>
          <Left>
            <Button transparent>
              <Text>Save as PDF</Text>
            </Button>
          </Left>
          <Left>
            <Button transparent>
              <Text>Save as TIFF</Text>
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Text>Delete All</Text>
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }

  renderThumbnails(pages: Page[]) {
    if (pages) {
      return pages.map((p, i) => (
        <TouchableOpacity key={i}>
          <Image
            style={styles.galleryImage}
            source={{uri: `${p.documentPreviewImageFileUri}?${Date.now()}`}}
          />
        </TouchableOpacity>
      ));
    }
  }

  showSpinner() {
    this.setState({spinnerVisible: true});
  }

  hideSpinner() {
    this.setState({spinnerVisible: false});
  }
}

const styles = StyleSheet.create({
  content: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: 10,
  },
  galleryImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 10,
  },
  spinner: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default ImageResultsScreen;
