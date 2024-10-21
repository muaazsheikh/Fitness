import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { COLORS, FONTS, icons } from "../../../home/constant";
import { verticalScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";

const CustomStatisticsGraph = ({
  data,
  customVerticalLabels,
  currentWeekLabels,
  graphData,
}) => {
  const getIcon = () => {
    const obj = {
      weight: icons.weight_icon,
      muscleMass: icons.skeleton_icon,
      fatMass: icons.body_fat,
      fatPercentage: icons.body_fat,
      physicalDevelopmentScore: icons.physical_icon,
      abdominalFatPercentage: icons.abdominal,
      bmi: icons.bmi_icon,
    };
    return obj[data.key] || icons.weight_icon;
  };

  const iconStyles = {
    weight: { width: 20, height: 20 },
    muscleMass: { width: 21, height: 21 },
    fatMass: { width: 15, height: 28 },
    fatPercentage: { width: 15, height: 28 },
    physicalDevelopmentScore: { width: 24, height: 24 },
    abdominalFatPercentage: { width: 20, height: 20 },
    bmi: { width: 20, height: 20 },
  };

  const CustomXAxis = ({ labels }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          gap: 30,
        }}
      >
        {labels?.map((label, index) => (
          <View key={index} style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 12,
                color: COLORS.white,
                alignSelf: "center",
                fontFamily: FONTS.ARCHI_SEMBOLD,
              }}
            >
              {label}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{ marginTop: verticalScale(0) }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginStart: 15 }}
      >
        <FastImage
          source={getIcon()}
          style={iconStyles[data.key] || iconStyles.weight}
        />
        <Text
          style={{
            color: COLORS.white,
            fontSize: 18,
            fontFamily: FONTS.ARCHI_BOLD,
            marginVertical: 10,
            marginLeft: 10,
          }}
        >
          {data.title}
        </Text>
      </View>
      <LineChart
        data={{
          labels: currentWeekLabels,
          datasets: [
            {
              data: graphData?.map((data) => data?.weight),
              color: (opacity = 10) => `rgba(204, 255, 0,${opacity})`,
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={400}
        yAxisInterval={10}
        segments={9}
        fromZero
        withVerticalLines={false}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: COLORS.gray1,
          backgroundGradientTo: COLORS.gray,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: COLORS.white,
          },
        }}
       formatYLabel={(value) => {
  return (Math.round(value / 10) * 10).toString(); // Round to nearest 10
}}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      
      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: 50,
          flexDirection: "column-reverse",
        }}
      >
       </View>
    </View>
  );
};

export default CustomStatisticsGraph;
