import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import moment from "moment";
import { scale } from "react-native-size-matters";
import styles from "../calenderDaySession/Style";
import { ScrollView } from "react-native-gesture-handler";

const DayCalendar = ({ Header, Arraydata }) => {
  const [customHeader, setcustomHeader] = useState(Header);
  const [events, setEvents] = useState([]);
  const today = moment();

  const renderDayColumn = () => {
    const hours = Array.from({ length: 24 }, (_, index) => index);

    return hours.map((hour) => {
      const displayHour = hour % 12 || 12; // Convert 0 to 12
      const ampm = hour < 12 ? "AM" : "PM";

      useEffect(() => {
        makeEventData();
      }, []);

      const makeEventData = () => {
        let eventData = Arraydata?.map((session) => {
          return {
            title: session?.name,
            start: new Date(session?.bookedDate),
            end: new Date(session?.endDate),
            bgColor:
              session?.statusValue === "reject"
                ? "#FF9191"
                : session?.statusValue === "complete"
                ? "#CBFF8A"
                : "#ABA9FF",
            sessionCount: session?.sessionCount,
            sessionComplete: session?.sessionCompleted,
            statusValue: session?.statusValue,
          };
        });
        setEvents(eventData);
      };

      return (
        <View key={hour} style={styles.hourContainer}>
          <Text style={styles.hourText}>{`${displayHour} ${ampm}`}</Text>
          <View style={styles.eventContainer}>{renderEventsForHour(hour)}</View>
        </View>
      );
    });
  };

  const renderEventsForHour = (hour) => {
    // Filter events for the specific hour
    const filteredEvents = events.filter((event) => {
      const eventStartHour = moment(event.start).hour();
      const eventEndHour = moment(event.end).hour();

      return eventStartHour <= hour && hour < eventEndHour;
    });

    const eventViews = filteredEvents.map((event, index) => (
      <View key={index}>
        <View style={styles.eventContainer}>
          <View
            style={[styles.eventWrapper, { backgroundColor: event.bgColor }]}
          >
            <Text style={styles.eventText}>
              {event?.title} {event?.statusValue}
            </Text>
          </View>
        </View>
      </View>
    ));

    return eventViews.length > 0 ? eventViews : null;
  };

  const renderTodaysHeader = () => (
    <View style={styles.headerContainer}>
      <View style={{ flex: 1 / 2 }}>
        <Text style={styles.dateText}>{today.format("ddd")}</Text>
        <View style={styles.dayView}>
          <Text style={styles.dayText}>{today.format("D")}</Text>
        </View>
      </View>
      <View style={styles.todayView}>
        <Text style={styles.todayText}>Today’s Schedule</Text>
      </View>
    </View>
  );
  const dayStyles = {
    day: {
      backgroundColor: "lightgray",
    },
    today: {
      backgroundColor: "lightblue",
    },
  };

  return (
    <View>
      {renderTodaysHeader()}
      <View
        style={{
          width: scale(350),
          height: scale(570),
          marginTop: scale(50),
        }}
      >
        <ScrollView showScrollIndicator={false} style={styles.container}>
          <View style={styles.content}>
            <View style={styles.hoursContainer}>{renderDayColumn()}</View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DayCalendar;
