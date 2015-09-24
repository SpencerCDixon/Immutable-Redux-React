import * as ActionTypes from '../constants/ActionTypes';
import {Map, List} from 'immutable';

let defaultState = Map({
  users: List.of('Spencer', 'Joel', 'Frank')
});

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.TITLE_CHANGED:
      return state.merge({title: action.text});
    default:
      return state;
  }
}
