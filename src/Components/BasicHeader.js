import React from 'react';
import { View, Text } from 'react-native';
import {Styles} from "../Styles";

const {basic_header_container, basic_header_text} = Styles;

const BasicHeader = ({title="Title"}) => {
    
    return (
        <View style={basic_header_container}>
            <Text style={basic_header_text}>{title}</Text>
        </View>
    );
}

export default BasicHeader;