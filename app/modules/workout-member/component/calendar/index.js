import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import styles from "./Style";
import { COLORS, FONTS } from "../../constant";
import { scale } from "react-native-size-matters";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import moment from "moment";

const CustomCalendar = ({
  onSelectDate,
  name,
  sessionData,
  handleTimeSelect,
  onMonthYearChange,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(
    moment().format("YYYY-MM-DD")
  );

  const handleMonthChange = (date) => {
    setCurrentMonth(date.dateString);
    const year = moment(date.dateString).format("YYYY");
    const month = moment(date.dateString).format("MM");
    onMonthYearChange(month, year); // Call parent with month and year
  };
  const minDate = new Date();

  const items = [
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
  ];

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    return formattedDate;
  }

  useEffect(() => {
    if (selectedDate && sessionData) {
      const selectedSession = sessionData?.find(
        (session) => formatDate(session?.date) === selectedDate
      );
      if (selectedSession?.sessionTiming?.length > 0) {
        const times = selectedSession.sessionTiming.map((timing) => {
          const date = new Date(timing.time);
          return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        });
        setAvailableTimes(times);
      } else {
        setAvailableTimes([]);
      }
    }
  }, [selectedDate, sessionData]);

  const handleDayPress = (day) => {
    const selectedSession = sessionData?.find(
      (session) => formatDate(session?.date) === day?.dateString
    );
    if (
      selectedSession &&
      selectedSession.id !== null &&
      selectedSession.sessionExists &&
      selectedSession.sessionTiming.length > 0
    ) {
      setSelectedDate(day.dateString);
      onSelectDate(day.dateString, selectedSession.id);
    }
  };

  const handleDatePress = (day) => {
    setSelectedDate(day.dateString);
    onSelectDate(day.dateString);
  };

  const handleTimePress = (time) => {
    setSelectedTime(time);
    handleTimeSelect(time);
  };

  const generateMarkedDatesForSessionData = () => {
    const markedDates = {};
    if (sessionData) {
      sessionData?.forEach((item) => {
        const formattedDate = formatDate(item.date);
        if (item?.sessionExists && item?.sessionTiming.length > 0) {
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
        } else {
          markedDates[formattedDate] = {
            disableTouchEvent: true,
            customStyles: {
              container: {},
              text: {
                color: COLORS.white,
              },
            },
          };
        }
      });
    }
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

  const generateMarkedDatesForNoSessionData = () => {
    const markedDates = {};
    if (selectedDate) {
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

  const markedDatesWithSessionData = generateMarkedDatesForSessionData();
  const markedDatesWithoutSessionData = generateMarkedDatesForNoSessionData();

  const renderCustomHeader = (date) => {
    const formattedDate = moment(currentMonth).format("YYYY-MM");
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
    <View
      style={[
        styles.calendarContainer,
        { height: !sessionData ? scale(400) : scale(400) },
      ]}
    >
      <View style={{ borderRadius: 8, marginHorizontal: 5, marginTop: 0 }}>
        <Text
          style={[
            styles.textReserve,
            { color: COLORS.white, alignSelf: "center", marginTop: -20 },
          ]}
        >
          {name}
        </Text>
        <View style={styles.horizontalLine} />
        {!sessionData ? (
          <Calendar
            onDayPress={handleDatePress}
            markedDates={markedDatesWithoutSessionData}
            minDate={minDate}
            theme={styles.calendarTheme}
            markingType={"custom"}
            renderHeader={(date) => renderCustomHeader(date)}
            onMonthChange={(date) => {
              setCurrentMonth(date.dateString);
            }}
          />
        ) : (
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDatesWithSessionData}
            theme={styles.calendarTheme}
            markingType={"custom"}
            renderHeader={(date) => renderCustomHeader(date)}
            onMonthChange={handleMonthChange}
          />
        )}
        <View style={styles.horizontalLine}></View>
        <View>
          <Text
            style={[
              styles.availableText,
              { alignSelf: "flex-start", marginLeft: 30 },
            ]}
          >
            Select Time
          </Text>
          <View style={[styles.timeAvailableView, { alignSelf: "center" }]}>
            {sessionData ? (
              <ScrollView
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                horizontal={true}
              >
                {availableTimes.map((time, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "row", alignSelf: "flex-start" }}
                  >
                    <TouchableOpacity
                      onPress={() => handleTimePress(time)}
                      style={[
                        styles.timeButton,
                        {
                          borderColor:
                            selectedTime === time ? COLORS.themGreen : "gray",
                          borderWidth: 1,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.timeText,
                          {
                            color:
                              selectedTime === time ? COLORS.white : "gray",
                          },
                        ]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                horizontal={true}
              >
                {items.map((item, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "row", alignSelf: "flex-start" }}
                  >
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        handleTimePress(item);
                      }}
                      style={[
                        styles.timeButton,
                        {
                          borderColor:
                            selectedTime === item ? COLORS.themGreen : "gray",
                          borderWidth: selectedTime === item ? 1 : 1,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.timeText,
                          {
                            color:
                              selectedTime === item ? COLORS.white : "gray",
                          },
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomCalendar;
