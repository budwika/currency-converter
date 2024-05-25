import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { styles } from "./style";
import { fetchCurrencyList, fetchExchangeRates } from "../api/helper";

const CurrencyConveter: React.FC = () => {
    const [amount, setAmount] = useState<string>("");
    const [fromCurrency, setFromCurrency] = useState<string>("USD");
    const [toCurrency, setToCurrency] = useState<string>("EUR");
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [convertedAmount, setConvertedAmount] = useState<string | null>(null);


    const convertCurrency = useCallback(async () => {
        if (!amount) {
            setConvertedAmount(null);
            return;
        }
        try {
            const exchangeRates = await fetchExchangeRates(fromCurrency);
            const conversionRate = exchangeRates[toCurrency];

            if (conversionRate) {
                const result = parseFloat(amount) * conversionRate;
                setConvertedAmount(result.toFixed(2));
            } else {
                setConvertedAmount('Invalid Currency');
            }
        } catch (error) {
            console.error("Error converting currency: ", error);
            setConvertedAmount('Error');
        }
    }, [amount, fromCurrency, toCurrency]);

    useEffect(() => {
        const getCurrencies = async () => {
            try {
                const currencyList = await fetchCurrencyList();
                setCurrencies(currencyList);
            } catch (error) {
                console.error("Error fetching currency data: ", error);
            }
        };

        getCurrencies();
    }, []);

    useEffect(() => {
        convertCurrency();
    }, [convertCurrency]);

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Text style={styles.header}>Currency Converter</Text>
                <Text style={styles.label}>Amount:</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={(text) => setAmount(text)}
                        keyboardType="numeric"
                        placeholder="Enter amount"
                        placeholderTextColor="#999"
                    />
                </View>
                <Text style={styles.label}>From Currency:</Text>
                <View style={styles.inputContainer}>
                    <ModalDropdown
                        style={styles.dropdown}
                        options={currencies}
                        defaultValue={fromCurrency}
                        onSelect={(index, value) => setFromCurrency(value as string)}
                    />
                </View>
                <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
                    <Text style={styles.swapButtonText}>&#8646;</Text>
                </TouchableOpacity>
                <Text style={styles.label}>To Currency:</Text>
                <View style={styles.inputContainer}>
                    <ModalDropdown
                        style={styles.dropdown}
                        options={currencies}
                        defaultValue={toCurrency}
                        onSelect={(index, value) => setToCurrency(value as string)}
                    />
                </View>

                <TouchableOpacity style={styles.convertButton} onPress={convertCurrency}>
                    <Text style={styles.convertButtonText}>Convert</Text>
                </TouchableOpacity>

                {convertedAmount !== null && (
                    <Text style={styles.result}>
                        {amount} {fromCurrency} is {convertedAmount} {toCurrency}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default CurrencyConveter;
