import produce from 'immer';
import actions from './actions';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actions.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case actions.UPDATE_PROFILE_SUCCESS: {
        draft.profile = action.payload.profile;
        break;
      }
      case actions.SIGN_OUT: {
        console.tron.log('user reducer');
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
