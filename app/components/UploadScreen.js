import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';

import Text from '../components/AppText';

export default function UploadScreen({ progress = 0, visible }) {
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                <Text></Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
});