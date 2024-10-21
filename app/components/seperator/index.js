import React from "react";
import { View, Text } from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
const Seperator = ({ title, subTitle, imageUrl, dimesion }) => {
  return (
    <View style={styles.seperatorContainer}>
      <View style={styles.sepView}>
        <FastImage
          source={imageUrl}
          style={[styles.sepImg, { width: scale(dimesion) }]}
        />
      </View>
      <View>
        <Text style={styles.sepText}>{title}</Text>
        <Text style={styles.sepSubText}>{subTitle}</Text>
        <View style={styles.sepView}></View>
      </View>
    </View>
  );
};

export default Seperator;
