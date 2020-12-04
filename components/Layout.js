import React from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';

const Layout = ({children}) => (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
            <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
                {children}
            </View>
        </ScrollView>
    </SafeAreaView>
);

export default Layout;