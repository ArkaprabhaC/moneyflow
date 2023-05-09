import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { formatCurrency } from "react-native-format-currency";
import { ArrowDownLeftIcon, ArrowUpRightIcon, PencilSquareIcon, TrashIcon } from 'react-native-heroicons/solid';
import { useDispatch } from 'react-redux';
import { deleteTransactionById } from '../reducers/transactionsSlice';
import { useNavigation } from '@react-navigation/native';

const TransactionItemCard = ({ id, description, date, amount, transactionType }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [_, amountMaskedWithoutSymbol, symbol] =
    formatCurrency({ amount: amount, code: "INR" });

  const [toggleOpen, setToggleOpen] = useState(false);

  const deleteItem = async () => {
    try {
        dispatch(deleteTransactionById(id));
    } catch (err) {
      console.error(err);
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
        <View style={{"flexDirection":"row", "alignItems": "center"}}>
    
          <Text style={styles.amount}>{symbol} {amountMaskedWithoutSymbol}</Text>
          { transactionType === "income" ? (
            <ArrowUpRightIcon color={"green"} size={20} style={{"marginHorizontal": 10}}/>
          ): (
            <ArrowDownLeftIcon color={"red"} size={20} style={{"marginHorizontal": 10}}/>
          )}
          
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

export default TransactionItemCard;