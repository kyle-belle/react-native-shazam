import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Styles } from '../Styles';

const {container, scroll_container} = Styles;

const ChartList = ({chart={}}) => {
    const {name="Chart", entries=[]} = chart;

    return (
        <FlatList style={{backgroundColor: "white"}} horizontal scrollEnabled={false} data={entries} keyExtractor={(item, index) => index.toString()} renderItem={({item:entry, index}) => {
            return  (<View><Text>{name}</Text></View>);
        }} />
    );
};

export default ChartList;