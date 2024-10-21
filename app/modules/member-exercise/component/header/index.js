import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { COLORS, images } from "../../../home/constant";

const MemberHeader = ({ text, imageUrl, onPress, type, buttonText }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{text}</Text>

      {type === "body" ? (
        <TouchableOpacity style={styles.writeTouchable} onPress={onPress}>
          <Text style={styles.touchableText}>{buttonText}</Text>
        </TouchableOpacity>
      ) : // <TouchableOpacity onPress={onPress} style={styles.headerClick}>
      //   <FastImage source={images.calendar_color} style={styles.smallIcon} />
      //   <Text style={styles.textCalendar}>20.11</Text>
      // </TouchableOpacity>
      null}
    </View>
  );
};

export default MemberHeader;
