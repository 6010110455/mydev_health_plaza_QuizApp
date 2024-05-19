import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type LeaderboardScreenProps = StackScreenProps<RootStackParamList, 'Leaderboard'>;

type LeaderboardRouteParams = {
  score?: number; // Make score optional
};

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ route, navigation }) => {
  useEffect(() => {
    if (route.params?.score === undefined) {
      Alert.alert("No Score", "You don't have a score yet. Please try again later.", [
        { text: "OK", onPress: () => navigation.navigate("Home") }
      ]);
    }
  }, [route.params?.score, navigation]);

  return (
    <View>
      <Text>Leaderboard</Text>
      {route.params?.score !== undefined ? (
        <Text>Your score: {route.params.score}</Text>
      ) : null}
    </View>
  );
};

export default LeaderboardScreen;
