import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText'
import Color from '../constants/Color';
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
  return (
    <ScrollView>
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style = {styles.imageContainer}>
        <Image source= {require('../assets/anh.jpg')} style = {styles.image}/>
      </View>
      <View style = {styles.resultContainer}>
        <BodyText style = {styles.resultText}>
          Number of rounds:<Text style = {styles.highlight}> {props.roundsNumber}</Text>
        </BodyText>
        <BodyText style = {styles.resultText}>
          Number was: <Text style = {styles.highlight}> {props.userNumber}</Text>
        </BodyText>
      </View>
      <MainButton  onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical : 10,
  },
  imageContainer: {
    width:Dimensions.get('window').width * 0.7,
    height:Dimensions.get('window').width * 0.7,
    borderRadius : Dimensions.get('window').width * 0.7 / 2,
    borderWidth : 3,
    borderColor : 'red',
    overflow : 'hidden',
    marginVertical : Dimensions.get('window').height  / 60,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    marginHorizontal : 30,
    marginVertical : Dimensions.get('window').height  / 60,

  },
  resultText: {
    textAlign: 'center',
    fontSize : Dimensions.get('window').height > 400 ? 18 : 14 ,
  },
  highlight: {
    color : Color.primary,
    fontFamily : 'open-sans-bold',
  },
});

export default GameOverScreen;
