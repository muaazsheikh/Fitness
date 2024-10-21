import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";

const TrainerHeader = ({ text, imageUrl }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{text}</Text>
      <FastImage source={imageUrl} style={styles.headerImage} />
    </View>
  );
};

export default TrainerHeader;
