import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import styles from "./Style";
import { COLORS, icons, images } from "../../constant";
import ReservationStatus from "../modal/ReservationStatusModal";
import PTSessionModal from "../modal/PTSessionModal";
import PTSessionInfo from "../modal/PTSessionInfo";
import reserveStatusApi from "../../../../api/member-home/reserveStatus";
import Spinner from "react-native-loading-spinner-overlay";
import { scale } from "react-native-size-matters";
import EmptyDataModel from "../../../home/component/modal/EmptyDataModel";

const CalendarAppointment = ({ tasksData, children, onChangeMonth,setCurrentDate,currentDate }) => {
  const [dateYear, setDateYear] = useState();
  const [reserveStatusModel, setReserveStatusModel] = useState(false);
  const [sessionModel, setSessionModel] = useState(false);
  const [sessionInfoModel, setSessionInfoModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataStatus, setDataStatus] = useState([]);
  const [showEmptyModel, setShowEmptyModel] = useState(false);
  const [dataOpen, setDateOpen] = useState(null);

  useEffect(() => {
    onChangeMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
  }, [currentDate]);

  const reserveModalValue = async (selectedDate) => {
    setLoading(true);
    setDateOpen(selectedDate)
    try {
      const response = await reserveStatusApi(selectedDate);
      setDataStatus(response.data);
      setLoading(false);
      setReserveStatusModel(true);
    } catch (error) {
      console.log(JSON.stringify(error.response.data));
      setLoading(false);
    }
  };
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const SessionData = [
    {
      id: 1,
      date: "10.20",
      time: "10:30am",
      session: "3/20",
      user: "Costa",
      status: "Attendance Information",
      icon: images.attendance_icon,
    },
  ];

  const currentYear = currentDate.getFullYear();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentYear);
  const firstDayOfMonth = new Date(
    currentYear,
    currentDate.getMonth(),
    1
  ).getDay();

  const renderCalendarGrid = () => {
    const calendarGrid = [];
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarGrid.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDateObject = new Date(currentYear, currentMonth, i);
      const formattedDate = `${currentDateObject.getFullYear()}-${(
        currentDateObject.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDateObject
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      const tasksForDay =
        tasksData?.find((task) => task?.date === formattedDate) || {};
      const isTasksForDayEmpty = Object.keys(tasksForDay).length === 0;

      calendarGrid.push(
        <TouchableOpacity
          key={`current-month-${i}`}
          style={styles.dayCell}
          onPress={() =>
            isTasksForDayEmpty
              ? setShowEmptyModel(true)
              : reserveModalValue(formattedDate)
          }
          // disabled={!isTasksForDayEmpty}
        >
          <Text style={styles.dayText}>{i}</Text>

          {tasksForDay?.attendExist && (
            <View
              style={[
                styles.taskView,
                { backgroundColor: COLORS.calendarColor },
              ]}
            >
              <Image source={images.attendance_icon} style={styles.taskImage} />
            </View>
          )}

          <View style={styles.rowView}>
            {tasksForDay?.ptSessionReservedExist && (
              <View
                style={[
                  styles.taskView,
                  {
                    backgroundColor: COLORS.calendarColor,
                    marginHorizontal: scale(0),
                  },
                ]}
              >
                <Image source={images.pt_session} style={styles.taskImage} />
              </View>
            )}

            {tasksForDay?.ptSessionExist && (
              <View
                style={[
                  styles.taskView,
                  {
                    backgroundColor: COLORS.calendarColor,
                    marginHorizontal: scale(0),
                  },
                ]}
              >
                <Image source={images.session_touch} style={styles.taskImage} />
              </View>
            )}
          </View>

          <View style={styles.rowView}>
            {tasksForDay?.memberWorkoutLogExist && (
              <View
                style={[
                  styles.taskView,
                  {
                    backgroundColor: COLORS.calendarColor,
                    marginHorizontal: scale(0),
                  },
                ]}
              >
                <Image source={images.member_attend} style={styles.taskImage} />
              </View>
            )}

            {tasksForDay?.trainerWorkoutLogExist && (
              <View
                style={[
                  styles.taskView,
                  {
                    backgroundColor: COLORS.calendarColor,
                    marginHorizontal: scale(0),
                  },
                ]}
              >
                <Image source={images.trainer_img} style={[styles.taskImage]} />
              </View>
            )}
          </View>

          {tasksForDay?.dietLogExist && (
            <View
              style={[
                styles.taskView,
                {
                  backgroundColor: COLORS.calendarColor,
                  marginHorizontal: scale(0),
                },
              ]}
            >
              <Image source={images.diet_log_img} style={styles.taskImage} />
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return calendarGrid;
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
    <ScrollView onScrollEndDrag={handleSwipe} scrollEnabled={true}>
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
          onPTCLick={() => {
            setReserveStatusModel(false);
            setSessionModel(true);
          }}
          onPTinfo={() => {
            setReserveStatusModel(false);
            setSessionInfoModel(true);
          }}
          onRequestClose={() => setReserveStatusModel(false)}
          data={dataStatus}
          selectedDate={dataOpen}
        />
        <PTSessionModal
          visible={sessionModel}
          onRequestClose={() => setSessionModel(false)}
          data={SessionData}
        />
        <PTSessionInfo
          visible={sessionInfoModel}
          onRequestClose={() => setSessionInfoModel(false)}
          data={SessionData}
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
