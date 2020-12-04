import React from 'react';
import {Text} from 'react-native';

import Layout from "../components/Layout";

class About extends React.Component {
    render() {
        return (
            <Layout>
                <Text>Development began on 2nd December 2020.</Text>
                <Text>It is built with react-native.</Text>
            </Layout>
        );
    }
}

export default About;