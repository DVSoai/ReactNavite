import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import * as ScreenOrientation from 'expo-screen-orientation';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/Default-styles';
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText';
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
const renderListItem = (ListLength, itemData) => {
  return <View  style={ styles.listItem}>
    <BodyText>#{ListLength - itemData.index }</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
};

const GameScreen = props => {

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }
  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width 
  );
  const[availableDeviceHeight, setAvailableDeviceHeight]  = useState(
    Dimensions.get('window').height
  );


  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess  ;
    } else {
      currentLow.current = currentGuess + 1 ;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPastGuesses(pastGuesses => [nextNumber.toString(),...pastGuesses])
  };
  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').width );
      setAvailableDeviceHeight(Dimensions.get('window').height );
    }
    Dimensions.addEventListener('change', updateLayout);
    return (
      () => {
        Dimensions.addEventListener('change', updateLayout);
      }
    )
  })
  
  let listContainerStyle = styles.listContainer 
  if(availableDeviceWidth < 350 ) {
    listContainerStyle = styles.listContainerBig;
  }
  if(availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
         <Text style={DefaultStyles.title}>Opponent's Guess</Text>
         <View style={styles.controls}>
          <MainButton  onPress={nextGuessHandler.bind(this, 'lower')} >
           <Ionicons name="md-remove" size={24} color="black" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton   onPress={nextGuessHandler.bind(this, 'greater')} >
          <Ionicons name="md-add" size={24} color="black" />
           </MainButton>
           </View>
        <View style = {listContainerStyle}>
          {/* <ScrollView contentContainerStyle= {styles.list}>
            {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
          </ScrollView> */}
  
          <FlatList
             data={pastGuesses}
             keyExtractor = {item => item}
             renderItem={renderListItem.bind(this, pastGuesses.length)}
             contentContainerStyle= {styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton  onPress={nextGuessHandler.bind(this, 'lower')} >
         <Ionicons name="md-remove" size={24} color="black" />
        </MainButton>
        <MainButton   onPress={nextGuessHandler.bind(this, 'greater')} >
        <Ionicons name="md-add" size={24} color="black" />
         </MainButton>
      </Card>
      <View style = {listContainerStyle}>
        {/* <ScrollView contentContainerStyle= {styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}

        <FlatList
           data={pastGuesses}
           keyExtractor = {item => item}
           renderItem={renderListItem.bind(this, pastGuesses.length)}
           contentContainerStyle= {styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20:5,
    width: 400,
    maxWidth: '90%'
  },
  controls: {
    flexDirection : 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  listContainer: {
    flex: 1,
    width:'60%'
  },
  listContainerBig: {
    flex: 1,
    width : '80%'
  },
  list: {
    flexGrow : 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor : '#ccc',
    padding : 15,
    borderWidth : 1,
    marginVertical : 15,
    backgroundColor : 'white',
    flexDirection : 'row',
    justifyContent : 'space-between',
    width:'60%',

  }
});

export default GameScreen;
