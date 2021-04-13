import * as ActionTypes from '../constants/ActionTypes';
import configUtil from '../configUtil';

export function loadCounts() {
  return (dispatch, getState) => {
    const { currentRelease } = getState().release;
    return fetch(
      configUtil.getHost() +
        `/api/${currentRelease}/count/projects?t=` +
        +new Date()
    )
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.status + ', ' + res.statusText);
        }
        return res.json();
      })
      .then((result) => {
        let l = result.length,
          field = '_id',
          c,
          o = {};

        while (l--) {
          c = result[l];
          o[c[field]] = c.count;
        }
        dispatch({
          type: ActionTypes.LOAD_COUNTS,
          counts: o,
        });
      });
  };
}
