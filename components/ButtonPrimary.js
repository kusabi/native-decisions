import React from 'react';
import Button from "./Button";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    button: {
        color: "#ffffff",
        backgroundColor: "#007bff",
    },
});

const ButtonPrimary = ({ onClick, title }) => (
    <Button style={styles.button} title={title} onClick={onClick}/>
);

export default ButtonPrimary;