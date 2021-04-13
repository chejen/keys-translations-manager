import * as ActionTypes from '../constants/ActionTypes';
import { INIT_RELEASE } from '../constants/InitStates';

export default function release(state = INIT_RELEASE, action) {
  const { payload } = action;

  switch (action.type) {
    case ActionTypes.RELEASE_LOADED:
      return {
        ...state,
        releaseLoading: false,
        releases: payload,
      };

    case ActionTypes.RELEASE_LOADING:
      return {
        ...state,
        releaseLoading: true,
      };

    case ActionTypes.SELECT_RELEASE:
      return {
        ...state,
        currentRelease: payload,
      };

    default:
      return state;
  }
}
