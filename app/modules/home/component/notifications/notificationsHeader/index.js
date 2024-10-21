import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { images } from "../../../constant";
import { icons } from "../../../../home-member/constant";

const NotificationsHeader = ({ navigation, onPressChat,countData }) => {
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
          >
            {countData?.count[0]?.unreadMessageCount>0 && (
            <TouchableOpacity style={[styles.notiView]}>
              <Text style={[styles.countText]}>.</Text>
            </TouchableOpacity>
          )}
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationsHeader;
