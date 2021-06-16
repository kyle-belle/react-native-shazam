import React, { Component } from 'react';
import {Animated} from "react-native"
import LinearGradient from "react-native-linear-gradient";
// import Animated from 'react-native-reanimated'; // Animated value props not being passed down when using reanimated

class GradientInterpolator extends Component {

    getColors(){
        // console.log(this.props);
        return Object.keys(this.props).filter((key) => (/(color[0-9]{1,})/i).test(key)).map(key => this.props[key]);
    }

    render(){
        const {children} = this.props;
        const colors = this.getColors();

        const new_props = {...this.props, children: undefined};
        return (
            <LinearGradient {...new_props} colors={colors}>
                {children}
            </LinearGradient>
        )
    }
}

const AnimateGradientInterpolator = Animated.createAnimatedComponent(GradientInterpolator);

class AnimatedLinearGradient extends Component {
    state = {interpolator: new Animated.Value(0)};
    constructor(props){
        super(props);
        this.state.prevColors = props.colors;
        this.state.colors = props.colors;
    }

    componentDidUpdate(){
        const {duration=1000, delay=0} = this.props;

        Animated.timing(this.state.interpolator, {
            toValue: 1,
            delay,
            duration,
            useNativeDriver: false
        }).start();
    }

    static getDerivedStateFromProps(props, prevState){
        const {colors} = props;
        const {colors: prevColors} = prevState;
        prevState.interpolator.setValue(0);

        return {/* interpolator: new Animated.Value(0), */ colors, prevColors}
    }

    getFlattenedProps(){
        const {prevColors=[], colors=[], interpolator} = this.state;
        const flat_props = {};

        if(prevColors.length === colors.length){
            colors.map((c, i) => {
                flat_props["color"+i] = interpolator.interpolate({
                    inputRange: [0, 1],
                    outputRange: [prevColors[i], c]
                });
            });
        }else{
            throw new Error("Length of colors array must not change");
        }

        return flat_props;
    }

    render() { 
        const {children} = this.props;
        const flat_props = this.getFlattenedProps();
        // console.log("flat_props", flat_props);
        const new_props = {...this.props, children: undefined};
        return (
            <AnimateGradientInterpolator {...new_props} {...flat_props}>
                {children}
            </AnimateGradientInterpolator>
        );
    }
}
 
export default AnimatedLinearGradient;