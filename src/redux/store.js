import {createStore} from 'redux';
import {Page} from 'react-native-scanbot-sdk';

export type ScannedPagesState = {
  pages: Page[],
};

import * as actionType from './actionType';

const reducer = (state: ScannedPagesState = {pages: []}, action) => {
  switch (action.type) {
    case actionType.ACTION_ADD_PAGES:
      return addPages(action.pages, state);
    default:
      return state;
  }
};

function addPages(pages: Page[], state: ScannedPagesState): ScannedPagesState {
  return {pages: state.pages.concat(pages)};
}

export default createStore(reducer);
