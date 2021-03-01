/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from "react-redux";
import store from "./src/redux/store";
import AppRouter from './src/router/AppRouter';

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
};

export default App;
