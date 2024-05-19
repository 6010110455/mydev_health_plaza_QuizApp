import React from 'react'
import { View, Text, Button } from 'react-native'

const HomeScreen = ({ navigation }) => {
  const startQuiz = () => {
    navigation.navigate('Quiz')
  }

  const showLeaderboard = () => {
    navigation.navigate('Leaderboard')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ marginBottom: 10 }}>
        <Text>Welcome to the Quiz App</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Button title="Start Quiz" onPress={startQuiz} />
      </View>
      <Button title="Leaderboard" onPress={showLeaderboard} />
    </View>
  )
}

export default HomeScreen
