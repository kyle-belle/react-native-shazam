/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createStore} from "redux";
import {Provider} from "react-redux";
import { store } from "./src/Reducers";
import { enableScreens } from 'react-native-screens';
import {StatusBar, useColorScheme, PixelRatio, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import HomeNav from "./src/Navigators/HomeNavigator";
import SongDetailsNavigator from './src/Navigators/SongDetailsNavigator';

console.log("Pixel Ratio", PixelRatio.get());

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={HomeNav} />
            <Stack.Screen name="SongDetails" component={SongDetailsNavigator} />
          </Stack.Navigator>
          <StatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0.1)" />
      </NavigationContainer>
    </Provider>
  );
};

export default App;