import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import styles from './LoginPageStyles';

const PatientRegister = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: '',
        patientId: '',
        phoneNumber: '',
        doctorId: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        if (formData.name === '' || formData.patientId === '' || formData.phoneNumber === '' || formData.doctorId === '' || formData.password === '') {
            setError('All fields are required!');
        } else {
            setError('');
            try {
                const response = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        patientId: formData.patientId,
                        phoneNumber: formData.phoneNumber,
                        doctorId: formData.doctorId,
                        password: formData.password,
                        register: '0',
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Registration Successful:', data);
                    navigation.navigate('Receptionist');
                } else {
                    setError(data.message || 'Registration failed, please try again.');
                }
            } catch (error) {
                setError('Network error, please try again.');
                console.error('Error:', error);
            }
        }
    };

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginMain}>
                <Text style={styles.loginTitle}>Register a patient</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Name</Text>
                    <TextInput style={styles.formInput} value={formData.name} onChangeText={(value) => handleChange('name', value)}
                        placeholder="Enter your name" />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Patient ID</Text>
                    <TextInput style={styles.formInput} value={formData.patientId}
                        onChangeText={(value) => handleChange('patientId', value)} placeholder="Enter your Patient ID" />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Phone Number</Text>
                    <TextInput style={styles.formInput} value={formData.phoneNumber}
                        onChangeText={(value) => handleChange('phoneNumber', value)} placeholder="Enter your Phone Number" />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Therapist ID</Text>
                    <TextInput style={styles.formInput} value={formData.doctorId}
                        onChangeText={(value) => handleChange('doctorId', value)} placeholder="Enter the Therapist ID" />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Password</Text>
                    <TextInput style={styles.formInput} value={formData.password} onChangeText={(value) => handleChange('password', value)}
                        placeholder="Enter your password" secureTextEntry />
                </View>
                <Text>Upload your Previous Document here (not Compulsory)</Text>
                <input type="file"/>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <Pressable style={styles.loginButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>

            </View>
        </View>
    );
};

export default PatientRegister;
