import React from 'react';
import {View} from 'react-native';
import {Button, Layout, QuestionManager} from "../components";

class Dashboard extends React.Component {

    render() {
        return (
            <Layout>
                <View>
                    <QuestionManager/>
                </View>
            </Layout>
        );
    }
}

export default Dashboard;