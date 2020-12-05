import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    base: {
        flex:1,
        color: "#ffffff",
        backgroundColor: "#6c757d",
        padding: 10,
        marginBottom: 10,
        textAlign: 'center'
    },
    primary: {
        color: "#ffffff",
        backgroundColor: "#007bff",
    },
    success: {
        color: "#ffffff",
        backgroundColor: "#28a745",
    },
    danger: {
        color: "#ffffff",
        backgroundColor: "#dc3545",
    },
    warning: {
        color: "#343a40",
        backgroundColor: "#ffc107",
    },
    info: {
        color: "#ffffff",
        backgroundColor: "#17a2b8",
    }
});

class Button extends React.Component {

    static defaultProps = {
        title: 'Button',
        type: 'default',
        style: {},
        onClick: () => {}
    }

    getTypeStyle () {
        return styles.hasOwnProperty(this.props.type) ? styles[this.props.type] : {};
    }

    render() {
        return (
            <TouchableHighlight underlayColor='white' onPress={this.props.onClick} style={styles.wrapper}>
                <Text style={[styles.base, this.getTypeStyle(), this.props.style]}>{this.props.title}</Text>
            </TouchableHighlight>
        )
    }
}


export default Button;