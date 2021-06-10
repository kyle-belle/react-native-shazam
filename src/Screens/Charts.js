import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BasicHeader from '../Components/BasicHeader';
import {Styles} from "../Styles";
import CHARTS from "../Dev-Data/charts";
import ChartList from '../Components/ChartList';

const {width, height} = Dimensions.get("window");

const {container, scroll_container, charts_image_background, chart_button_container, chart_button, chart_button_text} = Styles;

const Charts = ({navigation}) => {
    return (
        <SafeAreaView edges={["top"]} style={container}>
            <BasicHeader title="Charts" />
            <ScrollView style={container} contentContainerStyle={scroll_container}>
                <Image source={require("../Assets/Images/purple-world-map.png")} style={charts_image_background} />

                <View style={chart_button_container}>
                    <TouchableOpacity style={chart_button}>
                        <Text style={chart_button_text}>COUNTRY & CITY CHARTS</Text>
                    </TouchableOpacity>
                    
                    <Text style={{color: chart_button_container.color, fontSize: chart_button_container.fontSize, fontWeight: chart_button_container.fontWeight}}>FROM AROUND THE WORLD</Text>
                </View>

                {CHARTS.map((chart, i) => {
                    return <ChartList navigation={navigation} chart={chart} key={i.toString()} />
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

export default Charts;