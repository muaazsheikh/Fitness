import { View, StatusBar, ScrollView, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BigCalendar from "../component/calenderWeeklySession";
import CustomHeader from "../component/header";
import styles from "./Style";

import Spinner from "react-native-loading-spinner-overlay";
import getWeekDataApi from "../../../api/member-home/getWeekData";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { workoutLoading } from "../../../redux/workoutSlice";
const Bookedscreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [weekData, setWeekData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataInitialized, setDataInitialized] = useState(false);
  const [calanderMonthDate, setCalanderMonthDate] = useState(null);
  const reload = useSelector((state) => state?.work?.workoutReload);

  const prevDateRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      const today = new Date();
      fetchData(today);
      dispatch(workoutLoading(false));

      return () => {};
    }, [reload])
  );

  async function fetchData(date) {
    setLoading(true);
    try {
      const response = await getWeekDataApi(date);
      setWeekData(response?.data);

      setDataInitialized(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const handleWeekChange = async (date) => {
    const newDate = date.toISOString();
    if (prevDateRef.current !== newDate) {
      prevDateRef.current = newDate;
      const dateObj = new Date(date);
      const month = (dateObj.getUTCMonth() + 1).toString();
      const year = dateObj.getUTCFullYear();
      setCalanderMonthDate({ month, year });

      await fetchData(date);
    }
  };

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
        currentMonthYear={calanderMonthDate}
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
          {weekData && (
            <BigCalendar
              modeName={"week"}
              availableSessionTime={weekData?.availableSessionTime}
              sessionStatus={weekData?.sessionStatus}
              onWeekChange={handleWeekChange}
            />
          )}
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Bookedscreen;
