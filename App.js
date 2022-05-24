import React, {useState} from 'react';
import { StyleSheet,  View, SafeAreaView  } from 'react-native';
import { useFonts } from 'expo-font';
import  AppLoading  from 'expo-app-loading';
import Header from './components/Header'
import StartGameScreen from './screen/StartGameScreen'
import GameScreen from './screen/GameScreen'
import GameOverScreen from './screen/GameOverScreen'


const App = () => {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  
  let [fontsLoaded] = useFonts({
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
  });
  if(!fontsLoaded) {
    return <AppLoading />;
  }

 

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default App;
