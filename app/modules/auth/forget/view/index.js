import React from "react";
import { View } from "react-native";
import ForgotScreen from "./ForgotScreen";
import styles from "./Style";

const ForgotContainer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ForgotScreen navigation={navigation} />
    </View>
  );
};

export default ForgotContainer;
