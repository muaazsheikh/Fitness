import React from "react";
import { View, Text } from "react-native";
import { ProgressCircle } from "react-native-svg-charts";
import { COLORS } from "../../../home/constant";

const CircularProgress = ({ value, maxValue }) => {
  const progress = (value / maxValue) * 100;

  return (
    <View style={{ flex: 1, width: 40 }}>
      <ProgressCircle
        style={{ height: 40 }}
        progress={progress / 100}
        progressColor={COLORS.themGreen}
        backgroundColor={COLORS.placeholderColor}
        strokeWidth={1}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{ fontSize: 10, color: COLORS.white }}
          >{`${value}/${maxValue}`}</Text>
        </View>
      </ProgressCircle>
    </View>
  );
};

export default CircularProgress;
