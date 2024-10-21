import React from 'react';
import { View } from 'react-native';

import HomeScreen from './HomeScreen';

import styles from './Style';

const HomeContainer = () => {
    return (
        <View style={styles.container}>
            <HomeScreen />
        </View>
    );
};

export default HomeContainer;