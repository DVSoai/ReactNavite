import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import DefaultStyles from '../constants/Default-styles'
import Color from '../constants/Color';

const MainButton = props => {
  return ( 
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
        <View style = {styles.button}>
            <Text style = {styles.buttonText}>{props.children}</Text>
        </View>
    </TouchableOpacity>
  )
};
const styles = StyleSheet.create({
    button: {
        backgroundColor : Color.primary,
        paddingHorizontal : 30,
        paddingVertical :12,
        borderRadius : 25,
    },
    buttonText: {
        color : 'white',
        fontFamily : 'open-sans',
        fontSize : 18,
    },
});
export default MainButton;