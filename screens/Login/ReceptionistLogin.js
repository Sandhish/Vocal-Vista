import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import styles from './LoginPageStyles';
import axios from 'axios';
import { SessionContext } from '../Session/SessionProvider';

const ReceptionistLogin = ({ navigation }) => {
    const { SessionData } = useContext(SessionContext)
    const { setSessionData } = useContext(SessionContext);
    const [formData, setFormData] = useState({
        receptionistId: '',
        password: '',
    });

    const isLocalHost = true;

    const [error, setError] = useState('');
    const baseURL = isLocalHost ? 'http://localhost:5000/receptionist/auth/login' : 'http://192.168.15.85:8081/receptionist/auth/login';

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        if (formData.receptionistId === '' || formData.password === '') {
            setError('All fields are required!');
        } else {
            setError('');
            try {
                const response = await axios.post(baseURL, formData);
                console.log(response.data);
                setSessionData({
                    id: response.data.receptionistId,
                    name: response.data.name,   
                });
                console.log("LoggedIn Successfully");
                setFormData({
                    receptionistId: '',
                    password: '',
                });
                navigation.navigate('Receptionist');
            } catch (err) {
                console.error(err.message);
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginMain}>
                <Text style={styles.loginTitle}>Login</Text>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Receptionist ID</Text>
                    <TextInput style={styles.formInput} value={formData.receptionistId}
                        onChangeText={(value) => handleChange('receptionistId', value)} placeholder="Enter your Receptionist ID" />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Password</Text>
                    <TextInput style={styles.formInput} value={formData.password} onChangeText={(value) => handleChange('password', value)}
                        placeholder="Enter your password" secureTextEntry />
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : null}

                <Pressable style={styles.loginButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>

            </View>
        </View>
    );
};

export default ReceptionistLogin;