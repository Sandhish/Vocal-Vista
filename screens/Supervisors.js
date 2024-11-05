import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet,ScrollView, FlatList, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SessionContext } from './Session/SessionProvider';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';

export default function Supervisors({navigation})
{
    const supervisorData = [{supervisorId:'S1',name:'Santhosh'}];
    let supervisorMapId = '';
    const mapData = [{patientId:'P1',name:'Raj'}];
    const [patientdata,setPatientData] = useState([]);
    const [loading,setLoading] = useState(true);
    const {setSessionData} = useContext(SessionContext);


    useEffect(()=>{
        if(loading)
        {
          PatientData();
        }
      },[]);
        const PatientData = async () => {
          try{
            const patient = await axios.post('http://localhost:5000/initial/auth/initialpatient',{supervisorId:'S1'});
            console.log(patient.data);
            let patientdataview = [];
            patient.data.forEach(consult => {
              patientdataview.push({
                patientId: consult.patientId,
                doctorId: consult.doctorId,
                date:consult.date,
                consulted:consult.consulted,
                supervisorId:consult.supervisorId,
              });
            });
            setPatientData([...patientdataview]);
            setLoading(false);;
        }
        catch(error)
        {
            console.log(error.message);
        }
    }

    const patientNavigate = (patientId,doctorId) => {
        try{
          setSessionData({
            details:{patientId:patientId,doctorId:doctorId}
          });
          navigation.navigate('Dashboard');
        }
        catch(error)
        {
          console.log(error.message);
        }
      }

    const renderItem1 = ({ item }) => (
        <Pressable onPress={()=>{patientNavigate('P4','D1')}}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.patientId}</Text>
            <Text style={styles.tableCell}>{item.doctorId}</Text>
            <Text style={styles.tableCell}>{item.date.slice(0,10)}</Text>
            <Text style={styles.tableCell}>Under Therepy</Text>
            {/*<Text style={styles.cell}>{item.therapist}</Text>*/}
            <Text style={styles.tableCell}><Pressable style={styles.button} title="Add Report" onPress={()=>{navigation.navigate({name:'Consult',params:{patientId:item.patientId,doctorId:item.doctorId,supervisorId:item.supervisorId}})}}><Text>Add Report</Text></Pressable></Text>
          </View>
          </Pressable>
    );


    const renderItem = ({ item }) => (
        <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{item.patientId}</Text>
        <Text style={styles.tableCell}>{item.name}</Text>
        <Dropdown style={styles.tableCell} data={supervisorData} labelField="name" valueField="supervisorId" value={supervisorMapId} />
        <Pressable style={styles.tableCell} title="Assign" onPress={()=>{}}><Text style={styles.button}>Assign</Text></Pressable>
    </View>
        );

    return(
        <View>
            <Text style={{padding:'5px'}}>Assing the Therepist for the patient</Text>
            {loading ? <Text>Loading...</Text> : <View><View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Patient Id</Text>
                    <Text style={styles.tableHeaderCell}>Patient Name</Text>
                    <Text style={styles.tableHeaderCell}>Select Student Therepist</Text>
                    <Text style={styles.tableHeaderCell}></Text>
                </View>
                <FlatList
                    data={mapData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
        </View>
        <Text>Evaluate the report</Text>
        <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Patient Id</Text>
                    <Text style={styles.tableHeaderCell}>Therepist Id (student)</Text>
                    <Text style={styles.tableHeaderCell}>Appointment Date</Text>
                    {/* <Text style={styles.tableHeaderCell}></Text> */}
                    <Text style={styles.tableHeaderCell}>Completed</Text>
                    <Text style={styles.tableHeaderCell}>Add Report</Text>
                    
                </View>
                <FlatList
                    data={patientdata}
                    renderItem={renderItem1}
                    keyExtractor={(item, index) => index.toString()}
                />
        </View>}
        </View>
    );
}

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
    supervisor:{
        margin:'2%',
        backgroundColor:'#EEE',
        borderRadius:'5px',
        shadowColor:'#999',
        shadowRadius:'10px',
        textAlign:'center',
        fontSize:'120%',
        width:'75vw'
    },
    therepist:{
        height:'50vh',
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