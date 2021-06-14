import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcons from "react-native-vector-icons/Entypo";
import IonIcons from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

const SongOptions = ({song={}}) => {
    const {name:song_name, artwork, artist={}} = song;
    const {name:artist_name="Artist Name"} = artist;
    return (
        <View style={{backgroundColor: "white"}}>
            <View style={{backgroundColor: "black", flexDirection: "row", paddingHorizontal: 15, paddingVertical: 15, alignItems: "center"}}>
                <View style={{width: 50, height: 50, borderRadius: 5, overflow: "hidden", marginRight: 20}}>
                    <Image source={{uri: artwork}} style={{width: 50, height: 50}} />
                </View>

                <View>
                    <Text style={{color: "white", fontSize: 16, fontWeight: "bold"}}>{song_name}</Text>
                    <Text style={{color: "rgba(200,200,200,1)", fontSize: 14}}>{artist_name}</Text>
                </View>
            </View>
            
            <View style={{paddingHorizontal: 15}}>
                <View style={{paddingVertical: 12, flexDirection: "row", alignItems: "center"}}>
                    <View style={{backgroundColor: "rgba(255, 50, 50, 1)", width: 25, height: 25, borderRadius: 5, justifyContent: "center", alignItems: "center", marginRight: 30}}><MaterialCommunityIcons name="music" color="white" size={15} /></View>
                                
                    <Text style={{fontSize: 15}}>Open in Apple Music</Text>
                </View>
                
                <View style={{paddingVertical: 12, flexDirection: "row", alignItems: "center"}}>
                    <View style={{width: 25, height: 25, borderRadius: 5, justifyContent: "center", alignItems: "center", marginRight: 30}}><MaterialCommunityIcons name="trash-can" color="rgba(150,150,150,1)" size={25} /></View>
                                
                    <Text style={{fontSize: 15}}>Remove From Your Library</Text>
                </View>
                
                <View style={{paddingVertical: 12, flexDirection: "row", alignItems: "center"}}>
                    <View style={{width: 25, height: 25, borderRadius: 5, justifyContent: "center", alignItems: "center", marginRight: 30}}><MaterialCommunityIcons name="share-variant" color="rgba(150,150,150,1)" size={25} /></View>
                                
                    <Text style={{fontSize: 15}}>Share</Text>
                </View>
                
                <View style={{paddingVertical: 12, flexDirection: "row", alignItems: "center"}}>
                    <View style={{width: 25, height: 25, borderRadius: 5, justifyContent: "center", alignItems: "center", marginRight: 30}}><EntypoIcons name="info-with-circle" color="rgba(150,150,150,1)" size={25} /></View>
                                
                    <Text style={{fontSize: 15}}>View Artist</Text>
                </View>
                
                <View style={{paddingVertical: 12, flexDirection: "row", alignItems: "center"}}>
                    <View style={{width: 25, height: 25, borderRadius: 5, justifyContent: "center", alignItems: "center", marginRight: 30}}><IonIcons name="flag" color="rgba(150,150,150,1)" size={25} /></View>
                                
                    <Text style={{fontSize: 15}}>Wrong song? Tell Shazam</Text>
                </View>
            </View>
        </View>
    );
}

function map_state_to_props({app}){
    return {song: app.options_song}
}
 
export default connect(map_state_to_props)(SongOptions);