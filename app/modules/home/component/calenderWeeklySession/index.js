import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import moment from "moment";
import styles from "./Style";
import { COLORS } from "../../constant";
import { scale } from "react-native-size-matters";
import ReservationStatus from "../modal/ReservationStatusModal";
import SessionRejectionModal from "../modal/SessionRejectionModal";
import reserveStatusApi from "../../../../api/trainer-home/reserveStatus";
import cancelSessionReservation from "../../../../api/trainer-home/cancelSessionReservation";
import { workoutLoading } from "../../../../redux/workoutSlice";
import { useDispatch } from "react-redux";

const BigCalendar = ({ Arraydata ,onWeekChange}) => {
  const [events, setEvents] = useState([]);
  const [reserveStatusModel, setReserveStatusModel] = useState(false);
  const [reasonModal, setReasonModal] = useState(false);
  const [dataStatus, setDataStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const dispatch = useDispatch()
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week'));


// console.log('currentWeekWed',JSON.stringify(currentWeekWed))
  const hours = Array.from({ length: 24 }, (_, index) => index);

  useEffect(() => {
    makeEventData();
  }, [Arraydata]);

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

  const onPressCancel = async () => {
    try {
      const response = await cancelSessionReservation(selectedMember);
      dispatch(workoutLoading(true));

      console.log("cancled response", JSON.stringify(response));
    } catch (error) {
      console.log("cancled error", JSON.stringify(error));
    }
  };
  

  const makeEventData = () => {
    console.log("check", JSON.stringify(Arraydata));
    
    let eventData = Arraydata?.map((session) => {
      return {
        title: session?.name,
        start: new Date(session?.bookedDate),
        end: new Date(session?.endDate),
        bgColor:
          session?.statusValue === "reject"
            ? "#FF9191"
            : session?.statusValue === "completed"
            ? "#CBFF8A"
             : session?.statusValue === "booked"
            ? "#ABA9FF"
            : session?.statusValue === "req_cancel"
            ? "#ddffd"
            : "#FFE486",
        sessionCount: session?.sessionCount,
        sessionComplete: session?.sessionCompleted,
        statusValue:session?.statusValue
      };
    });
    setEvents(eventData);
  };

  const renderEventsForHour = (hour, currentDay) => {
    const filteredEvents = events.filter((event) => {
      const eventStartHour = moment(event.start).hour();
      const eventEndHour = moment(event.end).hour();
      const eventDay = moment(event.start).format("ddd");

      return (
        eventStartHour <= hour && hour < eventEndHour && eventDay === currentDay
      );
    });

    return filteredEvents.map((event, index) => (
      <TouchableOpacity
      disabled={event.statusValue !== "booked"}
      onPress={()=>reserveModalValue(event?.start)}
        key={index}
        style={[styles.eventWrapper, { backgroundColor: event.bgColor }]}
      >
        <Text style={styles.eventText}>{event.title}</Text>
        <Text style={styles.eventText}>
          {event.sessionComplete}/{event.sessionCount}
        </Text>
      </TouchableOpacity>
    ));
  };

  const renderDayColumn = (currentDay, isHeader) => {
    return (
      <View key={currentDay} style={styles.dayItem}>
        <Text style={styles.dateText}>{isHeader ? currentDay : ""}</Text>
        {hours.map((hour) => (
          <View key={hour} style={styles.hourContainer}>
            <View style={styles.eventContainer}>
              {renderEventsForHour(hour, currentDay)}
            </View>
          </View>
        ))}
      </View>
    );
  };
  const renderHourColumn = () => {
    return (
      <View style={styles.hourColumn}>
        {hours.map((hour) => (
          <View key={hour} style={styles.hourContainer}>
            <Text style={styles.hourText}>
              {hour === 0
                ? "12 AM"
                : hour < 12
                ? `${hour} AM`
                : hour === 12
                ? "12 PM"
                : `${hour - 12} PM`}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  const callAPi=async(week)=>{
    onWeekChange(week)
  }
  const renderWeekHeader = () => {
    const startOfWeek = currentWeekStart;
    const today = moment().startOf("day");
    const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
      moment(startOfWeek).add(index, "days")
    );
    callAPi(daysOfWeek[4])

    return (
      <View style={styles.weekHeader}>
        {daysOfWeek.map((day) => (
          <View
            key={day.format("ddd")}
            style={[
              styles.weekItem,
              // day.isSame(today, "day") && { backgroundColor: 'pink' },
            ]}
          >
            <Text style={styles.dateText}>{day.format("ddd")}</Text>
            <View
              style={[
                styles.weekHeaderView,
                day.isSame(today, "day") && { backgroundColor: "#4A4A4A" },
              ]}
            >
              <Text style={styles.weekHeaderText}>{day.format("D")}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const daysOfWeek = moment.weekdaysShort();
  const renderWeekView = () => {
    return (
      <View>
        <View style={styles.weekContainer}>
          {renderHourColumn()}
          <ScrollView horizontal onScrollEndDrag={handleSwipe}>
            {daysOfWeek.map((day, index) => (
              <View key={day}>{renderDayColumn(day, index === 9)}</View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  const handleSwipe = (event) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.x <= 0) {
      setCurrentWeekStart(currentWeekStart.clone().subtract(1, 'week'));
    } else {
      setCurrentWeekStart(currentWeekStart.clone().add(1, 'week'));
    }
  };

  return (
    <View>
      {renderWeekHeader()}
      <ScrollView showScrollIndicator={false}>{renderWeekView()}</ScrollView>
      <ReservationStatus
        visible={reserveStatusModel}
        onRequestClose={() => setReserveStatusModel(false)}
        data={dataStatus}
        onSessionCancel={(data)=>{
          setReserveStatusModel(false)
          setReasonModal(true)
          setSelectedMember(data)
        }}
      />
      <SessionRejectionModal
       visible={reasonModal}
       closeModal={() => setReasonModal(false)}
       confirmAction={(selectedOption) => {
         setReasonModal(false);
         onPressCancel()
       }}
       updateInput={()=>{}}
      />
    </View>
  );
};

export default BigCalendar;