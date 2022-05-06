import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import AccountNavigator from './AccountNavigator'
import expoPushTokensApi from '../api/expoPushTokens';
import FeedNavigator from './FeedNavigator'
import ListingEditScreen from '../screens/ListingEditScreen'
import navigation from './rootNavigation';
import NewListingButton from './NewListingButton';
import routes from './routes'

const Tab = createBottomTabNavigator()

export default AppNavigator = () => {
    useEffect(() => {
        registerForPushNotifications();

        Notifications.addNotificationReceivedListener(notification => {
            navigation.navigate('Account');
        });
    }, []);

    const registerForPushNotifications = async () => {
        const { granted } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (!granted) return;

        try {
            const token = await Notifications.getExpoPushTokenAsync();
            expoPushTokensApi.register(token);
        } catch (error) {
            console.log("Erorr getting the push token", error);
        }
    };

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name={routes.FEED}
                component={FeedNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name={routes.LISTING_EDIT}
                component={ListingEditScreen}
                options={({ navigation }) => ({
                    tabBarButton: () => (
                        <NewListingButton
                            onPress={() => navigation.navigate(routes.LISTING_EDIT)}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name={routes.ACCOUNT_NAVIGATOR}
                component={AccountNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account" color={color} size={size} />
                    ),
                    title: 'Account'
                }}
            />
        </Tab.Navigator>
    )
}