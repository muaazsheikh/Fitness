import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import styles from "./Style";
import { icons, images } from "../../../constant";
import FastImage from "react-native-fast-image";

const NotificationsHeader = ({ navigation, onPressChat }) => {
  return (
    <View style={styles.headerView}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FastImage source={images.left_arrow} style={styles.drowerIcon} />
        </TouchableOpacity>
        <Text style={styles.headingText}>Notifications</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => onPressChat()}>
          <ImageBackground
            source={icons.chat_icon}
            style={styles.imageBack}
          ></ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationsHeader;
