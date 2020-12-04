import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

const styles = StyleSheet.create({
    button: {
        minWidth: 200,
        color: "#ffffff",
        backgroundColor: "#6c757d",
        padding: 10,
        textAlign: 'center'
    },
});

const Button = ({style, onClick, title}) => (
    <TouchableHighlight onPress={onClick} style={styles.buttonContainer}>
        <Text style={[styles.button, style]}>{title}</Text>
    </TouchableHighlight>
);

export default Button;