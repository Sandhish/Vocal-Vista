import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        //width: '80%',
        //padding: '5%',

    },
    loginMain: {
        //width: '100%',
        //maxWidth: 400,
        padding: '10%',
        backgroundColor: '#fff',
        borderRadius: 15,
        //elevation: 5, 
    },
    loginTitle: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: '500',
        textAlign: 'center',
    },
    formGroup: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 15,
    },
    formLabel: {
        marginBottom: 5,
        fontSize: 14,
        color: '#555',
        textAlign: 'left',
        width: '100%',
        fontWeight: '600',
        marginLeft: 10,
    },
    formInput: {
        padding: 12,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        fontSize: 16,
    },
    loginButton: {
        padding: 10,
        backgroundColor: '#4a90e2',
        color: '#fff',
        borderRadius: 20,
        fontSize: 20,
        fontWeight: 'bold',
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 45,
        marginTop: 6,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    tNavigateLink: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    oNavigateLink: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
    },
    linkText: {
        color: 'gray',
        fontSize: 14,
        margin: '2%'
    },
    error: {
        color: 'red',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10,
    },
    success: {
        color: 'blue',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10,
    }
});

export default styles;