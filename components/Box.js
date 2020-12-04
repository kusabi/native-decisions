import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';

import styles from '../styles';

const Box = ({title, style, children}) => (
    <View style={styles.box}>
        <Text style={styles.boxTitle}>{title}</Text>
        <View style={style}>
            {children}
        </View>
    </View>
);

export default Box;