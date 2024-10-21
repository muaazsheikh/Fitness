import React, { useState } from "react";
import { Modal, View, TouchableWithoutFeedback, Text } from "react-native";
import { FONTS, icons } from "../../../constant";
import styles from "./Style";
import { Calendar } from "react-native-calendars";
import { COLORS } from "../../../../home/constant";
import { PrimaryButton } from "../../../../../components";
import moment from "moment";

const CalendarModal = ({
  modalVisible,
  setModalVisible,
  selectedState,
  onSelectDate,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState({});
  const [currentMonth, setCurrentMonth] = useState(
    moment().format("YYYY-MM-DD")
  );
  const minDate = new Date();

  const handleDayPress = (day) => {
    onSelectDate(day.dateString);
    setSelectedDate(day.dateString);
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modelViewcontainer}>
          <View style={[styles.confirmModal]}>
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
              // minDate={minDate}
              theme={styles.calendarTheme}
              renderHeader={(date) => renderCustomHeader(date)}
              onMonthChange={(date) => {
                setCurrentMonth(date.dateString);
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalendarModal;
