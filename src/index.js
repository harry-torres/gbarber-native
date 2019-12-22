import React from 'react';
import 'react-native-gesture-handler';
import './config/ReactotronConfig';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import App from './App';
import Background from '~/components/Background';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <Background>
          <App />
        </Background>
      </PersistGate>
    </Provider>
  );
}
