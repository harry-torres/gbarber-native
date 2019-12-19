import produce from 'immer';
import actions from './actions';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actions.SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }
      case actions.SIGN_IN_SUCCESS: {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case actions.SIGN_UP_SUCCESS: {
        draft.loading = false;
        break;
      }
      case actions.SIGN_FAILURE: {
        draft.loading = false;
        break;
      }
      case actions.SIGN_OUT: {
        draft.token = null;
        draft.signed = false;
        break;
      }
      case actions.SIGN_UP_REQUEST: {
        draft.loading = true;
        break;
      }
      default:
    }
  });
}
