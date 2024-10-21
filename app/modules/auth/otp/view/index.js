import React from "react";
import { View } from "react-native";
import OtpScreen from "./OtpScreen";
import styles from "./Style";

const ForgotContainer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <OtpScreen navigation={navigation} />
    </View>
  );
};

export default ForgotContainer;
