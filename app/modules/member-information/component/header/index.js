import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";

const TrainerHeader = ({ text, imageUrl, onPress }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <FastImage source={imageUrl} style={styles.headerImage} />
      </TouchableOpacity>
    </View>
  );
};

export default TrainerHeader;
