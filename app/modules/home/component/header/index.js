import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { icons } from "../../constant";
import styles from "./Style";
import UserReserveModel from "../modal/UserReserveModel";
import ConfirmModal from "../modal/ConfirmModal";
import RejectionModal from "../modal/RejectionModal";
import RejectionReasonModal from "../modal/RejectionReasonModal";
import CalendarReservationModal from "../modal/CalendarReservationModal";
import CalendarRejectedModal from "../modal/CalendarRejectedModal";
import { CONTEXT } from "../../constant/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import reserveRequestApi from "../../../../api/trainer-home/reserveRequest";
import cancelRequestApi from "../../../../api/trainer-home/cancelRequest";
import { NavigationStrings } from "../../../../constants";
import { workoutLoading } from "../../../../redux/workoutSlice";
import { scale } from "react-native-size-matters";

const CustomHeader = ({
  navigation,
  title,
  onPressDrawer,
  onPressReserve,
  onPressCalendar,
  onPressList,
  onPressNotify,
  currentMonthYear,
  onMonthYearPress,
}) => {
  const dispatch = useDispatch();

  const countData = useSelector((state) => state?.trainerMonth?.user);
  const reload = useSelector((state) => state?.work?.workoutReload);

  const [reseveModel, setReseveModel] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [selectedState, setSelectedState] = useState(0);
  const [modalReject, setModalReject] = useState(false);
  const [modalRejected, setModalRejected] = useState(false);

  const [calendarReseveModel, setCalendarReseveModel] = useState(false);
  const [isCalendarRejectedModel, setCalendarRejectedModel] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [modalNotification, setModalNotification] = useState(false);
  const [reserveData, setReserveData] = useState([]);
  const [cancelData, setCancelData] = useState([]);
  const [confirmData, setConfirmData] = useState([]);
  const [rejectData, setRejectData] = useState([]);
  const [selectedReason, setSelectedReason] = useState(null);
  const [input, setInput] = useState(null);

  const currentDate = new Date();
  const options = { month: "short", year: "numeric" };
  // const currentMonthYear = currentDate.toLocaleString("default", options);

  function getMonthName() {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (currentMonthYear != null) {
      return (
        currentMonthYear?.year +
        "." +
        (currentMonthYear?.month < 10
          ? "0" + currentMonthYear?.month
          : currentMonthYear?.month)
      );
    } else {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;
      return formattedDate;
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await reserveRequestApi();
        const responseCancel = await cancelRequestApi();
        dispatch(workoutLoading(false));
        setCancelData(responseCancel?.data?.sessionList);
        setReserveData(response?.data?.sessionList);
      } catch (error) {}
    }
    fetchData();
  }, [confirmData, selectedReason, reload]);

  const closeCalendarReservationModal = () => {
    setCalendarReseveModel(false);
  };

  const closeCalendarRejectedModal = () => {
    setCalendarRejectedModel(false);
  };

  const handleRadioButtonPress = (option) => {
    setSelectedOption(option);
  };

  const updateConfirmData = (data) => {
    setConfirmData(data);
  };

  const updateRejectData = (data) => {
    setRejectData(data);
  };
  const updateSelectedReason = (reason) => {
    setSelectedReason(reason);
  };
  const updateInput = (text) => {
    setInput(text);
  };

  return (
    <View style={styles.headerView}>
      <SafeAreaView style={{ flex: 1 }} />
      <TouchableOpacity onPress={onPressDrawer}>
        <Image source={icons.DrawerIcon} style={styles.drowerIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onMonthYearPress}>
        <Text style={styles.headingText}>{getMonthName()}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setReseveModel(true)}>
        <ImageBackground source={icons.Contact} style={styles.imageBack}>
          {countData?.count[0]?.reservationCount > 0 && (
            <View style={styles.ImageView}>
              <Text style={styles.countText}>
                {countData?.count[0]?.reservationCount}
              </Text>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setCalendarReseveModel(true)}>
        <ImageBackground source={icons.CalenderIcon} style={styles.imageBack}>
          {countData?.count[0]?.cancelCount > 0 && (
            <View style={styles.ImageView}>
              <Text style={styles.countText}>
                {countData?.count[0]?.cancelCount}
              </Text>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(NavigationStrings.NOTIFICATION_STATUS_SCREEN);
        }}
      >
        <ImageBackground
          source={icons.Notifyicon}
          style={[styles.imageBack, { height: scale(23), width: scale(25) }]}
        >
          {countData?.count[0]?.notificationCount > 0 && (
            <TouchableOpacity style={[styles.notiView]}>
              <Text style={[styles.countText]}>.</Text>
            </TouchableOpacity>
          )}
        </ImageBackground>
      </TouchableOpacity>

      {/* //Index 1 Modal */}
      <UserReserveModel
        visible={reseveModel}
        onRequestClose={() => setReseveModel(false)}
        data={reserveData}
        confirmText={CONTEXT.confirm}
        rejectText={CONTEXT.reject}
        onConfirm={(data) => {
          setReseveModel(false);
          setSelectedState(0);
          setModalConfirm(true);
          updateConfirmData(data);
        }}
        onReject={(data) => {
          setReseveModel(false);
          setSelectedState(0);
          setModalReject(true);
          updateRejectData(data);
        }}
      />

      {/* // Index 1 when click confirm */}
      <ConfirmModal
        data={confirmData}
        modalVisible={modalConfirm}
        setModalVisible={setModalConfirm}
        selectedState={selectedState}
      />

      {/* // index 1 when click reject */}
      <RejectionReasonModal
        visible={modalReject}
        closeModal={() => setModalReject(false)}
        confirmAction={(selectedOption) => {
          setModalReject(false);
          setModalRejected(true);
          updateSelectedReason(selectedOption); // Update selected reason in parent
        }}
        updateInput={updateInput} // Pass the function to update the input state
      />

      {/* //Index 1 when click final rejected */}
      <RejectionModal
        data={rejectData}
        selectedReason={selectedReason || input}
        modalVisible={modalRejected}
        setModalVisible={setModalRejected}
        selectedState={selectedState}
        cancel={true}
      />

      {/* //Index 2 Calendar Reservation Modal  */}
      <CalendarReservationModal
        visible={calendarReseveModel}
        closeModal={closeCalendarReservationModal}
        data={cancelData}
        setModalConfirm={(data) => {
          setCalendarReseveModel(false);
          setSelectedState(2);
          setModalConfirm(true);
          updateConfirmData(data);
        }}
        setSelectedState={setSelectedState}
        setCalendarRejectedModel={(data) => {
          setCalendarReseveModel(false);
          setCalendarRejectedModel(true);
          updateRejectData(data);
        }}
      />

      <CalendarRejectedModal
        visible={isCalendarRejectedModel}
        closeModal={closeCalendarRejectedModal}
        handleRadioButtonPress={handleRadioButtonPress}
        selectedOption={selectedOption}
        updateInput={updateInput}
        confirmAction={(selectedOption) => {
          updateSelectedReason(selectedOption); // Update selected reason in parent
        }}
        setModalRejected={() => setModalRejected(true)}
      />
    </View>
  );
};

export default CustomHeader;
