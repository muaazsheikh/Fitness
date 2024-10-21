import { View, StatusBar, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../component/calendarappointment/Style";
import CustomHeader from "../component/header";
import DayCalendar from "../component/calenderDaySession";

const TodayScreen = ({ navigation }) => {
  const tasksData = {
    1: { booked: 3, complete: 2, cancel: 1 },
    5: { booked: 1, complete: 0, cancel: 2 },
    10: { cancel: 2, complete: 1, booked: 1 },
  };
  const planograms = [
    {
      title: "mattew 3/4",
      start: "2023-12-14 14:00:00",
      end: "2023-12-14 15:00:00",
      bgColor: "#B3B1FF",
      planogramId: 1442,
    },
    {
      title: "cath will be proceed  2/20",
      start: "2023-11-27 05:00:00",
      end: "2023-11-27 06:00:00",
      bgColor: "#B3B1FF",
      planogramId: 1442,
    },
  ];

  function renderHeader() {
    return (
      <CustomHeader
        navigation={navigation}
        title="Oct 2023"
        onPressDrawer={() => navigation.openDrawer()}
        onPressReserve={() => {}}
        onPressCalendar={() => {}}
        onPressList={() => {} /* Handle list press */}
        onPressNotify={() => {} /* Handle notify press */}
      />
    );
  }

  return (
    <View style={styles.containerCalender}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"light-content"} />
        {renderHeader()}
        {/* ------- Calender -------- */}
        <View style={styles.viewContainer}>
          <DayCalendar modeName={"day"} Arraydata={planograms} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TodayScreen;
