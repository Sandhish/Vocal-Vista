import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import styles from './LoginPageStyles';
import { SessionContext } from '../Session/SessionProvider';

const PatientLogin = ({ navigation }) => {
    const { setSessionData } = useContext(SessionContext);
    const { sessionData } = useContext(SessionContext);
    const [formData, setFormData] = useState({
        patientId: '',
        password: '',
    });

    const isLocalHost = true;

    const baseURL = 'http://localhost:5000/api/auth/login';
    const [error, setError] = useState('');

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        if (formData.patientId === '' || formData.password === '') {
            setError('All fields are required!');
        } else {
            console.log(formData);
            setError('');
            try {
                const response = await axios.post(baseURL, formData);
                console.log(response.data);
                setSessionData({
                    id: response.data.patientId,
                    name: response.data.name,
                    details: response.data,
                });
                console.log(sessionData, response.data.name);
                console.log("LoggedIn Successfully");
                setFormData({
                    patientId: '',
                    password: ''
                });
                navigation.navigate('Supervisor');
            } catch (err) {
                console.error(err.message);
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <View style={styles.loginContainer}>
            <View /*style={styles.loginMain}*/>
                <View style={styles.loginMain}>
                    <Text style={styles.loginTitle}>Supervisor Login</Text>
                    <Image source={require('./image.png')} style={styles.image} />
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Supervisor ID</Text>
                        <TextInput
                            style={styles.formInput}
                            value={formData.patientId}
                            onChangeText={(value) => handleChange('patientId', value)}
                            placeholder="Enter your Supervisor ID"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Password</Text>
                        <TextInput
                            style={styles.formInput}
                            value={formData.password}
                            onChangeText={(value) => handleChange('password', value)}
                            placeholder="Enter your password"
                            secureTextEntry
                        />
                    </View>
                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <Pressable style={styles.loginButton} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>

                </View>
                <View style={styles.tNavigateLink}>
                    <Pressable onPress={() => { navigation.navigate('DoctorLogin') }}>
                        <Text style={styles.linkText}>Doctor Login!</Text>
                    </Pressable>
                    <Pressable onPress={() => { navigation.navigate('ReceptionistLogin') }}>
                        <Text style={styles.linkText}>Receptionist Login!</Text>
                    </Pressable>
                    <Pressable onPress={() => { navigation.navigate('SupervisorLogin') }}>
                        <Text style={styles.linkText}>Student Therepist Login!</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default PatientLogin;
/*import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import styles from './LoginPageStyles';

const PatientLogin = ({navigation}) => {
    const [formData, setFormData] = useState({
        name: '',
        patientId: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        if (formData.name === '' || formData.patientId === '' || formData.password === '') {
            setError('All fields are required!');
        } else {
            console.log(formData);
            setError('');
        }
    };

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginMain}>
                <Text style={styles.loginTitle}>Login</Text>
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
                    <Text style={styles.formLabel}>Password</Text>
                    <TextInput style={styles.formInput} value={formData.password}  onChangeText={(value) => handleChange('password', value)} 
                        placeholder="Enter your password" secureTextEntry />
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : null}

                <Pressable style={styles.loginButton} onPress={()=>{navigation.navigate('Dashboard')}}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>

                <View style={styles.tNavigateLink}>
                    <Pressable onPress={() => {navigation.navigate('DoctorLogin')}}>
                        <Text style={styles.linkText}>Doctor Login!</Text>
                    </Pressable>
                    <Pressable onPress={() => {navigation.navigate('ReceptionistLogin')}}>
                        <Text style={styles.linkText}>Receptionist Login!</Text>
                    </Pressable>
                    <br/>
                    
                    {/*<Pressable onPress={() => {navigation.navigate("Dashboard")}}>
                        <Text style={styles.linkText}>Login</Text>
                    </Pressable>                    }
                    <Pressable onPress={() => {navigation.navigate('SupervisorLogin')}}>
                        <Text style={styles.linkText}>Supervisor Login!</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default PatientLogin;*/