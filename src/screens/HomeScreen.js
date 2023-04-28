import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import Transactions from '../components/Transactions';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddTransactionButton from '../components/AddTransactionButton';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from "react-native-format-currency";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [_, valueWithoutSymbol, symbol] =
      formatCurrency({ amount: 1234.56, code: "INR" });

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);

    

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.spend_display}>
                <Text style={styles.months_spend_text}>This month's spend</Text>
                <View style={styles.spend_display_container}>
                    <Text style={styles.currency_symbol}>{symbol}</Text>
                    <Text style={styles.spend_display_amount}>
                     { valueWithoutSymbol }
                    </Text>
                </View>
            </View>

            <Transactions />
            <AddTransactionButton />
       
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    spend_display: {
        padding: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    spend_display_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    months_spend_text: {
        fontSize: 20
    },
    currency_symbol: {
        fontSize: 25,
        margin: 10
    },
    spend_display_amount: {
        fontSize: 35
    }
});


export default HomeScreen;