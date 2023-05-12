import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import React from 'react'
import { PlusIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { TrashIcon } from 'react-native-heroicons/outline';
import { useDispatch } from 'react-redux';
import { clearTransactions } from '../reducers/transactionsSlice';

const ActionButtonsBar = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();


    const showClearDataConfirmDialog = () => {
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to remove all the transactions listed till date?",
            [{
                text: "Confirmed",
                onPress: () => dispatch(clearTransactions())
            }, {
                text: "Take me back!",
            }]
        );
    };

    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.add_transaction_btn}
                onPress={() => navigation.navigate('AddTransactionScreen')}>
                <PlusIcon size={30} color="black" style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.add_transaction_btn}
                onPress={() => showClearDataConfirmDialog()}>
                <TrashIcon size={30} color="black" style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 300,
        height: 300,
        backgroundColor: "red",
        marginBottom: 30,
    },
    add_transaction_btn: {
        width: 65,
        height: 65,
        backgroundColor: "#fff",
        justifyContent: 'center',
        padding: 10,
        borderRadius: 100,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 10,
        position: 'relative',
        bottom: 30,
    },
    screen: {
        height: 55,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
})
export default ActionButtonsBar;