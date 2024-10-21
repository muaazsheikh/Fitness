import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import styles from "./Style";
import { images, icons } from "../../../home/constant";

const DietHeader = ({ value, onPress, visible, onShareChange }) => {
  const [image, setImage] = useState(icons.snack_icon);
  const [lunch, setLunch] = useState("All");
  const [show, setShow] = useState(false);
  const [share, setShare] = useState(false);

  const handleOptionPress = (image, lunch) => {
    setImage(image);
    setLunch(lunch);
    setShow(false);
  };
  const handleSharePress = () => {
    setShare(!share);
    onShareChange(!share); // Calling the callback with the updated share status
  };

  const renderOption = (image, lunch) => (
    <TouchableOpacity
      onPress={() => handleOptionPress(image, lunch)}
      style={styles.headerOption}
    >
      <FastImage source={image} style={styles.breakIcon} />
      <Text style={styles.trainerText}>{lunch}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={[styles.headerClick, { width: scale(110), marginRight: 30 }]}
        >
          <FastImage source={image} style={styles.breakIcon} />
          <Text style={styles.trainerText}>{lunch}</Text>
          <FastImage source={icons.down_icon_fill} style={styles.dowIcon} />
        </TouchableOpacity>
      </View>

      {show && (
        <View style={styles.dietView}>
          {renderOption(icons.snack_icon, "All")}
          {renderOption(images.breakfast_color, "Breakfast")}
          {renderOption(icons.lunch_icon, "Lunch")}
          {renderOption(icons.dinner_icon, "Dinner")}
          {renderOption(icons.snack_icon, "Snacks")}
        </View>
      )}
    </View>
  );
};

export default DietHeader;
