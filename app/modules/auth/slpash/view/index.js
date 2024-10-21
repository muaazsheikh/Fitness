import React from "react";
import { View } from "react-native";

import SplashScreen from "./SplashScreen";

import styles from "./Style";

const SplashContainer = () => {
  return (
    <View style={styles.container}>
      <SplashScreen />
    </View>
  );
};

export default SplashContainer;
