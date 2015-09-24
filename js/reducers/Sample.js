import * as ActionTypes from '../constants/ActionTypes';
import {Map} from 'immutable';

let defaultState = Map({
  title: 'Home',
  page: 'Apple'
});

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.TITLE_CHANGED:
      return state.merge({title: action.text});
    default:
      return state;
  }
}
