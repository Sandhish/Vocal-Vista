import React, { useState } from 'react';
import { View, TextInput, Button, Text, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    try {
      //const response = await axios.post('http://localhost:3000/login', { username, password });
      //await AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('Dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <View>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {error ? <Text>{error}</Text> : null}
      <Button title="Login" onPress={login} />
      {/*<Pressable title="Go to Shedule" onPress={()=>{navigation.navigate('Shedule')}}><p>Go to Shedule</p></Pressable>*/}
</View>);
}