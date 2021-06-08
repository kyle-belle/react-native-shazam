import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Styles } from '../Styles';
import ChartEntry from './ChartEntry';

const {chart_list_container, chart_entry} = Styles;

const ChartList = ({chart={}}) => {
    const {name="Chart", entries=[]} = chart;

    return (
        <View style={chart_list_container}>
            <TouchableOpacity>
                <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 3, paddingVertical: 8}}>
                    <Text style={{color: chart_entry.color, fontSize: 16}}>{name}</Text>
                    <Text style={{color:"rgba(50, 150, 255, 1)", fontWeight: "bold"}}>SEE ALL</Text>
                </View>
            </TouchableOpacity>

            <FlatList horizontal showsHorizontalScrollIndicator={false} scrollEnabled={false} data={entries} keyExtractor={(item, index) => index.toString()} renderItem={({item:entry={}, index}) => {
                return  <ChartEntry entry={entry} index={index} />;
            }} />
        </View>
    );
};

export default ChartList;