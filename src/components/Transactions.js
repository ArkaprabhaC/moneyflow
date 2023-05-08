import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import TransactionItem from './TransactionItem';
import { useSelector } from 'react-redux';
import { selectAllTransactions } from '../reducers/transactionsSlice';


const Transactions = () => {
  
  const transactions = useSelector(selectAllTransactions);

  return (
    <ScrollView contentContainerStyle={{
      padding: 10
    }}>
      <View>
        { transactions.length != 0 ?
          transactions.map(item => (
            <TransactionItem
              key={Math.random()}
              id={item.id}
              description={item.description}
              date={item.date}
              amount={item.amount}
              transactionType={item.transactionType}
            />
          )) : (
            <View style={{alignItems: 'center'}}>
              <Text>Sorry, no items present for this month!</Text>
            </View>
          )
        }
      </View>
    </ScrollView>
  )
}

export default Transactions