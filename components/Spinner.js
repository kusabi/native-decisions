import React from 'react';
import {ActivityIndicator} from 'react-native';

import styles from '../styles';

const Spinner = ({style}) => (
    <ActivityIndicator animating={true} style={[styles.loaderDefault, style]} color={styles.loaderDefault.color} size="small"/>
);

export default Spinner;