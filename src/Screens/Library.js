import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BasicHeader from '../Components/BasicHeader';
import {Styles} from "../Styles";

const {width, height} = Dimensions.get("window");

const {container} = Styles;

const Library = ({navigation}) => {

    return (
        <SafeAreaView edges={["top"]} style={container}>
            <BasicHeader title="Library" />
            <ScrollView>
                <View><Text>Shazams</Text></View>
                <View><Text>Artists</Text></View>
                <View><Text>Playlists For You</Text></View>

                <Text>Recent Shazams</Text>

                {[].map((_, i) => {
                    return <View />;
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

export default Library;