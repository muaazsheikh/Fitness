import React, { useState } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { COLORS, FONTS } from "../../constant";
import styles from "./Style";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import moment from "moment";

const CustomCalendar = ({ onSelectDate, name, sessionData }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(
    moment().format("YYYY-MM-DD")
  );

  const minDate = new Date();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    return formattedDate;
  }

  const handleDayPress = (day) => {
    const selectedSession = sessionData.find(
      (session) => formatDate(session.date) === day.dateString
    );
    // Only allow selection if the date is marked with a blue background
    if (
      selectedSession &&
      selectedSession.id !== null &&
      !selectedSession.workoutExists
    ) {
      setSelectedDate(day.dateString);
      onSelectDate(day.dateString, selectedSession.id);
    }
  };

  const generateMarkedDates = () => {
    const markedDates = {};
    sessionData.forEach((item) => {
      const formattedDate = formatDate(item.date);
      if (item.id !== null && !item.workoutExists) {
        markedDates[formattedDate] = {
          customStyles: {
            container: {
              backgroundColor: COLORS.purple,
              opacity: 0.6,
            },
            text: {
              color: COLORS.white,
            },
          },
        };
      }
    });

    if (selectedDate && markedDates[selectedDate]) {
      markedDates[selectedDate] = {
        customStyles: {
          container: {
            backgroundColor: COLORS.themGreen,
          },
          text: {
            color: COLORS.black,
          },
        },
      };
    }

    return markedDates;
  };

  const markedDates = generateMarkedDates();
  const renderCustomHeader = (date) => {
    const formattedDate = moment(currentMonth).format("YYYY.MM");
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: 16,
            fontFamily: FONTS.ARCHI_MEDIUM,
          }}
        >
          {formattedDate}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.calendarContainer}>
      <View style={{ borderRadius: 8, marginHorizontal: 5, marginTop: 6 }}>
        <Text
          style={[
            styles.textReserve,
            { color: COLORS.white, alignSelf: "center" },
          ]}
        >
          {name}
        </Text>
        <View style={styles.horizontalLine} />

        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          // minDate={minDate}
          theme={styles.calendarTheme}
          markingType={"custom"}
          renderHeader={(date) => renderCustomHeader(date)}
          onMonthChange={(date) => {
            setCurrentMonth(date.dateString);
          }}
        />
      </View>
    </View>
  );
};

export default CustomCalendar;
