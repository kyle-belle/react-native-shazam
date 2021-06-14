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
import {StatusBar, useColorScheme, PixelRatio, Dimensions, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator, CardStyleInterpolators} from "@react-navigation/stack";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import HomeNav from "./src/Navigators/HomeNavigator";
import SongDetailsNavigator from './src/Navigators/SongDetailsNavigator';
import BottomSheet from './src/Components/BottomSheet';
import SongOptions from './src/Components/SongOptions';

console.log("Pixel Ratio", PixelRatio.get());

const {width, height} = Dimensions.get("window");

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={HomeNav} />
            <Stack.Screen name="SongDetails" component={SongDetailsNavigator} />
          </Stack.Navigator>
          <StatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0.2)" />
          <BottomSheet>
            <SongOptions />
          </BottomSheet>
      </NavigationContainer>
    </Provider>
  );
};

// function map_state_to_props({app}){
//   return {show: app.show_options_sheet}
// }

export default App;