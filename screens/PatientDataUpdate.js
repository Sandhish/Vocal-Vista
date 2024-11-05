import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

const PatientDataUpdate = () => {
    const data = [
        {
            id: 1,
            patientName: 'John',
            rating: '4.5',
            nextAppointmentDate: '2024-09-10',
            daysOfConsultation: 10,
        },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Patient Details</Text>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Patient Name</Text>
                    <Text style={styles.tableHeaderCell}>Rating</Text>
                    <Text style={styles.tableHeaderCell}>Next Appointment Date</Text>
                    <Text style={styles.tableHeaderCell}>Days of Consultation</Text>
                    <Text style={styles.tableHeaderCell}>Edit</Text>
                </View>
                {data.map((item) => (
                    <View key={item.id} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item.patientName}</Text>
                        <Text style={styles.tableCell}>{item.rating}</Text>
                        <Text style={styles.tableCell}>{item.nextAppointmentDate}</Text>
                        <Text style={styles.tableCell}>{item.daysOfConsultation}</Text>
                        <Pressable style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        minWidth:400,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
        color: '#4a90e2',
        textAlign: 'center',
    },
    table: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
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
    editButton: {
        flex: 1,
        backgroundColor:'#4a90e2',
        alignItems: 'center',
        borderRadius:20,
        height:28,
    },
    editButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign:'center'
    },
});

export default PatientDataUpdate;