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
    case actionType.ACTION_REMOVE_PAGE:
      return removePage(action.page, state);
    case actionType.ACTION_UPDATE_OR_ADD_PAGE:
      return updateOrAddPage(action.page, state);
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

function removePage(page: Page, state: ScannedPagesState): ScannedPagesState {
  let pages = state.pages;
  const index = pages.findIndex(p => p.pageId === page.pageId);
  if (index !== -1) {
    pages = [...pages];
    pages.splice(index, 1);
  }
  return {pages};
}

function updateOrAddPage(
  page: Page,
  state: ScannedPagesState,
): ScannedPagesState {
  let updated = false;
  const pages = [...state.pages];
  for (let i = 0; i < pages.length; ++i) {
    if (pages[i].pageId === page.pageId) {
      pages[i] = page;
      updated = true;
      break;
    }
  }
  if (!updated) {
    pages.push(page);
  }
  return {pages};
}

export default createStore(reducer);
