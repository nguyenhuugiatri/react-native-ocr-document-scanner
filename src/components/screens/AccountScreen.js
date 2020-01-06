import React, {Component} from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Container, Header, Content, Button, Text, Icon} from 'native-base';
import {connect} from 'react-redux';

import * as actionType from './../../redux/actionType';


class AccountScreen extends Component {
    static navigationOptions = {
      title: 'Account',
    };

    render() {
        return (
            <Container>
                <Content>
                    <Text>User name</Text>
                    <Text>Email</Text>
                </Content>
            </Container>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
      removeScannedPage: (page: Page) =>
        dispatch({type: actionType.ACTION_REMOVE_PAGE, page: page}),
      updateScannedPage: (page: Page) =>
        dispatch({type: actionType.ACTION_UPDATE_OR_ADD_PAGE, page: page}),
    };
  };
  
  export default connect(null, mapDispatchToProps)(AccountScreen);
  