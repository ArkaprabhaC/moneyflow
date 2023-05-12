import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;

const HomeScreenAmountCard = ({display_text, amount, symbol}) => {
    return (
        <View style={styles.spend_display}>
            <Text style={styles.months_spend_text}>{display_text}</Text>
            <View style={styles.spend_display_container}>
                <Text style={styles.currency_symbol}>{symbol}</Text>
                <Text style={styles.spend_display_amount}>
                    { amount }
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    spend_display: {
        width: windowWidth - 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderRadius: 30,
        backgroundColor: "#fff"
    },
    spend_display_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 30
    },
    months_spend_text: {
        fontSize: 18
    },
    currency_symbol: {
        fontSize: 25,
        margin: 10
    },
    spend_display_amount: {
        fontSize: 35
    }
});

export default HomeScreenAmountCard;