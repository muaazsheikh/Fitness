import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { NavigationStrings } from "../../../../constants";

const TrainerHeader = ({ text, imageUrl, Notify, navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{text}</Text>
      {Notify ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(NavigationStrings.NOTIFICATION_STATUS_SCREEN);
          }}
        >
          <FastImage source={imageUrl} style={styles.headerImage} />
        </TouchableOpacity>
      ) : (
        <FastImage source={imageUrl} style={styles.headerImage} />
      )}
    </View>
  );
};

export default TrainerHeader;
