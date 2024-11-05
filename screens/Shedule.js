/*import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

function  Shedule()
{

}

export default Shedule;*/
// src/screens/PatientTableScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Shedule = ({navigation}) => {
  const [patients, setPatients] = useState([
    { id: '1', name: 'John Doe', nextVisit: '2024-09-01', therapist: 'Dr. Smith' },
    { id: '2', name: 'Jane Roe', nextVisit: '2024-09-05', therapist: 'Dr. Johnson' },
    { id: '3', name: 'Alice Brown', nextVisit: '2024-09-10', therapist: 'Dr. White' },
  ]);

  const handleEdit = (id) => {
    // Here you can navigate to an edit screen or show a dialog for editing
    Alert.alert('Edit', `Edit patient with id: ${id}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.nextVisit}</Text>
      <Text style={styles.cell}>{item.therapist}</Text>
      <TouchableOpacity onPress={() => handleEdit(item.id)}>
        <Icon name="edit" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Next Visit</Text>
        <Text style={styles.headerCell}>Therapist</Text>
        <Text style={styles.headerCell}>Actions</Text>
      </View>
      <FlatList
        data={patients}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
});

export default Shedule;
