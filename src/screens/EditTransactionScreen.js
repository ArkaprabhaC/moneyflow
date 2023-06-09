import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createTransactionSaveDate } from '../utils/utils';
import { modifyTransactionById } from '../reducers/transactionsSlice';
import { useDispatch } from 'react-redux';
import { formatCurrency } from 'react-native-format-currency';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const EditTransactionScreen = ({ route }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { editAmount, editDescription, editId } = route.params
    const [amount, setAmount] = useState(Math.abs(editAmount));
    const [textBoxDesc, setTextBoxDesc] = useState(editDescription);
    const [selectedTransactionType, setSelectedTransactionType] = useState("expense");

    const [_, amountMaskedWithoutSymbol, symbol] =
        formatCurrency({ amount: amount, code: "INR" });

    const handleAmountOnChange = (value) => {
        setAmount(value.replace(/[a-zA-Z,-\s]/g, '').replace(/\b0+/g, ''))
    }

    const createEditedTransactionItem = () => {
        let amountString = amountMaskedWithoutSymbol.replace(/,/g, '')
        if(selectedTransactionType === "expense") {
            amountString = "-" + amountString;
        }
        return {
            "id": editId,
            "amount": parseFloat(amountString),
            "description": textBoxDesc,
            "transactionType": selectedTransactionType,
            "date": createTransactionSaveDate(),
        }
    }

    const handleEditTransaction = async (e) => {
        const editedItem = createEditedTransactionItem();
        try {
            dispatch(modifyTransactionById({itemId: editId, editedItem: editedItem}));
            navigation.goBack();
        } catch (err) {
            console.error(err);
        }
    }

    const checkMandatoryFieldsEmpty = () => {
        return amount === '' || textBoxDesc === '';
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.amount_textbox_container}>
                    <Text style={{ fontSize: 25 }}> {symbol} </Text>
                    <TextInput
                        style={styles.amount_textbox}
                        keyboardType='numeric'
                        onChangeText={handleAmountOnChange}
                        placeholder='0'
                        value={amountMaskedWithoutSymbol}
                    />
                </View>
                <TextInput
                    style={styles.description_textbox}
                    placeholder="Add a Note"
                    maxLength={25}
                    onChangeText={(e) => setTextBoxDesc(e)}
                    value={textBoxDesc}
                />
                <View style={{ margin: 10 }}>
                    <Picker
                        mode='dropdown'
                        style={styles.transaction_type_dropdown}
                        selectedValue={selectedTransactionType}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedTransactionType(itemValue)
                        }
                    >
                        <Picker.Item label="Expense" value="expense" />
                        <Picker.Item label="Income" value="income" />
                    </Picker>
                </View>

            </View>
            <View style={styles.save_btn_container}>
                <TouchableOpacity
                    onPress={handleEditTransaction}
                    style={checkMandatoryFieldsEmpty() ? styles.save_btn_disabled : styles.save_btn}
                    disabled={checkMandatoryFieldsEmpty()}>
                    <Text style={styles.save_btn_text}>Save</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    amount_textbox_container: {
        flexDirection: "row",
        alignItems: 'center',
        marginRight: 30
    },
    amount_textbox: {
        fontSize: 45,
        borderRadius: 5,
        alignItems: 'stretch'
    },
    transaction_type_dropdown: {
        width: 300,
        backgroundColor: "#fff"
    },
    container: {
        marginVertical: 75,
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    description_textbox: {
        padding: 15,
        fontSize: 15,
        width: 300,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    save_btn_container: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center'
    },
    save_btn: {
        backgroundColor: '#fff',
        width: 300,
        padding: 10,
        elevation: 8,
        borderRadius: 10
    },
    save_btn_disabled: {
        backgroundColor: '#F0F0F0',
        width: 300,
        padding: 10,
        elevation: 8,
        borderRadius: 10,
    },
    save_btn_text: {
        fontSize: 20,
        textAlign: 'center'
    }
});

export default EditTransactionScreen;