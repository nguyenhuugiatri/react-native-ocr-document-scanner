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
    case actionType.ACTION_REMOVE_ALL_PAGES:
      return removeAllPages();
    default:
      return state;
  }
};

function addPages(pages: Page[], state: ScannedPagesState): ScannedPagesState {
  return {pages: state.pages.concat(pages)};
}

function removeAllPages(): ScannedPagesState {
  return {pages: []};
}

export default createStore(reducer);
