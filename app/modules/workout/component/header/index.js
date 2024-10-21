import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import styles from "./Style";
import { images, icons } from "../../../home/constant";
import { useDispatch } from "react-redux";
import { showDiet } from "../../../../redux/workoutSlice";

const DietHeader = ({ value, onPress, visible, onValueChange, date }) => {
  const [image, setImage] = useState(icons.all_icon);
  const [lunch, setLunch] = useState("All");
  const [show, setShow] = useState(false);
  const [share, setShare] = useState(false);
  const dispatch = useDispatch();

  const handleOptionPress = (image, lunch) => {
    setImage(image);
    setLunch(lunch);
    setShow(false);
    if (lunch === "Breakfast") {
      onValueChange("1");
    } else if (lunch === "Lunch") {
      onValueChange("2");
    } else if (lunch === "Dinner") {
      onValueChange("3");
    } else if (lunch === "Snacks") {
      onValueChange("4");
    } else if (lunch === "All") {
      onValueChange("5");
    }
    dispatch(showDiet(!show));
  };

  const handleSharePress = () => {
    setShare(!share);
    onShareChange(!share);
  };

  const renderOption = (image, lunch) => (
    <TouchableOpacity
      onPress={() => handleOptionPress(image, lunch)}
      style={styles.headerOption}
    >
      <Image source={image} style={styles.breakIcon} />
      <Text style={styles.trainerText}>{lunch}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => {
            setShow(!show), dispatch(showDiet(!show));
          }}
          style={[styles.headerClick, { width: scale(110), marginRight: 30 }]}
        >
          <Image source={image} style={styles.breakIcon} />
          <Text style={styles.trainerText}>{lunch}</Text>
          <FastImage source={icons.down_icon_fill} style={styles.dowIcon} />
        </TouchableOpacity>
      </View>

      {show && (
        <View style={styles.dietView}>
          {renderOption(icons.all_icon, "All")}
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
