import React from "react";
import { View, Text } from "react-native";

import SignUpScreen from "./SignUpScreen";

import styles from "./Style";

const SignUpContainer = () => {
  return (
    <View style={styles.container}>
      <SignUpScreen />
    </View>
  );
};

export default SignUpContainer;
