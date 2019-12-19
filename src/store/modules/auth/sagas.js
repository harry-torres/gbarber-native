import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';
import actions, { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuario nao pode ser prestador de servico'
      );
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticacao',
      'Não foi possível realizar o login. Por favor verifique os seus dados.'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  const { name, email, password } = payload;
  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    // history.push('/');
  } catch (err) {
    Alert.alert(
      'Falha no casastro',
      'Não foi possível realizar o seu cadastro. Por favor verifique os seus dados.'
    );

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  console.tron.log('auth saga signout');
  // history.push('/');
}

export default all([
  // action from redux-persist
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(actions.SIGN_IN_REQUEST, signIn),
  takeLatest(actions.SIGN_UP_REQUEST, signUp),
  takeLatest(actions.SIGN_OUT, signOut),
]);
