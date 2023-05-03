import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import { Picker } from '@react-native-picker/picker';
import { formatCurrency } from "react-native-format-currency";
import { useDispatch } from 'react-redux';
import { addTransaction } from '../reducers/transactionsSlice';
import { createTransactionSaveDate } from '../utils/utils'

const AddTransactionScreen = ({route}) => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const [textBoxDesc, setTextBoxDesc] = useState('');
  const [selectedTransactionType, setSelectedTransactionType] = useState("expense");

  
 
  const [_, amountMaskedWithoutSymbol, symbol] =
    formatCurrency({ amount: amount, code: "INR" });

  const handleAmountOnChange = (value) => {
    setAmount(value.replace(/[a-zA-Z,-\s]/g, '').replace(/\b0+/g, ''))
  }

  const createTransactionItem = () => {
    let amountString = amountMaskedWithoutSymbol.replace(/,/g, '')
    if(selectedTransactionType === "expense") {
      amountString = "-" + amountString;
    }
    return {
      "id": nanoid(),
      "amount": parseFloat(amountString),
      "description": textBoxDesc,
      "transactionType": selectedTransactionType,
      "date": createTransactionSaveDate(),
    }
  }

  const handleSaveTransaction = async (e) => {
    const transactionItem = createTransactionItem();

    try {
      dispatch(addTransaction(transactionItem));
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
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
        <TouchableOpacity style={styles.save_btn} onPress={handleSaveTransaction}>
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
  save_btn_text: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default AddTransactionScreen