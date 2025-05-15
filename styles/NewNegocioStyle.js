import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
        },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
        },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
        },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
});

export default styles;
