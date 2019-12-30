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
  FooterTab,
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import ScanbotSDK, {Page} from 'react-native-scanbot-sdk';

import * as actionType from './../../redux/actionType';

class ImageResultsScreen extends Component {
  static navigationOptions = {
    title: 'Gallery',
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
          <FooterTab>
            <Button style={styles.button}>
              <Text style={styles.text} onPress={this.saveAsPdfButtonTapped}>
                Save as PDF
              </Text>
            </Button>
            <Button style={styles.button} onPress={this.deleteAllButtonTapped}>
              <Text style={styles.text}>Delete All</Text>
            </Button>
          </FooterTab>
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

  deleteAllButtonTapped = async () => {
    this.props.removeAllScannedPages();
    await ScanbotSDK.cleanup();
  };

  checkImages(): boolean {
    const {scannedPages} = this.props;
    if (scannedPages.length > 0) {
      return true;
    }
    this.showAlert(
      'Warning !',
      'Your gallery is empty. Please scan some images.',
    );
    return false;
  }

  saveAsPdfButtonTapped = async () => {
    if (!this.checkImages()) {
      return;
    }

    const {scannedPages} = this.props;
    this.showSpinner();
    try {
      const imageUris = scannedPages.map(
        p => p.documentImageFileUri || p.originalImageFileUri,
      );
      const result = await ScanbotSDK.createPDF(imageUris, 'FIXED_A4');
      this.showAlert('PDF file created', result.pdfFileUri, true);
    } finally {
      this.hideSpinner();
    }
  };

  showAlert(title: string, message: string, delayed: boolean = false) {
    if (delayed) {
      setTimeout(() => {
        Alert.alert(title, message);
      }, 200);
    } else {
      Alert.alert(title, message);
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
    width: 110,
    height: 110,
    resizeMode: 'contain',
    margin: 10,
  },
  spinner: {
    flex: 1,
    alignSelf: 'center',
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

const mapStateToProps = (state: ScannedPagesState) => {
  return {
    scannedPages: state.pages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeAllScannedPages: () =>
      dispatch({type: actionType.ACTION_REMOVE_ALL_PAGES}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageResultsScreen);
