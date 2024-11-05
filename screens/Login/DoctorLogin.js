import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './LoginPageStyles';
import axios from 'axios';
import { SessionContext } from '../Session/SessionProvider';

const DoctorLogin = ({ navigation }) => {
    const {sessionData} = useContext(SessionContext);
    const {setSessionData} = useContext(SessionContext);
    const [formData, setFormData] = useState({
        doctorId: '',
        password: '',
    });

    const isLocalHost = true;

    const [error, setError] = useState('');
    const baseURL = isLocalHost ? 'http://localhost:5000/doctor/auth/login' : 'http://192.168.15.85:8081/doctor/auth/login';

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        if (formData.doctorId === '' || formData.password === '') {
            setError('All fields are required!');
        } else {
            console.log(formData);
            setError('');
            try {
                const response = await axios.post(baseURL, formData);
                console.log(response.data);
                setSessionData({
                    id:response.data.doctorId,
                    name:response.data.name,
                });
                console.log("LoggedIn Successfully");
                setFormData({
                    doctorId: '',
                    password: '',
                });
                navigation.navigate('Therepist');
            } catch (err) {
                console.error(err.message);
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginMain}>
                <Text style={styles.loginTitle}>Therapist Login</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Doctor ID</Text>
                    <TextInput style={styles.formInput} placeholder="Enter your Doctor ID"
                        value={formData.doctorId} onChangeText={(text) => handleChange('doctorId', text)} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Password</Text>
                    <TextInput style={styles.formInput} placeholder="Enter your password"
                        secureTextEntry={true} value={formData.password}
                        onChangeText={(text) => handleChange('password', text)} />
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : null}

                <Pressable style={styles.loginButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default DoctorLogin;