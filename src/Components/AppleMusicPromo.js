import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Animated from "react-native-reanimated";
import { show_options_sheet } from '../Actions';

const {width, height} = Dimensions.get("window");

const AppleMusicPromo = ({translateX, promotion_ref, global_opacity, song={}, show_options_sheet}) => {
    
    const onPressOptions = () => {
        show_options_sheet(song);
    }

    return (
        <Animated.View ref={promotion_ref} style={{transform: [{translateX: translateX?translateX.current:0}], bottom: 0, width, marginBottom: 20, opacity: global_opacity || 1}}>
            <View style={{flexDirection: "row", alignSelf: "center", alignItems: "center", marginBottom: 20}}>
                <TouchableOpacity>
                    <View style={{flexDirection: "row", alignItems: "center", backgroundColor: "rgba(200,200,200,0.3)", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 40}}>
                        <View style={{backgroundColor: "rgba(255, 50, 50, 1)", width: 30, height: 30, borderRadius: 30, justifyContent: "center", alignItems: "center", marginRight: 10}}><MaterialCommunityIcons name="music" color="white" size={20} /></View>
                        <Text style={{color: "white", fontSize: 14, fontWeight: "bold"}}>PLAY FULL SONG</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={onPressOptions}>
                    <View style={{width: 46, height: 46, borderRadius: 46, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(200,200,200,0.3)", marginLeft: 10}}>
                        <IonIcons name="ellipsis-vertical" color="white" size={20} />
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={{color: "white", textAlign: "center", fontWeight: "700", fontSize: 14}}>Get up to 3 months free of Apple Music</Text>
        </Animated.View>
    );
}
 
export default connect(null, {show_options_sheet})(AppleMusicPromo);