import ImagePicker from 'react-native-image-picker';
import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {View, Button, Text} from 'native-base';
import {connect} from 'react-redux';
import * as actionType from './../../redux/actionType';
import Avatar from './../../../images/cover.png';

const options = {
  title: 'Select Image',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class UploadScreen extends Component {
  static navigationOptions = {
    title: 'Upload',
  };

  constructor(props) {
    super(props);
    this.state = {
      imageSource: null,
    };
  }

  componentDidMount() {
    //
  }

  render() {
    return (
      <View style={styles.big}>
        <View style={styles.layout}>
          {/* <Image style={styles.picture} source={Avatar} /> */}
          <Image
            source={
              this.state.imageSource === null ? Avatar : this.state.imageSource
            }
            style={styles.picture}
          />
          <Text flex={1} style={styles.username} />
        </View>
        <View style={styles.layout2}>
          <Button style={styles.button} onPress={this.chooseImageButtonTapped}>
            <Text style={styles.text}>Choose Image</Text>
          </Button>
          <Button style={styles.button} onPress={this.UploadImageButtonTapped}>
            <Text style={styles.text}>Upload Image</Text>
          </Button>
        </View>
      </View>
    );
  }
  chooseImageButtonTapped = () => {
    pick(source => this.setState({imageSource: source}));
  };

  UploadImageButtonTapped = async () => {};
}

const pick = cb => {
  ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = {uri: response.uri};

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      cb(source);
    }
  });
};

const styles = StyleSheet.create({
  layout: {
    flex: 3,
    backgroundColor: '#f28080',
  },
  layout2: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    backgroundColor: '#f28080',
    justifyContent: 'center',
    margin: 20,
    textTransform: 'none',
    borderRadius: 45,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
  },
  big: {
    backgroundColor: '#f000',
    flex: 1,
  },
  picture: {
    alignSelf: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
});

export default connect(null, null)(UploadScreen);
