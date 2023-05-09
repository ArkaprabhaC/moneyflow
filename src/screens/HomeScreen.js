import {  StyleSheet, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import Transactions from '../components/Transactions';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddTransactionButton from '../components/AddTransactionButton';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from "react-native-format-currency";
import { useSelector } from 'react-redux';
import { selectTotalAmount } from '../reducers/transactionsSlice';
import HomeScreenAmountCard from '../components/HomeScreenAmountCard';

const HomeScreen = () => {
    const navigation = useNavigation();
    const totalAmount = useSelector(selectTotalAmount);
    const [_, valueWithoutSymbol, symbol] =
      formatCurrency({ amount: totalAmount.toFixed(2), code: "INR" });
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);


    const data = [
        {
            "display_text": "This month's cash in pocket",
            "amount": valueWithoutSymbol,
            "symbol": symbol
        },
        {
            "display_text": "This month's expenses",
            "amount": valueWithoutSymbol,
            "symbol": symbol
        },
        {
            "display_text": "This month's income",
            "amount": valueWithoutSymbol,
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