import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./Style";
import { COLORS, images } from "../../../home/constant";

const TextInputWithIcon = ({
  iconSource,
  placeholder,
  onChangeText,
  completed,
  onChangeValue,
  secureTextEntry,
  showPassword,
  togglePasswordVisibility,
  name,
}) => {
  return (
    <View style={[styles.inputContainer, !completed && styles.incomplete]}>
      {!name && iconSource ? (
        <FastImage source={iconSource} style={styles.user_icon} />
      ) : (
        <FastImage source={iconSource} style={styles.icon} />
      )}
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onChangeText={(text) => {
          onChangeText(text);
          // Call the onChangeValue function provided by the parent component
        }}
        placeholderTextColor={COLORS.placeholderColor}
        style={[styles.input, !completed && styles.incompleteInput]}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <FastImage
            source={showPassword ? images.eye_open : images.eye_close}
            style={styles.eye_icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextInputWithIcon;
