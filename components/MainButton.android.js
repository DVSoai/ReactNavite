import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import DefaultStyles from '../constants/Default-styles'
import Color from '../constants/Color';

const MainButton = props => {
    let ButtonComponent = TouchableOpacity;
    if(Platform.Version >=21) {
        ButtonComponent = TouchableNativeFeedback;
    }
  return ( 
      <View style={styles.buttonContainer}>
    <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
        <View style = {styles.button}>
            <Text style = {styles.buttonText}>{props.children}</Text>
        </View>
    </ButtonComponent>
    </View>
  )
};
const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius : 25,
        overflow : 'hidden'
    },
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