import React, { useEffect } from 'react';
import { Alert, Image, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';

export default function ImageInput({ imageUri, onChangeImage }) {
    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) alert("Permission needed to access image library");
    };

    const handlePress = async () => {
        if (!imageUri) selectImage();
        else Alert.prompt("Delete", "Are you sure you want to delete this image?", [
            { text: 'Yes', onPress: () => onChangeImage(null) },
            { text: 'No' }
        ])
    };

    const selectImage = async () => {
        try {
            const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: .5,
            });

            if (!cancelled) onChangeImage(uri);
        } catch (error) {
            console.log("Error reading an image.", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                {!imageUri ? <Icon name='camera' size={40} color={colors.medium} /> : <Image source={{ uri: imageUri }} style={styles.image} />}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.light,
        borderRadius: 15,
        height: 100,
        justifyContent: 'center',
        overflow: 'hidden',
        width: 100,
    },
    image: {
        height: '100%',
        width: '100%',
    }
});