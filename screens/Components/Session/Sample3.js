import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';

const generateCards = () => {
  const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cards = [...values, ...values];
  return cards.sort(() => Math.random() - 0.5);
};

const Sample3 = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [expectedSequence, setExpectedSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    const spokenWords = e.value[0].split(' ').map(word => word.toUpperCase());
    setUserSequence(spokenWords);
    checkSequence(spokenWords);
  };

  const checkSequence = (spokenWords) => {
    if (JSON.stringify(spokenWords) === JSON.stringify(expectedSequence)) {
      Alert.alert('Correct Order!', 'You pronounced the cards in the correct order!');
      resetGame();
    } else {
      Alert.alert('Try Again', 'The pronunciation order is incorrect.');
    }
  };

  const handleCardPress = (index) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index)) return;

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        const matchedPair = cards[firstIndex];
        setMatchedPairs([...matchedPairs, matchedPair]);
        setExpectedSequence([...expectedSequence, matchedPair]);
        setFlippedIndices([]);
        if (matchedPairs.length + 1 === cards.length / 2) {
          Alert.alert('Congratulations!', 'You have matched all pairs!');
        }
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const startListening = () => {
    Voice.start('en-US');
  };

  const resetGame = () => {
    setCards(generateCards());
    setFlippedIndices([]);
    setMatchedPairs([]);
    setExpectedSequence([]);
    setUserSequence([]);
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:'110%',padding:'2px'}}>Click the Cards (Under Development)</Text>
      <View style={styles.board}>
        {cards.map((content, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              flippedIndices.includes(index) || matchedPairs.includes(content)
                ? styles.flipped
                : styles.hidden,
            ]}
            onPress={() => handleCardPress(index)}
          >
            {(flippedIndices.includes(index) || matchedPairs.includes(content)) && (
              <Text style={styles.content}>{content}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={startListening}>
        <Text style={styles.buttonText}>Start Pronunciation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dce2f0',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    justifyContent: 'center',
  },
  card: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    margin: 5,
  },
  hidden: {
    backgroundColor: '#fff',
  },
  flipped: {
    backgroundColor: '#f9c74f',
  },
  content: {
    fontSize: 24,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Sample3;