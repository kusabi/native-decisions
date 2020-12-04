import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from "./redux/store";

import Dashboard from "./views/Dashboard";
import Decisions from "./views/Decisions";
import About from "./views/About";


const Stack = createStackNavigator();
const { store, persistor } = configureStore();

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Dashboard" component={Dashboard} options={{title: 'Dashboard'}}/>
                        <Stack.Screen name="Decisions" component={Decisions} options={{title: 'Decisions'}}/>
                        <Stack.Screen name="About" component={About}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

export default App;