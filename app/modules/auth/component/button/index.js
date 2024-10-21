import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./Style";
const CustomButton = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.signInButtonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.signInButtonTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
