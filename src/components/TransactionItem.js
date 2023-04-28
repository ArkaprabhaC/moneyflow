import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { formatCurrency } from "react-native-format-currency";
import { PencilSquareIcon, TrashIcon } from 'react-native-heroicons/solid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataStoreKey } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { modifyTransactions } from '../reducers/transactionsSlice';
import { useNavigation } from '@react-navigation/native';

const TransactionItem = ({ id, description, date, amount }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [_, amountMaskedWithoutSymbol, symbol] =
    formatCurrency({ amount: amount, code: "INR" });

  const [toggleOpen, setToggleOpen] = useState(false);

  const deleteItem = async () => {
    try {
      const current_month_year = getDataStoreKey();
      const transactions = JSON.parse(await AsyncStorage.getItem(current_month_year));
      let transactionItemIndex = -1
      transactionItemIndex = transactions.findIndex((transaction) => transaction.id === id);
      if (transactionItemIndex !== -1) {
        transactions.splice(transactionItemIndex, 1);
        dispatch(modifyTransactions(transactions));
        await AsyncStorage.setItem(current_month_year, JSON.stringify(transactions));
      }
    } catch (err) {
      console.err(err);
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => setToggleOpen(prevToggleOpen => !prevToggleOpen)}>
      <View style={{ "flexDirection": "row", "alignItems": "center" }}>
        <View style={{ flex: 1 }}>
          <View style={styles.item_details}>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.amount}>{symbol} {amountMaskedWithoutSymbol}</Text>
        </View>
      </View>
      {toggleOpen ? (
        <View style={{ "flexDirection": "row", "justifyContent": "space-evenly", "textAlign": "center", "marginTop": 25 }}>
          <TouchableOpacity onPress={() => navigation.navigate("EditTransactionScreen", {
            "editId": id,
            "editDescription": description,
            "editAmount": amount
          }
          )}>
            <PencilSquareIcon size={25} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteItem}>
            <TrashIcon color="red" size={25} />
          </TouchableOpacity>
        </View>
      ) : (<></>)}

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 15,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 8
  },
  description: {
    fontSize: 16,
    fontWeight: "700",
    paddingVertical: 5
  },
  amount: {
    fontSize: 18
  }
})

export default TransactionItem