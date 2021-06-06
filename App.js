/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar, Text, useColorScheme, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createStore} from "redux";
import {Provider} from "react-redux";
import Reducers from "./src/Reducers";

import HomeNav from "./src/Navigators/HomeNavigator";
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import ShazamNavigator from './src/Navigators/Home/ShazamNavigator';

// enableScreens(true);

const Stack = createStackNavigator();

const store = createStore(Reducers, {});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={HomeNav} />
          </Stack.Navigator>
          <StatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0.1)" />
      </NavigationContainer>
    </Provider>
  );
};

export default App;