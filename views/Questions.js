import React from 'react';
import {Text} from 'react-native';

import Button from '../components/Button';
import ButtonPrimary from '../components/ButtonPrimary';
import Layout from "../components/Layout";

class Decisions extends React.Component {
    render() {
        return (
            <Layout>
                <Text>How many choices are there?</Text>
                <ButtonPrimary title="Classes" onPress={() => this.props.navigation.navigate('Classes')}/>
            </Layout>
        );
    }
}

export default Decisions;