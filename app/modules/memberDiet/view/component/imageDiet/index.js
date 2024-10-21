// CustomSeekBar.js

import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import Slider from "react-native-slider";
import { COLORS, FONTS, icons, images } from "../../../../home/constant";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import styles from "./Style";

const DietImage = ({ value, onValueChange, imgUrl, type, progress }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          width: scale(330),
          height: scale(380),
          backgroundColor: COLORS.calendarColor,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
          <View style={styles.headerClick}>
            <FastImage
              source={images.calendar_color}
              style={styles.smallIcon}
            />
            <Text style={styles.textCalendar}>20.11</Text>
          </View>
          <View>
            <View
              onPress={() => setShow(true)}
              style={[
                styles.headerClick,
                { width: scale(110), marginLeft: 10 },
              ]}
            >
              <FastImage
                source={images.breakfast_color}
                style={styles.breakIcon}
              />
              <Text style={styles.trainerText}>Breakfast</Text>
            </View>
          </View>
        </View>
        <FastImage source={images.diet_img} style={styles.dietImg} />
      </View>
    </View>
  );
};

export default DietImage;
