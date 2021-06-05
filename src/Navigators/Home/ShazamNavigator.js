import React, { Fragment } from 'react';
import { View } from 'react-native';
import {createSharedElementStackNavigator} from "react-navigation-shared-element";

import Home from '../../Screens/Home';
import Listening from '../../Screens/Listening';

const Stack = createSharedElementStackNavigator();

export default () => {

    return (
        <Stack.Navigator initialRouteName="Main" headerMode="none">
            <Stack.Screen name="Main" component={Home} />
            <Stack.Screen name="Listening" component={Listening} />
        </Stack.Navigator>
    );
}