import React, { useState } from "react";
import { Modal, View, TouchableWithoutFeedback } from "react-native";
import { icons } from "../../../constant";
import styles from "./Style";
import { Calendar } from "react-native-calendars";
import { COLORS } from "../../../../home/constant";
import { PrimaryButton } from "../../../../../components";

const CalendarModal = ({ modalVisible, setModalVisible, selectedState }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState({});
  const minDate = new Date();

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
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
              minDate={minDate}
              theme={styles.calendarTheme}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalendarModal;
