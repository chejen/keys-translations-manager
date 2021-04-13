import * as ActionTypes from '../constants/ActionTypes';
import configUtil from '../configUtil';
import { reloadData, showMask } from './components';

export function getReleases() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.RELEASE_LOADING,
    });
    return fetch(configUtil.getHost() + '/api/releases', {
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
      },
      method: 'GET',
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.status + ', ' + res.statusText);
        }
        return res.json();
      })
      .then((payload) => {
        dispatch({
          type: ActionTypes.RELEASE_LOADED,
          payload,
        });
      });
  };
}

export function newRelease(version) {
  return (dispatch, getState) => {
    const { currentRelease } = getState().release;
    dispatch(showMask(true));
    return fetch(configUtil.getHost() + '/api/releases', {
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
      },
      method: 'POST',
      body: JSON.stringify({ base:currentRelease,version }),
    })
      .then((res) => {
        if (res.status >= 400) {
          // eslint-disable-next-line no-alert
          window.alert('Version is already exist!');
          dispatch(showMask(false));
          throw new Error(res.status + ', ' + res.statusText);
        }
        return res.json();
      })
      .then(() => {
        dispatch(showMask(false));
        dispatch(getReleases());
        dispatch(selectRelease(version));
      });
  };
}

export function selectRelease(payload) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SELECT_RELEASE,
      payload,
    });

    dispatch(reloadData());
  };
}
