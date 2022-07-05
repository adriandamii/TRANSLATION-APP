import { combineReducers } from 'redux';
import * as reducers from './translationsReducer';

export const reducer = combineReducers({
  translationsList: reducers.translationListReducer,
  createdTranslation: reducers.translationCreateReducer,
  deletedTranslation: reducers.translationDeleteReducer,
  updatedTranslation: reducers.translationUpdateReducer,
  detailedTranslation: reducers.translationDetailsReducer,
  translationsOfficeList: reducers.translationOfficeListReducer,
});
