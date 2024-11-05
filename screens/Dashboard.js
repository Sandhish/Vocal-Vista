/*import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/me', {
        headers: { Authorization: token }
      });
      setUser(response.data);
    };
    fetchUser();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  if (!user) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Welcome, {user.username}</Text>
      <Button title="Logout" onPress={logout} />
</View>);
}   */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, SafeAreaView, LogBox, FlatList, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { SessionContext } from './Session/SessionProvider';
import { useContext } from 'react';
import axios from 'axios';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

LogBox.ignoreLogs([
  'Warning: Unknown event handler property `onResponderTerminate`. It will be ignored.'
]);
const Dashboard = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const {sessionData} = useContext(SessionContext);
  console.log(sessionData.details);
  const [loading, setLoading] = useState(true);
  const [errorloading, seterrorLoading] = useState(false);
  const [nextapp,setnextapp] = useState('fetching...');
  const [tableData,setTableData] = useState([]);

  const [graphData,setGraphData] = useState([{date:'start',value:0}]);

    useEffect(()=>{
        patientData();
    },[]);
    // useEffect(()=>{
    //   navigation.addListener('beforeRemove',(e)=>{
    //     e.preventDefault();
    //     //Alert.alert('Login Again?','You should login again to continue',[{text:'Stay here',onPress:()=>{}},{text:'Go to login',onPress:()=>{navigation.dispatch(e.data.action)}}])
    //   },[navigation]);
    // })
  const patientData = async () =>{
    //let graphData = [];
    try{
    const data = await axios.post('http://localhost:5000/patient/auth/getpatient',{patientId:'P4',doctorId:'D1'});
    let graphdataConsult = data.data.consult;
    if(graphdataConsult==[])
    {
      setLoading(false);
      setnextapp('Consult your Supervisor');
      return ;
    }
      console.log(graphdataConsult);
      //let graphData = [];
      let newGraphData = [];
      graphdataConsult.forEach(consult => {
        newGraphData.push({
          date: consult.date.slice(0, 10),
          value: consult.rating
        });
      });
      setGraphData(prevState => [...prevState, ...newGraphData]);
      let tabledata = [];
      let nextappointment;
      graphdataConsult.forEach(consult => {
        tabledata.push({
          date: consult.date.slice(0, 10),
          supervisorId:consult.supervisorId,
          rating: consult.rating,
          description:consult.description,
          consultDoctor:consult.consultDoctor,
        });
        nextappointment = consult.nextappointment;
      });
      setTableData(prevState=>[...prevState, ...tabledata]);
      setnextapp(nextappointment.slice(0,10));
      setLoading(false);
    }
    catch(error)
    {
      seterrorLoading(true);
      console.log(error.message);
    }

  }

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{item.date}</Text>
        <Text style={styles.tableCell}>{item.supervisorId}</Text>
        <Text style={styles.tableCell}>{item.rating}</Text>
        <Text style={styles.tableCell}>{item.description}</Text>
        <Text style={styles.tableCell}>{item.consultDoctor=="0" ? "No" : "Yes"}</Text>
    </View>
);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{height:'80vh'}}>
      <View style={styles.header}>
        <Text style={styles.name}>{sessionData.name}</Text>
        {sessionData.id==sessionData.details.patientId ? <Icon name="logout" style={{position:'absolute',flex:'1',alignSelf:'flex-end',marginLeft:'5px'}} size={20} onPress={()=>{navigation.navigate('PatientLogin')}}/> : <Text></Text>}
        <Text style={styles.report}>Next Appointment {nextapp}</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Fluency Progress</Text>
        {loading ? <Text>"Loading..."</Text> : errorloading ? <Text style={{color:'#f00',padding:'5px'}}>Check your Internet</Text> : 
        <VictoryChart theme={VictoryTheme.material}>
        {/* <VictoryAxis
          
          tickFormat={["Jan", "Feb", "Mar","Apr","May","Jun"]}
          label="Ratings"
          axisLabelComponent={<VictoryLabel dy={-10} />}
        />
        <VictoryAxis
        dependentAxis
        tickFormat={(x) => `${x}`}
          
          label="Month"
          axisLabelComponent={<VictoryLabel dy={0} />}
        /> */}
        <VictoryLine
          data={graphData}
          x="date"
          y="value"
          style={{
            data: { stroke: "#c43a31", strokeWidth: 2 },
            parent: { border: "1px solid #ccc" },
          }}
        />
      </VictoryChart>}


      </View>
      <Pressable title="Go to Session modules" style={styles.button} onPress={()=>{navigation.navigate('Modules')}}><Text style={{fontSize:'110%',color:'white'}}>Go To Session Modules</Text></Pressable>

      {loading ? <Text>Loading...</Text> : <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Date</Text>
                    <Text style={styles.tableHeaderCell}>Supervisor Name</Text>
                    <Text style={styles.tableHeaderCell}>Rating</Text>
                    <Text style={styles.tableHeaderCell}>Description</Text>
                    <Text style={styles.tableHeaderCell}>Consulted Therepist</Text>
                </View>
                <FlatList
                    data={tableData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
        </View>}
      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
    backgroundColor: '#f5f5f5',
    height:'90vh',
  },
  header: {
    margin: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    margin:5
  },
  report: {
    fontSize: 16,
    color: '#666',
    margin:5
  },
  chartContainer: {
    margin: 5,
    alignSelf:'center'
  },
  chartTitle: {
    fontSize: 18,
    margin: 10,
    fontWeight: 'bold',
  },
  session:{
    margin:'3%',
    padding:'2%',
    textAlign:'center',
    fontFamily:'Arial',
    backgroundColor:'#FFF',
    borderRadius:'10px',
    alignItems:'center',
    justifyContent:'center',
    maxWidth:'500px',
    width:'90%'
  },
  button:{
    textAlign:'center',
    margin:'2%',
    backgroundColor:'rgba(0,0,255,0.7)',
    borderRadius:'5px',
    width:250,
    fontSize:'120%',
    padding:'5px',
    alignItems:'center',
    justifyContent:'center',
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
export default Dashboard;