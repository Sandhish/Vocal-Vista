import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import styles from './LoginPageStyles';

const DoctorRegister = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: '',
        doctorId: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        if (formData.name === '' || formData.doctorId === '' || formData.phoneNumber === '' || formData.password === '') {
            setError('All fields are required!');
        } else if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
        } else {
            setError('');
            try {
                const response = await fetch('http://localhost:5000/doctor/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        doctorId: formData.doctorId,
                        phoneNumber : formData.phoneNumber,
                        password: formData.password,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Registration Successful:', data);
                    navigation.navigate('DoctorLogin');
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
        <ScrollView contentContainerStyle={styles.loginContainer}>
            <View style={styles.loginMain}>
                <Text style={styles.loginTitle}>Doctor Registration</Text>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Name</Text>
                    <TextInput style={styles.formInput} placeholder="Enter your name"
                        value={formData.name} onChangeText={(text) => handleChange('name', text)} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Doctor ID</Text>
                    <TextInput style={styles.formInput} placeholder="Enter your Doctor ID"
                        value={formData.doctorId} onChangeText={(text) => handleChange('doctorId', text)} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Phone Number</Text>
                    <TextInput style={styles.formInput} value={formData.phoneNumber}
                        onChangeText={(value) => handleChange('phoneNumber', value)} placeholder="Enter your Phone Number" />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Password</Text>
                    <TextInput style={styles.formInput} placeholder="Enter your password"
                        secureTextEntry={true} value={formData.password}
                        onChangeText={(text) => handleChange('password', text)} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Confirm Password</Text>
                    <TextInput style={styles.formInput} placeholder="Confirm your password"
                        secureTextEntry={true} value={formData.confirmPassword}
                        onChangeText={(text) => handleChange('confirmPassword', text)} />
                </View>

                {error ? <Text style={styles.error}>{error}</Text> : null}
                {success ? <Text style={styles.success}>{success}</Text> : null}

                <Pressable style={styles.loginButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default DoctorRegister;