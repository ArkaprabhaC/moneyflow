import {  StyleSheet, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import Transactions from '../components/Transactions';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddTransactionButton from '../components/AddTransactionButton';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from "react-native-format-currency";
import { useSelector } from 'react-redux';
import { selectCashInHandAmount, selectExpenseAmount, selectIncomeAmount } from '../reducers/transactionsSlice';
import HomeScreenAmountCard from '../components/HomeScreenAmountCard';

const HomeScreen = () => {
    const navigation = useNavigation();
    const cashInHand = useSelector(selectCashInHandAmount);
    const [_, cashInHandFormatted, symbol] =
      formatCurrency({ amount: cashInHand.toFixed(2), code: "INR" });

    const totalIncome = useSelector(selectIncomeAmount);
    const [_1, totalIncomeFormatted, symbol1] =
    formatCurrency({ amount: totalIncome.toFixed(2), code: "INR" });

    const totalExpense = useSelector(selectExpenseAmount);
    const [_2, totalExpenseFormatted, symbol2] =
      formatCurrency({ amount: totalExpense.toFixed(2), code: "INR" });

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);


    const data = [
        {
            "display_text": "This month's cash in pocket",
            "amount": cashInHandFormatted,
            "symbol": symbol
        },
        {
            "display_text": "This month's expenses",
            "amount": totalExpenseFormatted,
            "symbol": symbol
        },
        {
            "display_text": "This month's income",
            "amount": totalIncomeFormatted,
            "symbol": symbol
        }
    ]

    return (
        <SafeAreaView>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    height: 200,
                    marginTop: 30,
                }}
            >
                <HomeScreenAmountCard {...data[0]}/>
                <HomeScreenAmountCard {...data[1]}/>
                <HomeScreenAmountCard {...data[2]}/>    
            </ScrollView>

            <Transactions />
            <AddTransactionButton />
       
        </SafeAreaView>
        
    )
}


export default HomeScreen;