import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import moment from "moment";
import styles from "./Style";
import CalendarReservationModal from "../modal/CalendarReservationModal";
import CalendarRejectedModal from "../modal/CalendarRejectedModal";
import RejectionModal from "../modal/RejectionModal";
import RejectionReasonModal from "../modal/RejectionReasonModal";
import ConfirmModalReserve from "../modal/ConfirmModalReserve";
import ConfirmModal from "../modal/ConfirmModal";
import UserReserveModel from "../modal/UserReserveModel";
import { CONTEXT } from "../../constant/theme";
import sessionConfirmApi from "../../../../api/member-home/sessionConfirm";
import { useDispatch } from "react-redux";
import { workoutLoading } from "../../../../redux/workoutSlice";
import cancelSessionReservation from "../../../../api/trainer-home/cancelSessionReservation";

const BigCalendar = ({
  Arraydata,
  availableSessionTime,
  sessionStatus,
  onWeekChange,
}) => {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [reseveModel, setReseveModel] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [selectedState, setSelectedState] = useState(0);
  const [reasonModal, setReasonModal] = useState(false);
  const [modalConfirmReserve, setModalConfirmReserve] = useState(false);
  const [modalRejected, setModalRejected] = useState(false);
  const [isCalendarRejectedModel, setCalendarRejectedModel] = useState(false);
  const [reserveTime, setReserveTime] = useState();
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [confirmDate, setConfirmDate] = useState();
  const [confirmTime, setConfirmTime] = useState();
  const [calendarReseveModel, setCalendarReseveModel] = useState(false);
  const [input, setInput] = useState(null);
  const [sessionID, setSessionId] = useState([]);
  const [selectedReason, setSelectedReason] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    moment().startOf("week")
  );

  console.log(JSON.stringify("week changed"));

  const hours = Array.from({ length: 24 }, (_, index) => index);

  useEffect(() => {
    makeEventData(); // Generate the events again when data changes
  }, [currentWeekStart, sessionStatus]);

  const ReserveData = [
    { id: 1, date: "10.20", time: "10:30am", session: "3/20", user: "Costa" },
  ];

  const handleTitlePress = (event) => {
    setSessionId(event?.sessionId);
    alert(JSON.stringify(event));
    setDate(event?.start);
    setEndTime(moment(event?.end).format("HH:mm A"));
    setStartTime(moment(event?.start).format("HH:mm A"));
    if (event?.title === "Request") {
      setCalendarReseveModel(true);
    } else if (event?.title === "Confirmed") {
      setModalConfirmReserve(true);
    } else {
      setReseveModel(true);
    }
    const selectedDayEvents = events.filter((e) => {
      const eventDay = moment(e.start).format("ddd");
      return (
        eventDay === moment(event?.start).format("ddd") &&
        e?.title === "Available"
      );
    });
    const times = selectedDayEvents.map((e) => ({
      startTime: e?.start.format("HH:mm"),
      endTime: e?.end.format("HH:mm"),
    }));
    console.log(event.start);
    setDate(event?.start);
    setReserveTime(times);
    selectedDayEvents.forEach((e) => {
      console.log(
        "startTime:",
        e.start.format("HH:mm"),
        "endTime:",
        e.end.format("HH:mm")
      );
    });
  };

  const closeCalendarRejectedModal = () => {
    setCalendarRejectedModel(false);
  };

  const closeCalendarReservationModal = () => {
    setCalendarReseveModel(false);
  };

  const updateSelectedReason = (reason) => {
    setSelectedReason(reason);
  };

  const handleConfirm = async () => {
    try {
      const response = await cancelSessionReservation(sessionID);
      setModalRejected(false);
    } catch (error) {
      console.log(JSON.stringify(error?.response?.data));
    }
  };
  const handleConfirmPressed = async (accept) => {
    try {
      dispatch(workoutLoading(true));
      setModalConfirmReserve(false);
      const paramsData = {
        isAccepted: accept,
        sessionId: sessionID,
      };
      if (!accept) {
        paramsData.rejectReason = selectedReason;
      }
      const response = await sessionConfirmApi(paramsData);
      setModalConfirmReserve(false);
      dispatch(workoutLoading(true));
    } catch (error) {
      console.log(JSON.stringify(error?.response?.data?.message));
    } finally {
      setModalConfirmReserve(false);
      dispatch(workoutLoading(false));
    }
  };

  const updateInput = (text) => {
    setInput(text);
  };

  const ReserveCancelData = [
    {
      id: 10,
      date: "11.12",
      time: "09:15am",
      session: "3/20",
      user: "Tom",
      state: false,
    },
  ];

  function ModalContainer() {
    return (
      <>
        <UserReserveModel
          visible={reseveModel}
          timeData={reserveTime}
          date={date}
          onRequestClose={() => setReseveModel(false)}
          data={ReserveData}
          confirmText={CONTEXT.confirm}
          rejectText={CONTEXT.reject}
          onConfirm={(time, date) => {
            setConfirmDate(date);
            setConfirmTime(time);
            setReseveModel(false);
            setSelectedState(0);
            setModalConfirm(true);
          }}
          onReject={() => {
            setReseveModel(false);
            setSelectedState(0);
          }}
        />

        <ConfirmModal
          date={confirmDate}
          time={confirmTime}
          modalVisible={modalConfirm}
          setModalVisible={setModalConfirm}
          selectedState={selectedState}
        />

        <ConfirmModalReserve
          date={date}
          startTime={startTime}
          endTime={endTime}
          onRequestClose={() => setReseveModel(false)}
          modalVisible={modalConfirmReserve}
          setModalVisible={setModalConfirmReserve}
          onConfirm={() => {
            handleConfirmPressed(true);
          }}
          onReject={() => {
            setModalConfirmReserve(false);
            setSelectedState(0);
            setReasonModal(true);
          }}
          selectedState={selectedState}
        />

        <RejectionReasonModal
          visible={reasonModal}
          closeModal={() => setReasonModal(false)}
          confirmAction={(selectedOption) => {
            setReasonModal(false);
            setModalRejected(true);
            updateSelectedReason(selectedOption); // Update selected reason in parent
          }}
          updateInput={updateInput} // Pass the function to update the input state
        />

        <RejectionModal
          date={date}
          startTime={startTime}
          endTime={endTime}
          selectedReason={selectedReason || input}
          modalVisible={modalRejected}
          setModalVisible={handleConfirm}
          selectedState={selectedState}
          onCloseModal={() => setModalRejected(false)}
        />

        <CalendarRejectedModal
          visible={isCalendarRejectedModel}
          closeModal={closeCalendarRejectedModal}
          setModalRejected={() => setModalRejected(true)}
        />

        <CalendarReservationModal
          visible={calendarReseveModel}
          closeModal={closeCalendarReservationModal}
          data={ReserveCancelData}
          setModalConfirm={() => {
            setCalendarReseveModel(false);
            setReasonModal(true);
          }}
          setSelectedState={setSelectedState}
          setCalendarRejectedModel={() => {
            setCalendarReseveModel(false);
            setCalendarRejectedModel(true);
          }}
        />
      </>
    );
  }
  const roundToNearestHalfHour = (time) => {
    const roundedMinutes = Math.round(time.minutes() / 30) * 30;
    return time.clone().minutes(roundedMinutes).seconds(0);
  };
  const makeAvailableSessionEvents = () => {
    const availableSessionEvents = [];

    Object?.keys(availableSessionTime)?.forEach((day) => {
      const sessions = availableSessionTime[day];

      // Check if the entire day is a holiday
      const isHoliday = sessions?.some((session) => session?.isHoliday);

      if (isHoliday) {
        // Create one event that spans the entire day
        const startOfDay = moment().day(day).startOf("day");
        const endOfDay = moment().day(day).endOf("day");

        // Avoid overlap by checking existing events
        if (!isOverlapping(startOfDay, endOfDay, availableSessionEvents)) {
          availableSessionEvents.push({
            title: "Holiday",
            start: startOfDay,
            end: endOfDay,
            bgColor: "#FFCECE", // Distinct color for holidays
            isHoliday: true,
          });
        }
      } else {
        sessions?.forEach((session) => {
          const startDateTime = roundToNearestHalfHour(
            moment()
              .day(day)
              .startOf("day")
              .add(moment.duration(session?.startTime))
          );
          const endDateTime = roundToNearestHalfHour(
            moment()
              .day(day)
              .startOf("day")
              .add(moment.duration(session?.endTime))
          );

          // Avoid overlap by checking existing events
          if (
            !isOverlapping(startDateTime, endDateTime, availableSessionEvents)
          ) {
            availableSessionEvents.push({
              sessionId: session?.sessionId,
              title: "Available",
              start: startDateTime,
              end: endDateTime,
              bgColor: "#CCEE9E",
            });
          }
        });
      }
    });

    // Helper function to check overlap
    function isOverlapping(start, end, events) {
      return events.some((event) => start < event.end && end > event.start);
    }

    return availableSessionEvents;
  };

  const makeSessionStatusEvents = () => {
    const sessionStatusEvents = [];

    sessionStatus.forEach((session) => {
      const sessionStart = moment(session?.sessionStartDate);
      const sessionEnd = moment(session?.sessionEndDate);

      sessionStatusEvents.push({
        sessionId: session?.sessionId,
        title: session?.statusValue,
        start: sessionStart?.toDate(),
        end: sessionEnd?.toDate(),
        bgColor: session?.statusValue === "Confirm" ? "#CBFF8A" : "#FEBA69",
      });
    });

    return sessionStatusEvents;
  };

  const makeEventData = () => {
    const availableSessionEvents = makeAvailableSessionEvents();
    const sessionStatusEvents = makeSessionStatusEvents();

    const eventData = [...availableSessionEvents, ...sessionStatusEvents];
    setEvents(eventData);
  };

  const renderEventsForHour = (hour, currentDay) => {
    const filteredEvents = events.filter((event) => {
      const eventStartHour = moment(event?.start).hour();
      const eventEndHour = moment(event?.end).hour();
      const eventDay = moment(event?.start).format("ddd");

      // Skip rendering if the event is a full-day holiday event
      if (event?.isHoliday && eventDay === currentDay) {
        return true; // Only render once at the start of the day
      }

      return (
        eventDay === currentDay && eventStartHour <= hour && hour < eventEndHour
      );
    });

    return filteredEvents.map((event, index) => (
      <TouchableOpacity
        onPress={() => handleTitlePress(event)}
        key={index}
        style={[styles.eventWrapper, { backgroundColor: event.bgColor }]}
      >
        <Text style={styles.eventText}>{event?.title}</Text>
      </TouchableOpacity>
    ));
  };

  const renderDayColumn = (currentDay, isHeader) => {
    return (
      <View key={currentDay} style={styles.dayItem}>
        <Text style={styles.dateText}>{isHeader ? currentDay : ""}</Text>
        {hours?.map((hour) => (
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
            <Text style={styles.hourText}>{`${hour}:00`}</Text>
          </View>
        ))}
      </View>
    );
  };
  const callAPi = async (week) => {
    onWeekChange(week);
  };
  const renderWeekHeader = () => {
    const startOfWeek = currentWeekStart;
    const today = moment().startOf("day");
    const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
      moment(startOfWeek).add(index, "days")
    );
    callAPi(daysOfWeek[4]);

    return (
      <View style={styles.weekHeader}>
        {daysOfWeek.map((day) => (
          <View key={day.format("ddd")} style={[styles.weekItem]}>
            <Text style={styles.dateText}>{day?.format("ddd")}</Text>
            <View
              style={[
                styles.weekHeaderView,
                day.isSame(today, "day") && { backgroundColor: "#4A4A4A" },
              ]}
            >
              <Text style={styles.weekHeaderText}>{day?.format("D")}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const handleSwipe = (event) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.x <= 0) {
      setCurrentWeekStart(currentWeekStart.clone().subtract(1, "week"));
    } else {
      setCurrentWeekStart(currentWeekStart.clone().add(1, "week"));
    }
  };

  const renderWeekView = () => {
    return (
      <View>
        <View style={styles.weekContainer}>
          {renderHourColumn()}
          <ScrollView horizontal onScrollEndDrag={handleSwipe}>
            {moment.weekdaysShort().map((day, index) => {
              return <View key={day}>{renderDayColumn(day, index === 9)}</View>;
            })}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <View>
      {renderWeekHeader()}
      {ModalContainer()}
      <ScrollView showScrollIndicator={false}>{renderWeekView()}</ScrollView>
    </View>
  );
};

export default BigCalendar;
