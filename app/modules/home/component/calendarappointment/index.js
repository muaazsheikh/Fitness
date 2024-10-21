import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import styles from "./Style";
import { COLORS, icons, images } from "../../constant";
import { NavigationStrings } from "../../../../constants";
import { useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters";
import ReservationStatus from "../modal/ReservationStatusModal";
import reserveStatusApi from "../../../../api/trainer-home/reserveStatus";
import Spinner from "react-native-loading-spinner-overlay";
import SessionRejectionModal from "../modal/SessionRejectionModal";
import cancelSessionReservation from "../../../../api/trainer-home/cancelSessionReservation";
import EmptyDataModel from "../modal/EmptyDataModel";
import { CONTEXT } from "../../constant/theme";
import { workoutLoading } from "../../../../redux/workoutSlice";
import { useDispatch } from "react-redux";

const CalendarAppointment = ({
  tasksData,
  children,
  onChangeMonth,
  setCurrentDate,
  currentDate,
}) => {
  const navigation = useNavigation();
  const [dataStatus, setDataStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reserveStatusModel, setReserveStatusModel] = useState(false);
  const [reasonModal, setReasonModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showEmptyModel, setShowEmptyModel] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onChangeMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
  }, [currentDate]);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const reserveModalValue = async (selectedDate) => {
    setLoading(true);
    try {
      const response = await reserveStatusApi(selectedDate);
      setDataStatus(response.data);
      setLoading(false);
      setReserveStatusModel(true);
    } catch (error) {
      setLoading(false);
    }
  };

  const renderCalendarGrid = () => {
    const calendarGrid = [];
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    for (let i = 1; i <= daysInMonth; i++) {
      const selectedDate = new Date(currentYear, currentMonth, i);
      const tasksForDay = tasksData.find(
        (task) => task.date === formatDate(selectedDate)
      );

      calendarGrid.push(
        <TouchableOpacity
          key={`current-month-${i}`}
          onPress={() => setShowEmptyModel(true)}
          style={styles.dayCell}
          disabled={tasksForDay}
        >
          <Text style={styles.dayText}>{i}</Text>
          {tasksForDay ? (
            <>
              {tasksForDay.booked > 0 && (
                <TouchableOpacity
                  onPress={() => reserveModalValue(selectedDate)}
                  style={[styles.taskView, { backgroundColor: "#A2A0FF33" }]}
                >
                  <Image source={images.booked} style={styles.taskImage} />
                  <Text style={[styles.taskText, { color: "#ABA9FF" }]}>
                    {tasksForDay.booked}
                  </Text>
                </TouchableOpacity>
              )}
              {tasksForDay.cancel > 0 && (
                <TouchableOpacity
                  onPress={() => reserveModalValue(selectedDate)}
                  style={[styles.taskView, { backgroundColor: "#564042" }]}
                >
                  <Image source={images.cancel} style={styles.taskImage} />
                  <Text style={[styles.taskText, { color: "#FF9191" }]}>
                    {tasksForDay.cancel}
                  </Text>
                </TouchableOpacity>
              )}
              {tasksForDay.complete > 0 && (
                <TouchableOpacity
                  onPress={() => reserveModalValue(selectedDate)}
                  style={[styles.taskView, { backgroundColor: "#4C5640" }]}
                >
                  <Image source={images.complete} style={styles.taskImage} />
                  <Text style={[styles.taskText, { color: "#CBFF8A" }]}>
                    {tasksForDay.complete}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View
              style={[
                styles.taskView,
                { backgroundColor: COLORS.calendarColor, padding: scale(8.7) },
              ]}
            ></View>
          )}
        </TouchableOpacity>
      );
    }

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarGrid.unshift(
        <View key={`empty-${i}`} style={styles.dayCell}></View>
      );
    }

    return calendarGrid;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const onPressCancel = async () => {
    try {
      const response = await cancelSessionReservation(selectedMember);
      dispatch(workoutLoading(true));
    } catch (error) {
      console.log("cancled error", JSON.stringify(error));
    }
  };

  const handleSwipe = (event) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y > 180) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    } else if (contentOffset.y <= -180) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      );
    }
  };

  return (
    <ScrollView onScrollEndDrag={handleSwipe}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          {daysOfWeek.map((weekName, index) => (
            <View key={index} style={styles.weekNameRow}>
              <Text style={styles.weekNameText}>{weekName}</Text>
            </View>
          ))}
        </View>
        <ReservationStatus
          visible={reserveStatusModel}
          onRequestClose={() => setReserveStatusModel(false)}
          data={dataStatus}
          onSessionCancel={(data) => {
            setReserveStatusModel(false);
            setReasonModal(true);
            setSelectedMember(data);
          }}
        />
        <SessionRejectionModal
          visible={reasonModal}
          closeModal={() => setReasonModal(false)}
          confirmAction={(selectedOption) => {
            setReasonModal(false);
            onPressCancel();
          }}
          updateInput={() => {}}
        />
        <EmptyDataModel
          visible={showEmptyModel}
          onRequestClose={() => setShowEmptyModel(false)}
        />
        <View style={styles.calendarGrid}>{renderCalendarGrid()}</View>
        {children}
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      </View>
    </ScrollView>
  );
};

export default CalendarAppointment;
