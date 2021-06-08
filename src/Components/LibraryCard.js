import React, { Fragment } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Styles } from '../Styles';

const {library_card} = Styles;

const LibraryCard = ({children=[]}) => {
    
    return (
        <View style={library_card}>
            <TouchableHighlight underlayColor={"rgba(230,230,230,1)"} activeOpacity={0.5} style={{flex: 1}} onPress={() => {console.log("Pressed Library Card")}}>
                {children??<Fragment />}
            </TouchableHighlight>
        </View>
    );
}

export default LibraryCard;