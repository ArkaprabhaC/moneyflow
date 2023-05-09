import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { PlusIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const windowWidth = Dimensions.get('window').width;

const AddTransactionButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.add_transaction_btn} onPress={() => navigation.navigate('AddTransactionScreen')}>
            <PlusIcon size={30} color="black" style={{ alignSelf: 'center' }} />
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    add_transaction_btn: {
        width: 65,
        height: 65,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10,
        borderRadius: 100,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 10,
        position: 'relative',
        bottom: 90,
        left: windowWidth/2 - 32.5
    }
})
export default AddTransactionButton;