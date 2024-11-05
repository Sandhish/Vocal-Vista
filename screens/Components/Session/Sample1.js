import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SpeechRecognition, SpeechSynthesis } from 'react-speech-recognition';
import Fuse from 'fuse.js'; 

const Sample1 = () => {
  const level1Words = ['Ball', 'Cat', 'Dog', 'Bird', 'Apple', 'Banana'];
  const targetSound = 'B';
  const pronunciationWords = ['Apple', 'Banana', 'Cherry', 'Grape', 'Orange'];
  const level3Options = ['Bear', 'Chair', 'Star', 'Car'];
  const correctWord = 'Bear';

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(0);

  const fuse = new Fuse(pronunciationWords, {
    includeScore: true,
    threshold: 0.4, 
  });

  const startLevel1 = () => {
    setLevel(1);
    setFeedback('');
  };

  const startLevel2 = () => {
    setLevel(2);
    setFeedback('');
  };

  const startLevel3 = () => {
    setLevel(3);
    setFeedback('');
  };

  const checkLevel1Answers = (selectedWords) => {
    const correctWords = selectedWords.filter((word) => word.startsWith(targetSound));
    if (selectedWords.length === 0) {
      setFeedback('Please select at least one word.');
    } else if (correctWords.length === selectedWords.length) {
      setFeedback('Great job! You selected all the correct words!');
    } else {
      setFeedback('Some selections are incorrect. Try again!');
    }
  };

  const startSpeechRecognition = async () => {
    try {
      const result = await SpeechRecognition.start();
      checkPronunciation(result.toLowerCase());
    } catch (error) {
      setFeedback('Error recognizing speech. Please try again.');
    }
  };

  const checkPronunciation = (userSpeech) => {
    const currentWord = pronunciationWords[currentWordIndex].toLowerCase();
    const results = fuse.search(userSpeech);
    const bestMatch = results[0]?.item;
    const bestMatchScore = results[0]?.score;

    if (bestMatch && userSpeech.includes(bestMatch.toLowerCase())) {
      const maxScore = 100;
      const matchScore = Math.max(0, (1 - (bestMatchScore || 1)) * maxScore);
      setScore(score + Math.round(matchScore));  
      setFeedback(`Correct pronunciation! You scored ${Math.round(matchScore)} points.`);
    } else {
      setFeedback(`Incorrect pronunciation. You said "${userSpeech}", try again.`);
    }
    setCurrentWordIndex((currentWordIndex + 1) % pronunciationWords.length);
  };

  const speak = (text) => {
    SpeechSynthesis.speak(text);
  };

  const checkLevel3Answer = (selectedWord) => {
    if (selectedWord === correctWord) {
      setFeedback('Correct! You selected the right word!');
    } else {
      setFeedback('Incorrect. Listen again and try a different word.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speech Therapy Adventure</Text>
      {level === 0 && (
        <View style={styles.levelContainer}>
          <TouchableOpacity style={styles.levelButton} onPress={startLevel1}>
            <Text style={styles.levelButtonText}>Level 1: Word Matching</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.levelButton} onPress={startLevel2}>
            <Text style={styles.levelButtonText}>Level 2: Pronunciation Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.levelButton} onPress={startLevel3}>
            <Text style={styles.levelButtonText}>Level 3: Listening Practice</Text>
          </TouchableOpacity>
        </View>
      )}

      {level === 1 && (
        <View>
          <Text style={styles.feedback}>{feedback}</Text>
          <View style={styles.wordsContainer}>
            {level1Words.map((word, index) => (
              <TouchableOpacity
                key={index}
                style={styles.word}
                onPress={() => checkLevel1Answers([word])}>
                <Text>{word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {level === 2 && (
        <View>
          <Text style={styles.displayWord}>
            Pronounce: {pronunciationWords[currentWordIndex]}
          </Text>
          <Text style={styles.feedback}>{feedback}</Text>
          <Text style={styles.score}>Score: {score}</Text>
          <TouchableOpacity style={styles.levelButton} onPress={startSpeechRecognition}>
            <Text style={styles.levelButtonText}>Start Pronouncing</Text>
          </TouchableOpacity>
        </View>
      )}

      {level === 3 && (
        <View>
          <Text style={styles.feedback}>{feedback}</Text>
          <TouchableOpacity style={styles.levelButton} onPress={() => speak(correctWord)}>
            <Text style={styles.levelButtonText}>Play Sound</Text>
          </TouchableOpacity>
          <View style={styles.wordsContainer}>
            {level3Options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.word}
                onPress={() => checkLevel3Answer(option)}>
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f7ff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: '#004080',
    marginBottom: 30,
  },
  levelContainer: {
    marginBottom: 20,
  },
  levelButton: {
    padding: 12,
    backgroundColor: '#0080ff',
    borderRadius: 10,
    margin: 10,
  },
  levelButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  feedback: {
    fontSize: 18,
    color: '#004080',
    marginTop: 20,
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  word: {
    backgroundColor: '#99ccff',
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  displayWord: {
    fontSize: 24,
    color: '#004080',
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    color: '#004080',
    marginTop: 10,
  },
});

export default Sample1;