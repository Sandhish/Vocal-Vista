import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Voice from 'react-native-voice';

const Sample2 = () => {
  const [syllables, setSyllables] = useState(["ba", "na", "na"]);
  const [sequence, setSequence] = useState([]);
  const [currentWord, setCurrentWord] = useState("banana");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognizedWord, setRecognizedWord] = useState("");

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (result) => {
    const spokenWord = result.value[0].toLowerCase();
    setRecognizedWord(spokenWord);
    checkPronunciation(spokenWord);
  };

  const startRecognition = async () => {
    try {
      setIsSpeaking(true);
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecognition = async () => {
    try {
      await Voice.stop();
      setIsSpeaking(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSyllableClick = (syllable) => {
    setSequence([...sequence, syllable]);
    setSyllables(syllables.filter((syll) => syll !== syllable));
  };

  const checkPronunciation = (spokenWord) => {
    if (spokenWord === currentWord) {
      Alert.alert("Correct!", `You pronounced ${currentWord} correctly!`);
    } else {
      Alert.alert("Try Again", `You said "${spokenWord}". Please try pronouncing "${currentWord}" again.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sound Sequencer</Text>
      <Text style={styles.instruction}>Rearrange the syllables and pronounce the word:</Text>

      {/* Syllables List */}
      <View style={styles.syllablesContainer}>
        {syllables.map((syllable, index) => (
          <TouchableOpacity
            key={index}
            style={styles.syllableButton}
            onPress={() => handleSyllableClick(syllable)}
          >
            <Text style={styles.syllableText}>{syllable}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sequenceContainer}>
        {sequence.map((syllable, index) => (
          <Text key={index} style={styles.syllableText}>{syllable}</Text>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={isSpeaking ? stopRecognition : startRecognition}
      >
        <Text style={styles.buttonText}>{isSpeaking ? "Stop" : "Pronounce"}</Text>
      </TouchableOpacity>

      {recognizedWord ? (
        <Text style={styles.feedback}>You said: {recognizedWord}</Text>
      ) : null}
    </View>
  );
};

export default Sample2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004080',
  },
  instruction: {
    fontSize: 18,
    marginBottom: 20,
    color: '#004080',
  },
  syllablesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  syllableButton: {
    backgroundColor: '#99ccff',
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  syllableText: {
    fontSize: 20,
    color: '#004080',
  },
  sequenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0080ff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  feedback: {
    fontSize: 18,
    color: '#004080',
  },
});