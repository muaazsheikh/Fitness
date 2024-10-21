// CustomSeekBar.js

import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import Slider from "react-native-slider";
import { COLORS, FONTS, icons, images } from "../../constant";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";

const CustomSeekBar = ({
  value,
  onValueChange,
  imgUrl,
  type,
  progress,
  maximumValue,
  onChangeMaximumValue,
}) => {
  const [sliderValue, setSliderValue] = useState(value);
  const thumbStyle = {
    left: `${(value / 100) * 1}%`,
    marginLeft: type === "KG" ? -15 : 0,
    width: 30,
    height: 40,
  };

  const handleIncrement = () => {
    onChangeMaximumValue(maximumValue + 10);
  };

  const handleDecrement = () => {
    const newValue = Math.max(0, maximumValue - 10);
    if (maximumValue < value + 10) return;
    onChangeMaximumValue(newValue);
  };

  const checkType = () => {
    if (type === "Reps") {
      return 20;
    } else if (type === "KG") {
      return 150;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Slider
          // style={styles.slider}
          value={value}
          onValueChange={(val) => {
            setSliderValue(val);
            onValueChange(val);
          }}
          minimumValue={0}
          maximumValue={maximumValue}
          step={1}
          minimumTrackTintColor={COLORS.themGreen}
          thumbTintColor="transparent"
          thumbImage={imgUrl}
          thumbStyle={[thumbStyle]}
          trackStyle={{ height: 10, borderRadius: 10 }}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.initialText}>0 {type}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <FastImage source={icons.up_icon} style={{ width: 8, height: 4 }} />
        </TouchableOpacity>
        <Text style={styles.valueText}>
          {maximumValue} {type}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <FastImage source={icons.down_icon} style={{ width: 8, height: 4 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
    width: scale(330),
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  slider: {
    width: "80%",
    zIndex: 1,
  },
  buttonContainer: {
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: COLORS.calendarColor,
    width: 50,
    alignItems: "center",
    borderRadius: 15,
    marginLeft: 10,
  },
  button: {
    width: 35,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    fontSize: 13,
    textAlign: "center",
  },
  labelContainer: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },
  initialText: {
    color: COLORS.borderColor,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    fontSize: 10,
    zIndex: 0,
  },
});

export default CustomSeekBar;
