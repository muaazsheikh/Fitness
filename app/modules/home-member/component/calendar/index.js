import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  Modal,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Calendar, LocaleConfig, Agenda } from "react-native-calendars";
import styles from "./Style";
import { COLORS, FONTS, icons, theme } from "../../constant";
import { CONTEXT } from "../../constant/theme";
import CalendarAppointment from "../calendarappointment";
import { SafeAreaView } from "react-native-safe-area-context";
import BigCalendar from "../calenderWeeklySession";

const CustomCalendar = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalCalender, setModalCalender] = useState(false);
  const minDate = new Date();
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

  const months = [
    { name: "January", days: 31 },
    { name: "February", days: 28 }, // You may need to handle leap years
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
  ];

  const planograms = [
    {
      title: "Available Reservation Times 12:30 AM - 4:30 PM",
      start: "2023-11-29 01:00:00",
      end: "2023-11-01 04:30:00",
      bgColor: "#B0FFAA",
      planogramId: 1442,
    },
    {
      title: "Available Reservation Times 10:30 AM - 04:30 PM",
      start: "2023-11-30 10:00:00",
      end: "2023-11-30 12:00:00",
      bgColor: "orange",
      planogramId: 1442,
    },
    {
      title: "Available Reservation Times 10:30 AM - 04:30 PM",
      start: "2023-12-01 07:00:00",
      end: "2023-12-01 06:40:00",
      bgColor: "#00ff00",
      planogramId: 1442,
    },
    {
      title: "Todays bday",
      start: "2023-11-29 07:00:00",
      end: "2023-11-29 06:40:00",
      bgColor: "pink",
      planogramId: 1442,
    },
  ];

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    // setModalCalender(true);
    //  setModalVisible(true);
  };

  const handleSaveEvent = () => {
    if (selectedDate) {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [selectedDate]: (prevEvents[selectedDate] || []).concat(newEvent),
      }));
      setModalVisible(false);
      setNewEvent("");
    }
  };

  return (
    <View style={styles.calendarContainer}>
      <View
        style={{
          borderRadius: 8,
          marginHorizontal: 5,
          marginTop: 6,
        }}
      >
        <Calendar
          onDayPress={handleDayPress}
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
        />

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
                    setSelectedTime(item);
                  }}
                  style={[
                    styles.timeButton,
                    { borderColor: selectedTime === item ? "#F2FE00" : "gray" },
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      { color: selectedTime === item ? COLORS.white : "gray" },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default CustomCalendar;
