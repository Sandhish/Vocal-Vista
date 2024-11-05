import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const PatientData = () => {
    const patientName = 'John Doe';

    const data = [
        { therapist: 'Dr. Smith', appointmentDate: '2024-08-01', rating: '4.5', nextAppointment: '2024-09-01' },
        { therapist: 'Dr. Jane', appointmentDate: '2024-07-15', rating: '4.7', nextAppointment: '2024-08-15' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.therapist}</Text>
            <Text style={styles.tableCell}>{item.appointmentDate}</Text>
            <Text style={styles.tableCell}>{item.rating}</Text>
            <Text style={styles.tableCell}>{item.nextAppointment}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.patientName}>Patient: {patientName}</Text>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Therapist</Text>
                    <Text style={styles.tableHeaderCell}>Appointment Date</Text>
                    <Text style={styles.tableHeaderCell}>Rating</Text>
                    <Text style={styles.tableHeaderCell}>Next Appointment</Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        fontFamily:'Arial',
        flex: 1,
        minWidth:400,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    patientName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop:50,
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
});

export default PatientData;