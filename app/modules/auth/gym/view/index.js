import React from "react";
import { View } from "react-native";
import GymScreen from "./GymScreen";
import styles from "./Style";

const GymContainer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <GymScreen navigation={navigation} />
    </View>
  );
};

export default GymContainer;
