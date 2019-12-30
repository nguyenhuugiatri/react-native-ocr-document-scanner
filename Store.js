import {createStore} from 'redux';
import {Page} from 'react-native-scanbot-sdk';

export type ScannedPagesState = {
  pages: Page[],
};

const reducer = (state: ScannedPagesState = {pages: []}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default createStore(reducer);
