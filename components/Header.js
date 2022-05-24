import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Platform} from 'react-native';
import Color from '../constants/Color';
import TitleText from '../components/TitleText';
    
    const Header = props => {
        return (
            <View style={{ ...styles.headerBase, ...Platform.select({ios: styles.headerIos, android: styles.headerAndroid}) }}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
            </View>
        );
    };
    const styles = StyleSheet.create({
        headerBase: {
            width : '100%',
            height : 90,
            paddingTop:36,
            justifyContent:'center',
            alignItems: 'center',
        },
        headerIos: {
            backgroundColor:  'white',
            borderBottomColor : '#ccc',
            borderBottomWidth :  1
        },
        headerAndroid : {
            backgroundColor:  Color.primary ,
            borderBottomColor : 'transparent',
            borderBottomWidth :  0
        },
        title : {
            color: Platform.OS === 'ios' ? Color.primary : 'white',
        }
    })
    export default Header;