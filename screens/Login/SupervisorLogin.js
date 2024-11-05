import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './LoginPageStyles';
import axios from 'axios';
import { SessionContext } from '../Session/SessionProvider';

const SupervisorLogin = ({ navigation }) => {
    // const {sessionData} = useContext(SessionContext);
    const {setSessionData} = useContext(SessionContext);
    const [formData, setFormData] = useState({
        supervisorId: '',
        password: '',
    });

    const isLocalHost = true;

    const [error, setError] = useState('');
    const baseURL = 'http://localhost:5000/supervisor/auth/login';

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        if (formData.supervisorId === '' || formData.password === '') {
            setError('All fields are required!');
            
        } else {
            setError('');
            try {
                const response = await axios.post(baseURL, formData);
                console.log(typeof(response.data.supervisorId));
                const id = response.data.supervisorId;
                const name = response.data.name;
                console.log(id,response.data);
                setSessionData({
                    id:id,
                    name:name,
                    details:{}
                });
                console.log("LoggedIn Successfully");
                setFormData({
                    supervisorId: '',
                    password: '',
                });
                navigation.navigate('Student Therepist');
            } catch (err) {
                console.error(err.message);
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginMain}>
                <Text style={styles.loginTitle}>Student Therepist Login</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Student ID</Text>
                    <TextInput style={styles.formInput} placeholder="Enter your Student ID" 
                        value={formData.supervisorId} onChangeText={(text) => handleChange('supervisorId', text)} />
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

export default SupervisorLogin;