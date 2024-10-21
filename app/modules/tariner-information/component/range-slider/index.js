import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { scale } from "react-native-size-matters";
import { COLORS, FONTS, images } from "../../../home/constant";
import moment from "moment";

const CustomRangeSlider = ({ min, max, session, onValuesChange }) => {
  const { startTime, endTime } = session;
  const [startAmPm, setStartAmPm] = useState("");
  const [endAmPm, setEndAmPm] = useState("");

  useEffect(() => {
    setStartAmPm(moment(startTime, "HH:mm").format("hh a"));
    setEndAmPm(moment(endTime, "HH:mm").format("hh a"));
  }, [startTime, endTime]);

  const generateTimeIntervals = () => {
    const intervals = [];
    for (let i = 0; i <= 24; i += 3) {
      let hour = i % 12 || 12; // Convert 0 to 12
      const ampm = i < 12 ? "am" : "pm";
      intervals.push({ value: i, label: `${hour}${ampm}` });
    }
    return intervals;
  };

  const startTimeParts = startTime.split(":");
  const endTimeParts = endTime.split(":");

  const startHour = parseInt(startTimeParts[0], 10);
  const startMinute = parseInt(startTimeParts[1], 10);
  const endHour = parseInt(endTimeParts[0], 10);
  const endMinute = parseInt(endTimeParts[1], 10);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  const timeIntervals = generateTimeIntervals();

  return (
    <View>
      <View
        style={{
          width: 137,
          height: 35,
          backgroundColor: COLORS.gray,
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
          alignSelf: "center",
          marginRight: 10,
        }}
      >
        <Image
          source={images.ClockIcon}
          style={{ width: 18, height: 18, alignSelf: "center" }}
        />
        <Text
          style={{
            color: COLORS.themGreen,
            alignSelf: "center",
            fontFamily: FONTS.ARCHI_BOLD,
          }}
        >
          {`${startAmPm} - ${endAmPm}`}
        </Text>
      </View>
      <MultiSlider
        values={[startMinutes, endMinutes]}
        sliderLength={scale(300)}
        onValuesChange={onValuesChange}
        min={min}
        max={max}
        step={1}
        allowOverlap={false}
        thumbTintColor="#ff0000"
        customMarker={() => (
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: COLORS.white,
              alignSelf: "center",
              marginTop: 10,
              borderRadius: 100,
            }}
          />
        )}
        trackStyle={{ height: 10, backgroundColor: "#ccc" }}
        selectedStyle={{ backgroundColor: COLORS.themGreen }}
        snapped
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {timeIntervals.map((interval, index) => (
          <Text
            style={{
              color: COLORS.white,
              margin: 5,
              fontSize: 12,
            }}
            key={index}
          >
            {interval.label}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default CustomRangeSlider;
