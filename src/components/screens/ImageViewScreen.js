import React, {Component} from 'react';
import {Image, StyleSheet, View, Dimensions, Alert, Picker} from 'react-native';
import {Container, Content, Text, Footer, Button, FooterTab} from 'native-base';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ScanbotSDK, {Page} from 'react-native-scanbot-sdk';
import Share from 'react-native-share';
import fs from 'react-native-fs';
import PDFIcon from './../../../images/pdf.png';
import CropIcon from './../../../images/crop.png';
import ScanIcon from './../../../images/scan.png';
import ShareIcon from './../../../images/share.png';
import DeleteIcon from './../../../images/delete.png';

//import cropImage from '../../../asset/crop.PNG'

import * as actionType from './../../redux/actionType';
import {TouchableOpacity} from 'react-native-gesture-handler';

class ImageViewScreen extends Component {
  static navigationOptions = {
    title: 'Detail',
  };

  constructor(props) {
    super(props);

    this.state = {
      page: this.props.navigation.getParam('page'),
      spinnerVisible: false,
      language: 'en',
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
        <View>
          <Picker
            selectedValue={this.state.language}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue})
            }>
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Vietnamese" value="vi" />
          </Picker>
        </View>
        <Footer>
          <FooterTab style={{backgroundColor: '#f28080'}}>
            <Button style={styles.button} onPress={this.saveAsPdfButtonTapped}>
              <Image style={styles.picture} source={PDFIcon} />
            </Button>
            <Button style={styles.button} onPress={this.cropButtonTapped}>
              <Image style={styles.picture} source={CropIcon} />
            </Button>
            <Button style={styles.button} onPress={this.performOcrButtonTapped}>
              <Image style={styles.picture} source={ScanIcon} />
            </Button>
            <Button style={styles.button} onPress={this.shareButtonTapped}>
              <Image style={styles.picture} source={ShareIcon} />
            </Button>
            <Button style={styles.button} onPress={this.deleteButtonTapped}>
              <Image style={styles.picture} source={DeleteIcon} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  shareButtonTapped = async () => {
    const {page} = this.state;
    const EXTENSION = '.jpg';
    this.showSpinner();
    try {
      const imageUri = page.documentImageFileUri;
      const pos = imageUri.indexOf(EXTENSION) + EXTENSION.length;
      const imageUrl = imageUri.substring(0, pos);
      const base64 = await fs.readFile(imageUrl, 'base64');
      const shareOptions = {
        url: `data:image/jpg;base64,${base64}`,
      };
      //this.showAlert('PDF file created', shareOptions, true);

      await Share.open(shareOptions);
    } finally {
      this.hideSpinner();
    }
  };

  saveAsPdfButtonTapped = async () => {
    const {page} = this.state;
    this.showSpinner();
    try {
      const imageUri = page.documentImageFileUri || page.originalImageFileUri;
      const imageUriArray = [imageUri];
      const result = await ScanbotSDK.createPDF(imageUriArray, 'FIXED_A4');
      this.showAlert('PDF file created', result.pdfFileUri, true);
    } finally {
      this.hideSpinner();
    }
  };

  performOcrButtonTapped = async () => {
    const {page} = this.state;
    this.showSpinner();
    try {
      const imageUris = [
        page.documentImageFileUri || page.originalImageFileUri,
      ];
      const result = await ScanbotSDK.performOCR(
        imageUris,
        [this.state.language],
        {
          outputFormat: 'PLAIN_TEXT',
        },
      );
      this.showAlert('OCR Result', result.plainText, true);
    } finally {
      this.hideSpinner();
    }
  };

  cropButtonTapped = async () => {
    const {page} = this.state;
    const result = await ScanbotSDK.UI.startCroppingScreen(page, {
      doneButtonTitle: 'Apply',
      topBarBackgroundColor: '#6c7b95',
      bottomBarBackgroundColor: '#6c7b95',
    });

    if (result.status === 'OK') {
      this.setState({page: result.page});
      this.props.updateScannedPage(result.page);
    }
  };

  deleteButtonTapped = async () => {
    const {page} = this.state;
    this.props.removeScannedPage(page);
    await ScanbotSDK.removePage(page);
    this.gotoImageResults();
  };

  gotoImageResults = () => {
    this.props.navigation.pop();
  };

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
  picker: {height: 50, width: '100%'},
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  documentImage: {
    flex: 1,
    width: Dimensions.get('window').width - 10,
    height: (Dimensions.get('window').height / 3) * 2,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ededed',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f28080',
    justifyContent: 'center',
    textTransform: 'none',
    borderRadius: 45,
    flex: 1,
    width: 70,
    padding: 5,
    alignContent: 'center',
    borderColor: '#080',
  },
  picture: {
    resizeMode: 'contain',
    width: 35,
    height: 20,
    flex: 1,
    alignSelf: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    removeScannedPage: (page: Page) =>
      dispatch({type: actionType.ACTION_REMOVE_PAGE, page: page}),
    updateScannedPage: (page: Page) =>
      dispatch({type: actionType.ACTION_UPDATE_OR_ADD_PAGE, page: page}),
  };
};

export default connect(null, mapDispatchToProps)(ImageViewScreen);
