import {
  TRANSLATION_LIST_SUCCESS,
  TRANSLATION_LIST_REQUEST,
  TRANSLATION_LIST_FAIL,
  TRANSLATION_CREATE_SUCCESS,
  TRANSLATION_CREATE_REQUEST,
  TRANSLATION_CREATE_FAIL,
  TRANSLATION_DELETE_REQUEST,
  TRANSLATION_DELETE_SUCCESS,
  TRANSLATION_DELETE_FAIL,
  TRANSLATION_UPDATE_SUCCESS,
  TRANSLATION_UPDATE_REQUEST,
  TRANSLATION_UPDATE_FAIL,
  TRANSLATION_DETAILS_REQUEST,
  TRANSLATION_DETAILS_SUCCESS,
  TRANSLATION_DETAILS_FAIL,
  TRANSLATION_OFFICE_LIST_REQUEST,
  TRANSLATION_OFFICE_LIST_SUCCESS,
  TRANSLATION_OFFICE_LIST_FAIL,
} from '../constants/actionTypes';
import Axios from 'axios';

export const getTranslations = ({
  pageNumber = '',
  name = '',
  office = '',
  translated = '',
  month = '',
}) => async (dispatch) => {
  dispatch({ type: TRANSLATION_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      `http://localhost:5000/translations?name=${name}&office=${office}&translated=${translated}&month=${month}`
    );
    dispatch({ type: TRANSLATION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TRANSLATION_LIST_FAIL, payload: error.message });
  }
};

export const getOffices = () => async (dispatch) => {
  dispatch({
    type: TRANSLATION_OFFICE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      'http://localhost:5000/translations/offices'
    );
    dispatch({ type: TRANSLATION_OFFICE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TRANSLATION_OFFICE_LIST_FAIL, payload: error.message });
  }
};

export const detailsTranslation = (translationId) => async (dispatch) => {
  dispatch({ type: TRANSLATION_DETAILS_REQUEST, payload: translationId });
  try {
    const { data } = await Axios.get(
      `http://localhost:5000/translations/${translationId}`
    );
    dispatch({ type: TRANSLATION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TRANSLATION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTranslation = (newTranslation) => async (dispatch) => {
  dispatch({ type: TRANSLATION_CREATE_REQUEST });
  try {
    const { data } = await Axios.post(
      'http://localhost:5000/translations',
      newTranslation
    );
    dispatch({ type: TRANSLATION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TRANSLATION_CREATE_FAIL, payload: message });
  }
};

export const updateTranslation = (translation) => async (dispatch) => {
  dispatch({ type: TRANSLATION_UPDATE_REQUEST, payload: translation });
  try {
    const { data } = await Axios.put(
      `http://localhost:5000/translations/${translation._id}`,
      translation
    );
    dispatch({ type: TRANSLATION_UPDATE_SUCCESS, payload: data });
  } catch (error) {     
    dispatch({ type: TRANSLATION_UPDATE_FAIL, error: error });
  }
};

export const deleteTranslation = (id) => async (dispatch) => {
  dispatch({ type: TRANSLATION_DELETE_REQUEST });
  try {
    await Axios.delete(`http://localhost:5000/translations/${id}`);

    dispatch({ type: TRANSLATION_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: TRANSLATION_DELETE_FAIL });
  }
};
