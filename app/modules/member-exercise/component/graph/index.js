import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { COLORS, FONTS, icons } from "../../../home/constant";
import { verticalScale } from "react-native-size-matters";

const CustomGraph = ({
  data,
  customVerticalLabels,
  currentWeekLabels,
  graphData,
}) => {
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
              <Text></Text>
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return graphData?.length ? (
    <View style={{ marginTop: verticalScale(0) }}>
      <Text
        style={{
          color: COLORS.white,
          fontSize: 18,
          fontFamily: FONTS.ARCHI_SEMBOLD,
          marginVertical: 10,
          marginLeft: 10,
        }}
      >
        {data}
      </Text>
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
  ) : null;
};

export default CustomGraph;
