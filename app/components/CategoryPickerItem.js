import React from 'react';
import { View, StyleSheet } from 'react-native';

import Icon from './Icon';
import Text from './AppText';

export default function CategoryPickerItem({ item, onPress }) {
    return (
        <View style={styles.container}>
            <Icon backgroundColor={item.backgroundColor} name={item.icon} size={80} />
            <Text style={styles.label}>{item.label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15,
        width: '33%'
    },
    label: {
        marginTop: 5,
        textAlign: 'center'
    }
});