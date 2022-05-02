import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ListingsScreen from '../screens/ListingsScreen';

const Stack = createNativeStackNavigator();

export default FeedNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Listings' component={ListingsScreen} />
        <Stack.Screen name='ListingDetails' component={ListingDetailsScreen} />
    </Stack.Navigator>
);