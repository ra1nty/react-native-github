import React from 'react';
import { NavigatorIOS } from 'react-native';
import { Provider } from 'react-redux';
import Main from './components/Main'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}