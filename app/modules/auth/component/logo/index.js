import React from "react";
import { View, Text, Image } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./Style";
const LogoComp = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.logoImg}
        source={require("../../../../assets/images/Logo.png")}
      />

      <Text style={[styles.titleTextStyle]}>{title}</Text>
    </View>
  );
};

export default LogoComp;
