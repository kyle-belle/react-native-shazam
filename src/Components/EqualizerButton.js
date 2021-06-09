import React, {useEffect} from 'react';
import { Animated, View, TouchableHighlight } from 'react-native';
import { Styles } from '../Styles';

const {equalizer_overlay, equalizer_line} = Styles;

const equalizer_lines = new Array(4).fill(null);

const equalizer_heights = equalizer_lines.map(() => new Animated.Value(equalizer_line.height * 0.3));

const equalizer_scale = new Animated.Value(0);

const equalizer_animations = Animated.loop(Animated.parallel(equalizer_heights.map((height, i) => {
  const delay = 50 * ((i%2)*2);
  const duration = 200;
  return Animated.sequence([Animated.timing(height, {toValue: equalizer_line.height, duration, delay, useNativeDriver: false}), Animated.timing(height, {toValue: equalizer_line.height * 0.3, duration, delay: 0, useNativeDriver: false})]);
})));

const equalizer_show_animation = Animated.timing(equalizer_scale, {toValue: 1, duration: 200, useNativeDriver: true});

const equalizer_hide_animation = Animated.timing(equalizer_scale, {toValue: 0, duration: 200, useNativeDriver: true});

const EqualizerButton = ({playing=false, onPress}) => {
    
    const show_equalizer = () => {
        equalizer_show_animation.start();
    }

    const hide_equalizer = () => {
        equalizer_hide_animation.start();
    }

    const onPressEqualizer = () => {
        console.log("Equalizer Pressed");
        if(typeof(onPress) === "function"){
            onPress();
        }
    }

    useEffect(() => {
        if(playing){
            show_equalizer();
            equalizer_animations.start();
        }else{
            hide_equalizer();
            equalizer_animations.stop();
            equalizer_animations.reset();
        }
    }, [playing]);
    
    return (
        <Animated.View style={[equalizer_overlay, {transform: [{scale: equalizer_scale}]}]}>
            <TouchableHighlight onPress={onPressEqualizer}>
                <View style={{width: equalizer_overlay.width, height: equalizer_overlay.height, backgroundColor: "white", flexDirection: "row", justifyContent: "center"}}>
                    {equalizer_lines.map((_, i) => {
                    const height = equalizer_heights[i];

                    return <Animated.View key={i.toString()} style={[equalizer_line, {height: height}]} />
                    })}
                </View>
            </TouchableHighlight>
        </Animated.View>
    );
}
 
export default EqualizerButton;