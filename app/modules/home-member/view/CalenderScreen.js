import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  LogBox,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, icons } from "../constant";
import CalendarAppointment from "../component/calendarappointment";
import styles from "./Style";
import { NavigationStrings } from "../../../constants";
import { scale } from "react-native-size-matters";
import CustomHeader from "../component/header";
import FastImage from "react-native-fast-image";
import Spinner from "react-native-loading-spinner-overlay";
import getMonthDataApi from "../../../api/member-home/getMonthData";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { trainerMonthSuccess } from "../../../redux/geTrainerMonthSlice";
import MonthPicker from "react-native-month-year-picker";

LogBox.ignoreLogs(["Warning: ..."]);

const CalenderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [data, setData] = useState([false]);
  const [reseveCalendarModel, setReseveCalendarModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calanderMonthDate, setCalanderMonthDate] = useState(null);
  const [show, setShow] = useState(false);
  const showPicker = useCallback((value) => setShow(value), []);
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      async function fetchData() {
        try {
          const response = await getMonthDataApi(calanderMonthDate);
          dispatch(trainerMonthSuccess(response?.data));
          setData(response?.data?.monthStatus);
          setLoading(false);
        } catch (error) {
          setLoading(false);

          console.log(error);
        }
      }
      fetchData();
      return () => {};
    }, [calanderMonthDate, date])
  );

  const onValueChange = useCallback(
    (event, newDate) => {
      if (event === "dateSetAction" || newDate !== undefined) {
        const selectedDate = {
          month: newDate.getMonth() + 1 || calanderMonthDate.month,
          year: newDate.getFullYear() || calanderMonthDate.year,
        };
        setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth()));
        setCalanderMonthDate(selectedDate);
        showPicker(false);
        setDate(newDate);
      } else {
        showPicker(false);
      }
    },
    [calanderMonthDate, showPicker]
  );

  function renderHeader() {
    return (
      <CustomHeader
        navigation={navigation}
        title="Oct 2023"
        showIcon={true}
        onPressDrawer={() => navigation.openDrawer()}
        onPressReserve={() => setInfoModal(true)}
        onPressCalendar={() => setReseveCalendarModel(true)}
        onPressList={() => {} /* Handle list press */}
        onPressNotify={() => {} /* Handle notify press */}
        currentMonthYear={calanderMonthDate}
        onMonthYearPress={() => showPicker(true)}
      />
    );
  }
  function renderCalender() {
    return (
      <View style={styles.calenderContainer}>
        <CalendarAppointment
          tasksData={data}
          onChangeMonth={(month, year) => {
            setCalanderMonthDate({ month, year });
          }}
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
        />
      </View>
    );
  }

  return (
    <View style={styles.containerCalender}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"light-content"} />
        <View style={[styles.addYellowview, { flexDirection: "row" }]}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            {!modalVisible ? (
              <FastImage
                source={icons.plus_icon}
                style={[styles.modelIcon, { tintColor: COLORS.black }]}
              />
            ) : (
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.minus}> – </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          {modalVisible && (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible),
                  navigation.navigate(NavigationStrings.BOOK_SCREEN);
              }}
            >
              <Text style={styles.modalText}>{"Reservation"}</Text>
            </TouchableOpacity>
          )}
        </View>
        {renderHeader()}
        {renderCalender()}
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        {/* {renderPluseiconModel()} */}
      </SafeAreaView>
      <Modal transparent visible={show}>
        <View style={{ flex: 1 }}>
          {show && (
            <MonthPicker
              onChange={onValueChange}
              value={date}
              locale="en"
              mode="number"
              autoTheme={false}
              maximumDate={new Date(9999, 11, 31)}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default CalenderScreen;
