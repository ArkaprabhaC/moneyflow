import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { PlusIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const AddTransactionButton = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.add_transaction_btn} onPress={() => navigation.navigate('AddTransactionScreen')}>
                <PlusIcon size={30} color="black" style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
        </View>

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


    },
    screen: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0


    }
})
export default AddTransactionButton;