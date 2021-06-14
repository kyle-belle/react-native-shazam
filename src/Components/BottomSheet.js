import React, { useRef, useEffect, useState } from 'react';
import { Modal, View, Animated, PanResponder, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { show_options_sheet } from '../Actions';
import { Styles } from '../Styles';

const {width, height} = Dimensions.get("window");

const {container, bottom_sheet_overlay} = Styles;

const BottomSheet = ({children=[], show, show_options_sheet}) => {
    const content_container_ref = useRef(null);
    const translateY = useRef(new Animated.Value(height)).current;
    const dy = useRef(null);
    const dx = useRef(null);
    const [contentSize, setContentSize] = useState({x:0,y:0,width:0,height:0});

    const reset_position = () => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    const hide_sheet = () => {
        // console.log("height", contentSize.height);
        Animated.timing(translateY, {
            toValue: height,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            show_options_sheet(null);
        });
    }

    const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => false,
          onPanResponderMove: Animated.event([null, { dy: translateY }], {useNativeDriver: false}),
          onPanResponderRelease: (e, gs) => {
              const {dy, vy} = gs;
            //   console.log("release!!!", dy, vy);

            if(dy > 0 && vy > 1){
                hide_sheet();
                return
            }

            reset_position();
        }
        })
      ).current;

    const onClose = () => {
        hide_sheet();
    };

    useEffect(() => {
        content_container_ref.current?.measure((x,y,width,height) => {
            setContentSize({x,y,width,height});
        });

        translateY.setValue(height);

        Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    }, [show])

    const clamped_translateY = translateY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp"
    })

    return (
        <Modal animationType="fade" visible={!!show} transparent onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={hide_sheet}>
                <View style={[container, bottom_sheet_overlay]}>
                        <Animated.View {...panResponder.panHandlers} ref={content_container_ref} style={{maxHeight: height, transform: [{translateY: clamped_translateY}]}}>
                            {children}
                        </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

function map_state_to_props({app}){
    return {show: app.options_song}
}
 
export default connect(map_state_to_props, {show_options_sheet})(BottomSheet);