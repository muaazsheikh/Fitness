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
import getMonthDataApi from "../../../api/trainer-home/getMonthData";
import {
  trainerMonthFailure,
  trainerMonthRequest,
  trainerMonthSuccess,
} from "../../../redux/geTrainerMonthSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import FastImage from "react-native-fast-image";
import { workoutLoading } from "../../../redux/workoutSlice";
import { useFocusEffect } from "@react-navigation/native";
import MonthPicker from "react-native-month-year-picker";

LogBox.ignoreLogs(["Warning: ..."]);

const CalenderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state?.work?.workoutReload);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reseveModel, setReseveModel] = useState(false);
  const [reseveCalendarModel, setReseveCalendarModel] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [calanderMonthDate, setCalanderMonthDate] = useState(null);
  const shouldRefresh = useSelector((state) => state.refresh.shouldRefresh);
  const [show, setShow] = useState(false);
  const showPicker = useCallback((value) => setShow(value), []);
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          setLoading(true);
          dispatch(trainerMonthRequest());
          const response = await getMonthDataApi(calanderMonthDate);
          dispatch(trainerMonthSuccess(response?.data));
          dispatch(workoutLoading(false));
          setSelectedData(response?.data?.monthCounts);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          dispatch(trainerMonthFailure(error?.message));
        }
      }
      fetchData();
      return () => {};
    }, [calanderMonthDate, shouldRefresh, reload])
  );

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(trainerMonthRequest());
        const response = await getMonthDataApi();

        dispatch(workoutLoading(false));
        dispatch(trainerMonthSuccess(response?.data));
        setSelectedData(response?.data?.monthCounts);
      } catch (error) {}
    }
    fetchData();
  }, [reload]);

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
        onPressDrawer={() => navigation.openDrawer()}
        onPressReserve={() => setReseveModel(true)}
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
          tasksData={selectedData}
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
        {renderHeader()}
        <TouchableOpacity
          style={[styles.addYellowview, { flexDirection: "row" }]}
          onPress={() => setModalVisible(!modalVisible)}
        >
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
                setModalVisible(false),
                  navigation.navigate(NavigationStrings.HOME_SCREEN);
              }}
            >
              <Text style={styles.modalText}>{"Reservation"}</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        {renderCalender()}
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
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
