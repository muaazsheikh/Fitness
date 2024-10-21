import React from "react";
import { View, Text } from "react-native";
import styles from "./Style";
const Seperator = ({ title, subTitle }) => {
  return (
    <View style={styles.seperatorContainer}>
      <View style={styles.sepView}></View>
      <Text style={styles.sepText}>{title}</Text>
      <Text style={styles.sepText}>{subTitle}</Text>
      <View style={styles.sepView}></View>
    </View>
  );
};

export default Seperator;
