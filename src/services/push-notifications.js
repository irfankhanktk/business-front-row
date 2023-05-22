import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
}

export async function getFcmToken() {
    let token = null;
    if (Platform.OS === 'android') {
        token = await messaging().getToken();
    }

    if (Platform.OS === 'ios') {
        const authorizationStatus = await messaging().requestPermission();
        if (
            authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
            token = await messaging().getToken();
        }
    }

    return token;
}
