import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountScreen from '../screens/AccountScreen';
import FeedNavigator from './FeedNavigator';
import ListingEditScreen from '../screens/ListingEditScreen';

const Tab = createBottomTabNavigator();

export default AppNavigator = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Feed" component={FeedNavigator} />
        <Tab.Screen name="ListingEdit" component={ListingEditScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
);