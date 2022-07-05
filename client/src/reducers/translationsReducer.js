import {
  TRANSLATION_LIST_SUCCESS,
  TRANSLATION_LIST_FAIL,
  TRANSLATION_LIST_REQUEST,
  TRANSLATION_CREATE_SUCCESS,
  TRANSLATION_CREATE_FAIL,
  TRANSLATION_CREATE_REQUEST,
  TRANSLATION_DELETE_REQUEST,
  TRANSLATION_DELETE_SUCCESS,
  TRANSLATION_DELETE_FAIL,
  TRANSLATION_UPDATE_REQUEST,
  TRANSLATION_UPDATE_SUCCESS,
  TRANSLATION_UPDATE_FAIL,
  TRANSLATION_UPDATE_RESET,
  TRANSLATION_DETAILS_SUCCESS,
  TRANSLATION_DETAILS_REQUEST,
  TRANSLATION_DETAILS_FAIL,
  TRANSLATION_CREATE_RESET,
  TRANSLATION_OFFICE_LIST_REQUEST,
  TRANSLATION_OFFICE_LIST_SUCCESS,
  TRANSLATION_OFFICE_LIST_FAIL,
} from '../constants/actionTypes';

export const translationListReducer = (
  state = { loading: true, translations: [] },
  action
) => {
  switch (action.type) {
    case TRANSLATION_LIST_REQUEST:
      return { loading: true };
    case TRANSLATION_LIST_SUCCESS:
      return { 
        loading: false, 
        translations: action.payload.translations,
        pages: action.payload.pages,
        page: action.payload.page,
        count: action.payload.count,
      };
    case TRANSLATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const translationOfficeListReducer = (
  state = { loading: true, offices: [] },
  action
) => {
  switch (action.type) {
    case TRANSLATION_OFFICE_LIST_REQUEST:
      return { loading: true };
    case TRANSLATION_OFFICE_LIST_SUCCESS:
      return { loading: false, offices: action.payload };
    case TRANSLATION_OFFICE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const translationDetailsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case TRANSLATION_DETAILS_REQUEST:
      return { loading: true };
    case TRANSLATION_DETAILS_SUCCESS:
      return { loading: false, translation: action.payload };
    case TRANSLATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const translationCreateReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case TRANSLATION_CREATE_REQUEST:
      return { loading: true };
    case TRANSLATION_CREATE_SUCCESS:
      return { loading: false, success: true, translation: action.payload };
    case TRANSLATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSLATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const translationUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSLATION_UPDATE_REQUEST:
      return { loading: true };
    case TRANSLATION_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TRANSLATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSLATION_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const translationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSLATION_DELETE_REQUEST:
      return { loading: true };
    case TRANSLATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TRANSLATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
