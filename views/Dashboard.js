import React from 'react';
import {Text, View} from 'react-native';

import ButtonPrimary from '../components/ButtonPrimary';
import Layout from "../components/Layout";
import QuestionPicker from "../components/QuestionPicker";
import QuestionCreator from "../components/QuestionCreator";

class Dashboard extends React.Component {

    render() {
        return (
            <Layout>
                <View>
                    <QuestionPicker/>
                    <QuestionCreator/>
                </View>
            </Layout>
        );
    }
}

export default Dashboard;