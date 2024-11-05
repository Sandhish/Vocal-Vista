// src/screens/DashboardScreen.js
/*import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const App = () => {
  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.report}>Last Report: 15th August 2024</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Fluency Progress</Text>
        <LineChart
          data={data}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </View>
      <br/>
      <View style={{fontFamily:'Arial'}}><b>Take your Sessions Here</b></View>
      <ScrollView>
        <View style={styles.session}><p>session 1<br/><Pressable style={styles.button} title="Click to continue">Click to continue</Pressable></p></View>
        <View style={styles.session}><p>session 1<br/><Pressable style={styles.button} title="Click to continue">Click to continue</Pressable></p></View>
        <View style={styles.session}><p>session 1<br/><Pressable style={styles.button} title="Click to continue">Click to continue</Pressable></p></View>
        <View style={styles.session}><p>session 1<br/><Pressable style={styles.button} title="Click to continue">Click to continue</Pressable></p></View>
        <View style={styles.session}><p>session 1<br/><Pressable style={styles.button} title="Click to continue">Click to continue</Pressable></p></View>
      </ScrollView>
    </ScrollView>
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
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  report: {
    fontSize: 16,
    color: '#666',
  },
  chartContainer: {
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  session:{
    margin:'2%',
    padding:'2%',
    textAlign:'center',
    fontFamily:'Arial',
    backgroundColor:'#FFF',
    borderRadius:'10px'
  },
  button:{
    margin:'2%',
    backgroundColor:'rgba(0,0,255,0.7)',
    borderRadius:'5px'
  }
});*/
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import Shedule from './screens/Shedule';
import DoctorLogin from './screens/Login/DoctorLogin';
import PatientLogin from './screens/Login/PatientLogin';
import Receptionist from './screens/Receptionist';
import PatientRegister from './screens/Register/PatientRegister';
import ReceptionistLogin from './screens/Login/ReceptionistLogin';
import Therepist from './screens/Therepist';
import PatientData from './screens/PatientDataTherepist';
import PatientDataUpdate from './screens/PatientDataUpdate';
import Supervisor from './screens/Supervisor';
import SupervisorLogin from './screens/Login/SupervisorLogin';
import DoctorRegister from './screens/Register/DoctorRegister';
import SupervisorRegister from './screens/Register/SupervisorRegister';
import ReceptionistRegister from './screens/Register/ReceptionistRegister';
import { SessionProvider } from './screens/Session/SessionProvider';
import Modules from './screens/Components/Dashboard/Modules';
import Sample4 from './screens/Components/Session/Sample4';
import Sample3 from './screens/Components/Session/Sample3';
import Consult from './screens/Components/Supervisor/Consult';
import Supervisors from './screens/Supervisors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SessionProvider>
      <NavigationContainer>
        <Stack.Navigator>

          {/* <Stack.Screen name="PatientLogin" component={PatientLogin} /> */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="DoctorLogin" component={DoctorLogin} />
          <Stack.Screen name="Shedule" component={Shedule} />
          <Stack.Screen name="Receptionist" component={Receptionist} />
          <Stack.Screen name="PatientRegister" component={PatientRegister} />
          <Stack.Screen name="ReceptionistLogin" component={ReceptionistLogin} />
          <Stack.Screen name="Therepist" component={Therepist} />
          <Stack.Screen name="PatientData" component={PatientData} />
          <Stack.Screen name="PatientDataUpdate" component={PatientDataUpdate} />
          <Stack.Screen name="SupervisorLogin" component={SupervisorLogin} />
          <Stack.Screen name="Student Therepist" component={Supervisor} />
          <Stack.Screen name="DoctorRegister" component={DoctorRegister} />
          <Stack.Screen name="ReceptionistRegister" component={ReceptionistRegister} />
          <Stack.Screen name="SupervisorRegister" component={SupervisorRegister} />
          <Stack.Screen name="Modules" component={Modules} />
          <Stack.Screen name="Sample4" component={Sample4} />
          <Stack.Screen name="Sample3" component={Sample3} />
          {/*<Stack.Screen name="Sample4" component={Sample4} /> */}
          <Stack.Screen name="Consult" component={Consult} />
          <Stack.Screen name="Supervisor" component={Supervisors} />


        </Stack.Navigator>
      </NavigationContainer>
    </SessionProvider>
  );
}

//export default App;
