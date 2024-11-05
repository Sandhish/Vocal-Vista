import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Picker, Pressable, Button, StyleSheet } from 'react-native';

// Styles for the form
const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

// Form component
const Form = ({navigation, route}) => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [rating, setRating] = useState('0');
  const [description, setDescription] = useState('');
  const [consulted, setConsulted] = useState('0');  // Updated the state name here

  // Generate arrays for days, months, and years
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i);
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i); // Next 10 years

  // Handle form submission
  const handleSubmit = async () => {
    const appointmentDate = new Date(selectedYear, selectedMonth, selectedDay);
    const formattedDate = appointmentDate.toLocaleDateString();
    const formData = {
      appointmentDate: formattedDate,
      rating: rating,
      description: description,
      consultDoctor: consulted,  // Updated to use 'consulted' state
    };

    try{
        const patient = await axios.post('http://localhost:5000/patient/auth/updatepatient',{patientId:route.params?.patientId,doctorId:route.params?.doctorId,supervisorId:route.params?.supervisorId,nextappointment:formData.appointmentDate,rating:formData.rating,description:formData.description,consultDoctor:consulted});
        console.log("Sent Data");
    }
    catch(error)
    {
        console.log(error.message);
    }

    console.log('Form Data:', formData, route.params?.patientId, route.params?.doctorId, route.params?.supervisorId);
    // Handle form submission logic here
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Next Appointment Date</Text>
        <View style={styles.datePickerContainer}>
          <Picker
            selectedValue={selectedDay}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedDay(itemValue)}
          >
            {days.map((day) => (
              <Picker.Item key={day} label={day.toString()} value={day} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedMonth}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            {months.map((month) => (
              <Picker.Item key={month} label={(month + 1).toString()} value={month} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedYear}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
          >
            {years.map((year) => (
              <Picker.Item key={year} label={year.toString()} value={year} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Rating (0-5)</Text>
        <Picker
          selectedValue={rating}
          style={styles.picker}
          onValueChange={(itemValue) => setRating(itemValue)}
        >
          {[...Array(6).keys()].map((num) => (
            <Picker.Item key={num} label={num.toString()} value={num.toString()} />
          ))}
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Description</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter description (good, moderate, average)"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Consulted Therapist</Text>
        <Picker
          selectedValue={consulted}  // Updated to use 'consulted' state
          style={styles.picker}
          onValueChange={(itemValue) => setConsulted(itemValue)}  // Updated to update 'consulted' state
        >
            <Picker.Item label="Consulted" value="1" />
            <Picker.Item label="Not Consulted" value="0" />
        </Picker>
      </View>

      <Pressable onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default Form;
