import { Alert } from 'react-native';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import actions, { updateProfileSuccess, updateProfileFailure } from './actions';
import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const respose = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso', 'Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(respose.data));
  } catch (err) {
    Alert.alert('Falha', 'Erro ao atualizar perfil. Verifique seus dados');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest(actions.UPDATE_PROFILE_REQUEST, updateProfile)]);
