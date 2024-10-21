import { View, StatusBar } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BigCalendar from "../component/calenderWeeklySession";
import CustomHeader from "../component/header";
import styles from "./Style";
import getWeekDataApi from "../../../api/trainer-home/getWeekData";
import Spinner from "react-native-loading-spinner-overlay";
import { useFocusEffect } from "@react-navigation/native";
const Bookedscreen = ({ navigation }) => {
  const [weekData, setWeekData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataInitialized, setDataInitialized] = useState(false);
  const [calanderMonthDate, setCalanderMonthDate] = useState(null);
  const prevDateRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      const today = new Date();
      fetchData(today);
      return () => {
        // Cleanup if needed
      };
    }, [])
  );

  const fetchData = async (date) => {
    setLoading(true);
    try {
      const response = await getWeekDataApi(date);
      setWeekData(response?.data?.sessionList);
      setDataInitialized(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWeekChange = (date) => {
    const newDate = date.toISOString();

    if (prevDateRef.current !== newDate) {
      prevDateRef.current = newDate;
   
        const dateObj = new Date(date);
      const month = (dateObj.getUTCMonth() + 1).toString();
      const year = dateObj.getUTCFullYear();
      setCalanderMonthDate({month,year})
      fetchData(date);
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
        <View style={styles.viewContainer}>
          {dataInitialized && (
            <BigCalendar 
              modeName={"week"} 
              Arraydata={weekData} 
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
