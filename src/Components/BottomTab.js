import React from 'react';
import { Modal, View, Animated, PanResponder } from 'react-native';
import { Styles } from '../Styles';

const {container, overlay} = Styles;

const BottomTab = ({children=[], visible}) => {
    const onClose = () => {

    };

    return (
        <Modal animationType="fade" visible={visible} transparent onRequestClose={onClose}>
            <View style={[container, overlay]}>
                <Animated.View>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
}
 
export default BottomTab;