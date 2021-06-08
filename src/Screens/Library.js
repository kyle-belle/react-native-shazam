import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity, FlatList, TouchableHighlight, Alert } from 'react-native';
import FontistoIcon from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcons from "react-native-vector-icons/Ionicons";
import AntIcons from "react-native-vector-icons/AntDesign";
import { SafeAreaView } from 'react-native-safe-area-context';
import BasicHeader from '../Components/BasicHeader';
import {Styles} from "../Styles";
import LibraryCard from '../Components/LibraryCard';
import { connect } from 'react-redux';
import LibraryShazam from '../Components/LibraryShazam';

const {width, height} = Dimensions.get("window");

const {container, library_label, library_card, library_card_save_text, library_card_login_text, hr_thin} = Styles;

const Library = ({navigation, logged_in=false}) => {

    return (
        <SafeAreaView edges={["top"]} style={[container, {backgroundColor: "white"}]}>
            <BasicHeader title="Library" />
            <ScrollView>
                <View style={library_label}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <FontistoIcon size={22} color="rgba(220,220,220,1)" name="shazam" />
                        <Text style={{color: library_label.color, fontSize: library_label.fontSize, fontWeight: library_label.fontWeight, marginLeft: 20}}>Shazams</Text>
                    </View>
                    <View style={hr_thin} />
                </View>

                
                <View style={library_label}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <MaterialCommunityIcons size={22} color="rgba(220,220,220,1)" name="account" />
                        <Text style={{color: library_label.color, fontSize: library_label.fontSize, fontWeight: library_label.fontWeight, marginLeft: 20}}>Artists</Text>
                    </View>
                    <View style={hr_thin} />
                </View>

                <View style={library_label}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <MaterialCommunityIcons size={22} color="rgba(220,220,220,1)" name="music" />
                        <Text style={{color: library_label.color, fontSize: library_label.fontSize, fontWeight: library_label.fontWeight, marginLeft: 20}}>Playlists For You</Text>
                    </View>
                    {/* <View style={hr_thin} /> */}
                </View>

                <Text style={{fontSize: 20, fontWeight: "bold", paddingHorizontal: 15, marginTop: 20}}>Recent Shazams</Text>

                <View style={{flexDirection: "row", flexWrap: "wrap", marginBottom: 20}}>
                    {[1,2,3,4,5,6,7,8].map((_, i) => {
                        return (
                            <LibraryCard key={i.toString()}>
                                {(i===0 && !logged_in)?(
                                    <View style={[container, {justifyContent: "center", alignItems: "center"}]}>
                                        <IonIcons name="ios-cloud-done" size={library_card.width * 0.3} color="rgba(0, 150, 255,1)" />
                                        <Text style={library_card_save_text}>Save your Shazams</Text>

                                        <View style={{position: "absolute", bottom: 8, width: "100%"}}>
                                            <Text style={library_card_login_text}>LOG IN</Text>
                                        </View>

                                        <View style={{position: "absolute", left: 15, top: 15}}>
                                            <TouchableOpacity onPress={() => {Alert.alert("", "Hello. This is a clone shazam app and as such login functionality is not supported. Shazams will not be saved to you account. you cannot access them on different phones or the website", [{text: "GOT IT!", style: "cancel"}], {cancelable: true})}}><AntIcons name="exclamationcircle" color="rgba(0,0,0,0.18)" size={22} /></TouchableOpacity>
                                        </View>

                                        <View style={{position: "absolute", right: 15, top: 15}}>
                                            <TouchableOpacity><AntIcons name="close" color="rgba(0,0,0,0.5)" size={22} /></TouchableOpacity>
                                        </View>
                                    </View>
                                ):(<LibraryShazam shazam={{}} index={i} />)}
                            </LibraryCard>
                        );
                    })}
                </View>

                <View style={{width: "100%", marginBottom: 15}}>
                    <TouchableOpacity>
                        <Text style={[library_card_login_text, {width: "70%", paddingVertical: 15}]}>SEE ALL</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function map_state_to_props({user}){
    return {logged_in: user.logged_in};
}

export default connect(map_state_to_props)(Library);