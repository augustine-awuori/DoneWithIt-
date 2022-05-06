import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import AccountNavigator from './AccountNavigator'
import FeedNavigator from './FeedNavigator'
import ListingEditScreen from '../screens/ListingEditScreen'
import navigation from './rootNavigation';
import NewListingButton from './NewListingButton';
import routes from './routes'
import useNotifications from '../hooks/useNotifications'

const Tab = createBottomTabNavigator()

export default AppNavigator = () => {
    useNotifications(navigation.navigate);

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