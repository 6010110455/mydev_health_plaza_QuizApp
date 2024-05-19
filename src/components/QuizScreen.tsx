import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, Alert } from 'react-native';
import questions from '../data/questions.json';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Question = {
  question: string;
  answers: string[];
  correctAnswer: string;
};

type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;

type Props = {
  navigation: QuizScreenNavigationProp;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const QuizScreen: React.FC<Props> = ({ navigation }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [answersState, setAnswersState] = useState<boolean[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const shuffled: Question[] = shuffleArray(questions).map((question: Question) => ({
      ...question,
      answers: shuffleArray(question.answers)
    }));
    setShuffledQuestions(shuffled.slice(0, 20));
    setAnswersState(new Array(20).fill(undefined));
  }, []);

  const handleAnswerPress = (questionIndex: number, answer: string) => {
    const isCorrect = shuffledQuestions[questionIndex].correctAnswer === answer;
    const newAnswersState = [...answersState];
    newAnswersState[questionIndex] = isCorrect;
    setAnswersState(newAnswersState);
    Alert.alert(isCorrect ? "Correct!" : "Wrong!");
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const allAnswered = answersState.every(answer => answer !== undefined);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {shuffledQuestions.map((question, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`${index + 1}. ${question.question}`}</Text>
            {question.answers.map((answer, i) => (
              <Button
                key={i}
                title={answer}
                onPress={() => handleAnswerPress(index, answer)}
                disabled={answersState[index] !== undefined} // Disable button if answered
                color={
                  answersState[index] !== undefined ? 
                  (answersState[index] ? "green" : "red") : undefined // Set color based on answersState
                }
              />
            ))}
            <Text>
              {answersState[index] !== undefined ? 
                (answersState[index] ? "Correct Answer" : "Incorrect Answer") : ""}
            </Text>
          </View>
        ))}
      </ScrollView>
      {allAnswered && (
        <View style={{ padding: 20 }}>
          <Button
            title="Go to Leaderboard"
            onPress={() => navigation.navigate('Leaderboard', { score })}
          />
        </View>
      )}
    </View>
  );
};

export default QuizScreen;
