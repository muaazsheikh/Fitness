import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { NavigationStrings } from "../../../../constants";

const TrainerHeader = ({ text, imageUrl,navigation,chat }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{text}</Text>
      <TouchableOpacity disabled={!chat} onPress={() => navigation.navigate(NavigationStrings.CHAT_LIST)}>

      <FastImage source={imageUrl} style={styles.headerImage} />
      </TouchableOpacity>
      
    </View>
  );
};

export default TrainerHeader;
