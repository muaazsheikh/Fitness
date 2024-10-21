// CustomSeekBar.js

import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import Slider from "react-native-slider";
import { COLORS, FONTS, icons, images } from "../../../home/constant";

import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";

const CustomSeekBar = ({
  value,
  onValueChange,
  imgUrl,
  type,
  progress,
  label,
}) => {
  const thumbStyle = {
    left: `${(value / 100) * 1}%`, // Adjust the multiplier as needed
    marginLeft: type === "KG" ? -15 : 0,
    width: 30,
    height: 40,
  };

  const handleIncrement = () => {
    if (type === "%") {
      onValueChange(value < 100 ? value + 10 : 100);
    } else {
      onValueChange(value + 10);
    }
  };

  const handleDecrement = () => {
    const newValue = Math.max(0, value - 10);
    onValueChange(newValue);
  };

  // const checkType =()=>{
  //   if(type==='Reps'){
  //     return 20
  //   }else if(type === 'KG'){
  //     return 150
  //   }
  // }

  return (
    <View style={styles.listView}>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Image
          source={imgUrl}
          style={{ width: 20, height: 20, resizeMode: "contain" }}
        />
        <Text style={styles.contentText}>{label}</Text>
      </View>
      <View style={styles.kgView}>
        <Text style={styles.kgText}>{value}</Text>
        <Text style={styles.kgSmallText}>{type}</Text>
      </View>
      <View style={styles.container}>
        <Slider
          style={styles.slider}
          value={value < 100 ? value : 100}
          onValueChange={onValueChange}
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor={COLORS.themGreen}
          thumbTintColor="transparent"
          thumbStyle={styles.buttonCircle}
          trackStyle={{ height: 10, borderRadius: 10 }}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.initialText}>0 {type}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleIncrement}>
            <FastImage source={icons.up_icon} style={{ width: 10, height: 6 }} />
          </TouchableOpacity>
          <Text style={styles.valueText}>
            {value} {type}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleDecrement}>
            <FastImage
              source={icons.down_icon}
              style={{ width: 10, height: 6 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
    width: "15%",
    marginTop: 10,
    backgroundColor: COLORS.calendarColor,
    alignItems: "center",
    borderRadius: 15,
    marginLeft: 10
  },
  button: {
    width: 50,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCircle: {
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: COLORS.white,
  },
  valueText: {
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    fontSize: 13,
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
  kgView: {
    width: 65,
    height: 50,
    backgroundColor: COLORS.gray1,
    borderRadius: 15,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    marginRight: 10,
    flexDirection: "row",
    gap: 1,
  },
  kgText: {
    fontSize: 18,
    color: COLORS.themGreen,
    alignSelf: "center",
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  contentText: {
    fontSize: 20,
    color: COLORS.white,
    alignSelf: "center",
    fontFamily: FONTS.ARCHI_BOLD,
  },
  kgSmallText: {
    fontSize: 14,
    color: COLORS.white,
    alignSelf: "center",
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  listView: {
    backgroundColor: COLORS.gray,
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
});

export default CustomSeekBar;
