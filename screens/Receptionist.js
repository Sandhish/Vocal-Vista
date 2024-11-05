import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet,ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SessionContext } from './Session/SessionProvider';
import axios from 'axios';

const Receptionist = ({navigation}) => {

    const {sessionData} = useContext(SessionContext);
    const [patients, setPatients] = useState([
        { id: '1', name: 'John Doe', visit: '2024-09-01', therapist: 'Dr. Smith' },
        { id: '2', name: 'Jane Roe', visit: '2024-09-05', therapist: 'Dr. Johnson' },
        { id: '3', name: 'Alice Brown', visit: '2024-09-10', therapist: 'Dr. White' },
      ]);
      const [loading,setLoading] = useState(true);
      const [patientMap,setPatientMap] = useState()

      // const patientData = async () =>{
      //     const patient = 
      // }

      useEffect(()=>{
        if(loading)
        {
          PatientData();
        }
      },[])
      const PatientData = async () => {
        try{
          const patient = await axios.post('http://localhost:5000/api/auth/receptionistview');
          console.log(patient.data);
          let patientdata = [];
          patient.data.forEach(element => {
            patientdata.push({patientId:element.patientId,
              name:element.name,
              phoneNumber:element.phoneNumber,
              register:element.register,
              doctorId:element.doctorId,
            });
          });
          setPatientMap([...patientdata]);
          setLoading(false);
        }
        catch(error)
        {
          console.log(error.message);
        }
      }

    const renderItem = ({ item }) => (
        <View style={styles.row}>
          <Text style={styles.cell}>{item.patientId}</Text>
          <Text style={styles.cell}>{item.name}</Text>
          <Text style={styles.cell}>{item.phoneNumber}</Text>
          <Text style={styles.cell}>{item.register=="0" ? "No" : item.doctorId}</Text>
          {/*<Text style={styles.cell}>{item.therapist}</Text>*/}
        </View>
      );

    return (
        <View>
          <Text>Hello {sessionData.name}</Text>
            <Pressable title="Register a Patient" style={styles.button} onPress={()=>{navigation.navigate('PatientRegister')}}><p>Register a patient</p></Pressable>
            <Text style={{fontFamily:'Arial', fontSize:'110%',fontWeight:'600',padding:'5px'}}>Patient Details</Text>
            <ScrollView style={{height:'80vh'}}>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Patient Id</Text>
                    <Text style={styles.tableHeaderCell}>Patient Name</Text>
                    <Text style={styles.tableHeaderCell}>Phone Number</Text>
                    <Text style={styles.tableHeaderCell}>Therepist Allocated</Text>
                </View>
                <FlatList
                    data={patientMap}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
        </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    headerRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 8,
      marginBottom: 8,
    },
    row: {
      flexDirection: 'row',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      alignItems: 'center',
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
      color: '#333',
    },
    cell: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    button:{
        textAlign:'center',
        backgroundColor:'#00F',
        padding:'2%',
        fontFamily:'Arial',
        borderRadius:'5px',
        margin:'2%',
        color:'white'
    },
    table: {
      backgroundColor: '#fff',
      borderRadius: 10,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      margin:'5px'
  },
  tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#4a90e2',
      paddingVertical: 10,
  },
  tableHeaderCell: {
      flex: 1,
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
  },
  tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingVertical: 10,
  },
  tableCell: {
      flex: 1,
      textAlign: 'center',
      color: '#333',
      fontSize: 14,
  },
  });

export default Receptionist;