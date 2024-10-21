import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import styles from "./Style";
import { COLORS, icons } from "../../constant";
import { CONTEXT, FONTS } from "../../constant/theme";
import FastImage from "react-native-fast-image";
import moment from "moment";

const CustomCalendar = ({ onDateSelect, onTimeSelect, onWeeksChange }) => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [weeks, setWeeks] = useState(1);
  const minDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    moment().format("YYYY-MM-DD")
  );

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const items = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
  ];

  const handleIncrement = () => {
    if (weeks < 52) {
      setWeeks(weeks + 1);
      onWeeksChange(weeks + 1);
    }
  };

  const handleDecrement = () => {
    if (weeks > 1) {
      setWeeks(weeks - 1);
      onWeeksChange(weeks - 1);
    }
  };

  const handleDaySelection = (day) => {
    setSelectedDay(day);
  };

  const handleDayPress = (day) => {
    onDateSelect(day.dateString);
    onWeeksChange(weeks);
    setSelectedDate(day.dateString);
    const selectedDayOfWeek = new Date(day.dateString).getDay(); // Get day of the week (0 - 6)
    setSelectedDay(daysOfWeek[selectedDayOfWeek]); // Update selectedDay with corresponding day of the week
    // setModalCalender(true);
    // setModalVisible(true);
  };
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
      <View
        style={{
          borderRadius: 8,
          marginHorizontal: 5,
          marginTop: 6,
          marginVertical: 20,
        }}
      >
        <Calendar
          onDayPress={handleDayPress}
          current={currentMonth}
          markedDates={{
            events,
            [selectedDate]: {
              selected: true,
              selectedColor: COLORS.themGreen,
              disableTouchEvent: true,
              selectedTextColor: COLORS.black,
            },
          }}
          minDate={minDate}
          theme={styles.calendarTheme}
          renderHeader={(date) => renderCustomHeader(date)}
          onMonthChange={(date) => {
            setCurrentMonth(date.dateString);
          }}
        />
        <View style={styles.horizontalLine} />
        {/* ------ availability ------ */}
        <View style={styles.timeAvailableView}>
          <Text style={styles.availableText}>{CONTEXT.available}</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {items.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    onTimeSelect(item);
                    setSelectedTime(item);
                  }}
                  style={[
                    styles.timeButton,
                    {
                      borderColor:
                        selectedTime === item ? COLORS.themGreen : "gray",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      {
                        color:
                          selectedTime === item
                            ? COLORS.themGreen
                            : COLORS.white,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.horizontalLine} />
        {/* Repeat every week  */}

        <View style={styles.repeatView}>
          <Text style={[styles.availableText, { alignSelf: "center" }]}>
            Repeat Every:
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: COLORS.themeGray,
                width: 90,
                height: 40,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={[styles.availableText, { fontSize: 18 }]}>
                + {weeks}
              </Text>

              <View style={{ gap: 2, marginRight: 10, marginTop: 10 }}>
                <TouchableOpacity
                  style={styles.buttonIncrement}
                  onPress={handleIncrement}
                >
                  <FastImage
                    source={icons.up_icon}
                    style={{ width: 15, height: 8 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonIncrement}
                  onPress={handleDecrement}
                >
                  <FastImage
                    source={icons.down_icon}
                    style={{ width: 15, height: 9 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={[styles.availableText, { alignSelf: "center" }]}>
            Weeks
          </Text>
        </View>

        {/* Week days */}
        <View style={styles.horizontalLine} />

        <Text style={[styles.availableText, { marginVertical: 20 }]}>
          Repeat on:
        </Text>

        <View style={[styles.repeatView, { marginVertical: 10 }]}>
          {daysOfWeek.map((day, index) => (
            <View
              key={index}
              onPress={() => handleDaySelection(day)}
              style={[
                styles.dayButton,
                {
                  borderColor:
                    selectedDay === day ? COLORS.themGreen : COLORS.lightGray,
                  borderWidth: selectedDay === day ? 1 : 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  {
                    color:
                      selectedDay === day ? COLORS.themGreen : COLORS.lightGray,
                  },
                ]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CustomCalendar;
