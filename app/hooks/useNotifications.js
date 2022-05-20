import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

import expoPushTokensApi from '../api/expoPushTokens';

export default useNotifications = (notificationListener) => {
    useEffect(() => {
        registerForPushNotifications();

        if (notificationListener)
            Notifications.addNotificationReceivedListener(notificationListener);
    }, []);

    const registerForPushNotifications = async () => {
        const { granted } = await Notifications.requestPermissionsAsync();
        if (!granted) return;

        try {
            const token = await Notifications.getExpoPushTokenAsync();
            expoPushTokensApi.register(token);
        } catch (error) {
            console.log("Erorr getting the push token", error);
        }
    };

};