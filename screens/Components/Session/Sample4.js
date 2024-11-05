import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Voice from '@react-native-voice/voice';

const items = [
  { name: 'apple', url: 'https://th.bing.com/th/id/OIP.kzo22vGPqcf7d5w_QJhrfQHaFj?rs=1&pid=ImgDetMain', type: 'image' },
  { name: 'cat', url: 'https://th.bing.com/th/id/OIP.7ng8jCJZOZ8YC5Pfq4y1fgHaE8?rs=1&pid=ImgDetMain', type: 'image' },
  { name: 'cycle', url: 'https://th.bing.com/th/id/OIP.EElXjLiglIrIW9bEsBVgLAAAAA?rs=1&pid=ImgDetMain', type: 'image' },
  { name: 'laptop', url: 'https://th.bing.com/th/id/R.0e7a3fffa6f41b8b2cb95c25b0fa791a?rik=oCirMXvWuh5UDA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-OipYuuNx7bc%2fUYznOsel-mI%2fAAAAAAAAA48%2fvoQrFOp9vNI%2fs1600%2flaptop.jpg&ehk=n8GXTV9JaytbWC9ckuoOP0DmWQu5pp7nylPuH9xdb3k%3d&risl=&pid=ImgRaw&r=0', type: 'image' },
  { name: 'dog', url: 'https://th.bing.com/th/id/R.4598adf9ff249a30efdbb31650e82e27?rik=nTcIrjiGjpGIFQ&riu=http%3a%2f%2finspirationseek.com%2fwp-content%2fuploads%2f2016%2f02%2fCute-Dog-Images.jpg&ehk=%2fDDngdNA%2bebjrLjv8nS0U7xOTwznhNHrZOMRAXMC57Y%3d&risl=&pid=ImgRaw&r=0', type: 'image' },
  { name: 'The sun rises in the east', type: 'text' },
  { name: 'The sky is blue and clear', type: 'text' },
  { name: 'The wind is blowing gently', type: 'text' },
  { name: 'The book is on the table', type: 'text' },
  { name: 'The children are playing outside', type: 'text' }
];

const calculateSimilarity = (str1, str2) => {
  const length = Math.max(str1.length, str2.length);
  let matches = 0;

  for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
    if (str1[i] === str2[i]) {
      matches++;
    }
  }

  return (matches / length) * 100;
};

const Sample4 = () => {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    pickRandomItem();

    if (Platform.OS !== 'web') {
      Voice.onSpeechResults = (event) => {
        const spokenWord = event.value[0].toLowerCase();
        setSpokenText(spokenWord);
        checkGuess(spokenWord);
      };

      Voice.onSpeechError = (error) => {
        console.error('Speech recognition error: ', error);
        setIsListening(false);
      };

      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      };
    }
  }, []);

  const pickRandomItem = () => {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    setCurrentItem(randomItem);
    setResultMessage('');
    setSpokenText('');
  };

  const startListening = async () => {
    if (Platform.OS === 'web') {
      if (!('webkitSpeechRecognition' in window)) {
        console.log('Web Speech API is not supported in this browser.');
        return;
      }

      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        if (event.results && event.results.length > 0) {
          const spokenWord = event.results[0][0].transcript.toLowerCase();
          setSpokenText(spokenWord);
          checkGuess(spokenWord);
        } else {
          console.log('No results from speech recognition.');
        }
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      setIsListening(true);
    } else {
      try {
        setIsListening(true);
        setResultMessage('');
        setSpokenText('');
        await Voice.start('en-US');
      } catch (error) {
        console.error('Error starting voice recognition: ', error);
        setIsListening(false);
      }
    }
  };

  const checkGuess = (spokenWord) => {
    const cleanedSpokenWord = spokenWord.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
    const cleanedWordToGuess = currentItem.name.trim().toLowerCase();

    const similarity = calculateSimilarity(cleanedSpokenWord, cleanedWordToGuess);
    if (similarity >= 50) {
      setResultMessage('Great job! You got it right!');
    } else {
      setResultMessage('Try again!');
    }
    setIsListening(false);
  };

  const getHeading = () => {
    if (currentItem) {
      return currentItem.type === 'image' ? 'Guess the Name!' : 'Complete the Task';
    }
    return '';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{getHeading()}</Text>
      {currentItem && currentItem.type === 'image' && (
        <Image source={{ uri: currentItem.url }} style={styles.image} />
      )}
      {currentItem && currentItem.type === 'text' && (
        <Text style={styles.wordToGuess}>{currentItem.name}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={startListening} disabled={isListening}>
        <Text style={styles.buttonText}>{isListening ? 'Listening...' : 'Start Speaking'}</Text>
      </TouchableOpacity>
      {spokenText ? <Text style={styles.spokenText}>You said: {spokenText}</Text> : null}
      {resultMessage ? <Text style={styles.resultMessage}>{resultMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={pickRandomItem}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 200,
    marginBottom: 20,
  },
  wordToGuess: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  spokenText: {
    marginTop: 10,
    fontSize: 18,
    color: 'blue',
  },
  resultMessage: {
    marginTop: 10,
    fontSize: 20,
    color: 'green',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Sample4;