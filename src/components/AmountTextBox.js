import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'

const AmountTextBox = () => {

    const [amount, setAmount] = useState('');

    const handleOnChange = (value) => {
        setAmount(value.replace(/[a-zA-Z,-\s]/g, '').replace(/\b0+/g, ''))
    }

    return (
        <View style={styles.amount_textbox_container}>
            <Text style={{ fontSize: 25 }}> Rs </Text>
            <TextInput
                style={styles.amount_textbox}
                keyboardType='numeric'
                onChangeText={handleOnChange}
                maxLength={8}
                placeholder='0'
                value={amount}
            />
        </View>
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
});

export default AmountTextBox;