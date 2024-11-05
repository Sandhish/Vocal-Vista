import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet,ScrollView, FlatList, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SessionContext } from './Session/SessionProvider';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';

const Therepist = ({navigation}) => {

    const {sessionData} = useContext(SessionContext);
    // const [patients, setPatients] = useState([
    //     { id: '1', name: 'John Doe',supervisor:'Dr.supervisor1'},
    //     { id: '2', name: 'Jane Roe',supervisor:'Dr.supervisor2'},
    //     { id: '3', name: 'Alice Brown',supervisor:'Dr.supervisor3'},
    //   ]);
    const [loading,setLoading] = useState(true);
    const [mapData,setMapData] = useState([]);
    const [mapAllData,setMapAllData] = useState([]);
    const [supervisorData,setSupervisorData] = useState([]);
    const [supervisorMapId,setSupervisorMapId] = useState(null);
    const [updatesupervisor,setUpdateSupervisor] = useState('');
    const [refreshing,setRefreshing] = useState(false);

    
      const patientData = async () => {
        // try{
          // const patient = await axios.post('http://localhost:5000/api/auth/therepistview',{doctorId:sessionData.id});
          // console.log(patient);
          // let mapdata = [];
          // patient.data.forEach(consult => {
          //   mapdata.push({
          //     patientId: consult.patientId,
          //     name: consult.name,
          //   });
          // });
          // console.log(mapdata);
          setMapData(prevState=>[{patientId:'P1',name:'Raj'}]);
          const patientAll = await axios.post('http://localhost:5000/api/auth/therepistallview',{doctorId:sessionData.id});
          console.log("PatientAll",patientAll.data);
          const patientalldata = patientAll.data.patient;
          console.log("patientAlldatadata",patientalldata);


          const combinedData = patientAll.data.initialpatient.map((item1) => {
            let matchedData = null;
          
            // Use forEach to find the matching item in array2
            patientalldata.forEach((item2) => {
              if (item1.doctorId === item2.doctorId && item1.patientId === item2.patientId) {
                matchedData = {
                  ...item1,
                  name: item2.name,
                  phoneNumber: item2.phoneNumber,
                };
              }
            });
          
            // Return matchedData if found; otherwise, return the original item1
            return matchedData || item1;
          });
          
          console.log(combinedData);
          // const patientcombine = patientalldata.map();
          // let mapdataall = [];
          // patientAll.data.forEach(consult => {
          //   mapdataall.push({
          //     patientId: consult.patientId,
          //     name: consult.name,
          //   });
          // });
          // console.log(mapdata);
          // setMapAllData(prevState=>[ ...combinedData]);
          // const supervisorAll = await axios.post('http://localhost:5000/supervisor/auth/supervisormap');
          // // console.log(patient);
          // let mapdatasupervisor = [];
          // supervisorAll.data.forEach(consult => {
          //   mapdatasupervisor.push({
          //     supervisorId: consult.supervisorId,
          //     name: consult.supervisorId+" "+consult.name,
          //   });
          // });
          // console.log(mapdatasupervisor);
          setSupervisorData(prevState=>[{supervisorId:'S1',name:'Supervisor1'}]);
          setLoading(false);
        // }
        // catch(error)
        // {
        //   console.log(error.message);
        // }
      }

      const therepistAssignSupervisor = async (patientId) =>{
        // console.log(patientId);
        // setRefreshing(true);
        if(supervisorMapId==null)
        {
          setUpdateSupervisor('Please select a Supervisor');
          return ;
        }
          try{
            const patient = await axios.post('http://localhost:5000/api/auth/therepistassignsupervisor',{patientId:patientId,supervisorId:supervisorMapId,doctorId:sessionData.id});
            setUpdateSupervisor('');
            setLoading(true);
            patientData();
          }
          catch(error)
          {
            setUpdateSupervisor('Check your Internet Connection');
            console.log(error.message);
          }
      }
      useEffect(()=>{
        if(loading)
        {
          patientData();
        }
        console.log('effect');
      },[]);

      const onRefreshing = useCallback(()=>{
        setRefreshing(true);
        setTimeout(()=>{
          setRefreshing(false);
        },2000);
      },[]);

    const renderItem = ({ item }) => (
      <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.patientId}</Text>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Dropdown style={styles.tableCell} data={supervisorData} labelField="name" valueField="supervisorId" value={supervisorMapId} onChange={item=>{console.log(item.value);setSupervisorMapId(item.supervisorId)}}/>
      <Pressable style={styles.tableCell} title="Assign" onPress={()=>{therepistAssignSupervisor(item.patientId)}}><Text style={styles.button}>Assign</Text></Pressable>
  </View>
      );
      const renderAllItem = ({ item }) => (
        <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{item.patientId}</Text>
        <Text style={styles.tableCell}>{item.name}</Text>
        <Text style={styles.tableCell}>{item.date.slice(0,10)}</Text>
        <Text style={styles.tableCell}>{item.supervisorId}</Text>
        <Text style={styles.tableCell}>{item.consulted=="0" ? "Under Therepy" : "Yes"}</Text>
    </View>
        );

    return (
        <SafeAreaView>
          <ScrollView RefreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshing}/>}>
          <Text>Hello {sessionData.name}</Text>
            {/* <p style={{fontFamily:'Arial'}}>Patient Details</p>
            <ScrollView style={styles.therepist}>
                <View>
      <FlatList
        data={patients}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
                </View>
            </ScrollView>
            <Pressable title="Update Patient Report" style={styles.button} onPress={()=>{navigation.navigate('PatientData')}}>Update Patient report</Pressable> */}
        <Text style={{fontSize:'110%',padding:'2px', fontWeight:'600'}}>Patient Details to be Assigned</Text>
        {updatesupervisor=="" ? <Text></Text> : <Text>{updatesupervisor}</Text>}
        {loading ? <Text>Loading...</Text> : <View><View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Patient Id</Text>
                    <Text style={styles.tableHeaderCell}>Patient Name</Text>
                    <Text style={styles.tableHeaderCell}>Select Supervisor</Text>
                    <Text style={styles.tableHeaderCell}></Text>
                </View>
                <FlatList
                    data={mapData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
        </View>
        <Text style={{fontSize:'110%',padding:'2px', fontWeight:'600'}}>All Patient Details under you</Text>
        <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Patient Id</Text>
                    <Text style={styles.tableHeaderCell}>Patient Name</Text>
                    <Text style={styles.tableHeaderCell}>Date of Appointment</Text>
                    <Text style={styles.tableHeaderCell}>Student Therepist Allocated</Text>
                    <Text style={styles.tableHeaderCell}>Completed</Text>
                    
                </View>
                <FlatList
                    data={mapAllData}
                    renderItem={renderAllItem}
                    keyExtractor={(item, index) => index.toString()}
                />
        </View></View>
        }
        {/* <Pressable title="Reload" onPress={()=>{setLoading(true)}}><Text>ReLoad</Text></Pressable> */}
        </ScrollView>
        </SafeAreaView>
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

export default Therepist;