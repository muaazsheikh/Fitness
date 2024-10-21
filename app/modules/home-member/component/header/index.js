import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
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
import NotificationStatusModal from "../modal/NotificationStatusModal";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoSessionModal from "../modal/InfoSessionModal";
import { NavigationStrings } from "../../../../constants";
import { useSelector } from "react-redux";

const CustomHeader = ({
  navigation,
  title,
  onPressDrawer,
  showIcon,
  onPressReserve,
  onPressCalendar,
  onPressList,
  onPressNotify,
  currentMonthYear,
  onMonthYearPress,
}) => {
  const [reseveModel, setReseveModel] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [selectedState, setSelectedState] = useState(0);
  const [modalReject, setModalReject] = useState(false);
  const [modalRejected, setModalRejected] = useState(false);
  const [infoModal, setInfoModal] = useState(false);

  const [calendarReseveModel, setCalendarReseveModel] = useState(false);
  const [isCalendarRejectedModel, setCalendarRejectedModel] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [modalNotification, setModalNotification] = useState(false);
  const countData = useSelector((state) => state?.trainerMonth?.user);

  function getMonthName() {
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
      const formattedDate = `${currentDate.getFullYear()}.${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;
      return formattedDate;
    }
  }

  // Close Calendar Reservation Modal
  const closeCalendarReservationModal = () => {
    setCalendarReseveModel(false);
  };

  // Close Calendar Rejected Modal
  const closeCalendarRejectedModal = () => {
    setCalendarRejectedModel(false);
  };

  // Handle radio button press for Calendar Rejected Modal
  const handleRadioButtonPress = (option) => {
    setSelectedOption(option);
  };

  const ReserveData = [
    { id: 1, date: "10.20", time: "10:30am", session: "3/20", user: "Costa" },
    { id: 2, date: "11.03", time: "11:20am", session: "3/20", user: "Jeams" },
    { id: 3, date: "11.12", time: "09:15am", session: "3/20", user: "Tom" },
    { id: 4, date: "12.09", time: "12:10pm", session: "3/20", user: "Costa" },
  ];

  const ReserveCancelData = [
    {
      id: 8,
      date: "10.20",
      time: "10:30am",
      session: "3/20",
      user: "Costa",
      state: true,
    },
    {
      id: 9,
      date: "11.03",
      time: "11:20am",
      session: "3/20",
      user: "Jeams",
      state: true,
    },
    {
      id: 10,
      date: "11.12",
      time: "09:15am",
      session: "3/20",
      user: "Tom",
      state: false,
    },
  ];

  const ReserveNotifyData = [
    {
      id: 8,
      date: "10.20",
      time: "10:30am",
      title: "Session acceptance request from Aris",
      user: "15m ago",
      state: true,
    },
    {
      id: 9,
      date: "11.03",
      time: "11:20am",
      user: "12m ago",
      title: "Session acceptance request",
      state: true,
    },
    {
      id: 10,
      date: "11.12",
      time: "09:15am",
      title: "Session acceptance ",
      user: "10m ago",
      state: false,
    },
    {
      id: 8,
      date: "10.20",
      time: "10:30am",
      title: "Session acceptance request from Aris",
      user: "15m ago",
      state: true,
    },
    {
      id: 9,
      date: "11.03",
      time: "11:20am",
      user: "12m ago",
      title: "Session acceptance request",
      state: true,
    },
  ];

  return (
    <View style={styles.headerView}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={onPressDrawer}>
          <Image source={icons.DrawerIcon} style={styles.drowerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onMonthYearPress}>
          <Text style={styles.headingText}>{getMonthName()}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        {showIcon && (
          <TouchableOpacity onPress={() => setInfoModal(true)}>
            <ImageBackground
              source={icons.info_icon}
              style={styles.imageBack}
            ></ImageBackground>
          </TouchableOpacity>
        )}
        {showIcon && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NavigationStrings.NOTIFICATION_STATUS_SCREEN);
              // setModalNotification(true)
            }}
          >
            <ImageBackground source={icons.Notifyicon} style={styles.imageBack}>
              {countData?.count?.notificationCount > 0 && (
                <TouchableOpacity style={[styles.notiView]}>
                  <Text style={[styles.countText]}>.</Text>
                </TouchableOpacity>
              )}
            </ImageBackground>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationStrings.CHAT_LIST)}
        >
          <ImageBackground source={icons.chat_icon} style={styles.imageBack}>
            {countData?.count?.unreadMessageCount > 0 && (
              <TouchableOpacity style={[styles.notiView]}>
                <Text style={[styles.countText]}>.</Text>
              </TouchableOpacity>
            )}
          </ImageBackground>
        </TouchableOpacity>
      </View>

      {/* //Index 1 Modal */}
      <UserReserveModel
        visible={reseveModel}
        onRequestClose={() => setReseveModel(false)}
        data={ReserveData}
        confirmText={CONTEXT.confirm}
        rejectText={CONTEXT.reject}
        onConfirm={() => {
          setReseveModel(false);
          setSelectedState(0);
          setModalConfirm(true);
        }}
        onReject={() => {
          setReseveModel(false);
          setSelectedState(0);
          setModalReject(true);
        }}
      />

      {/* // Index 1 when click confirm */}
      <ConfirmModal
        modalVisible={modalConfirm}
        setModalVisible={setModalConfirm}
        selectedState={selectedState}
      />

      {/* // index 1 when click reject */}
      <RejectionReasonModal
        visible={modalReject}
        closeModal={() => setModalReject(false)}
        confirmAction={(selectedOption) => {
          setModalReject(false), setModalRejected(true);
        }}
      />

      {/* //Index 1 when click final rejected */}
      <RejectionModal
        modalVisible={modalRejected}
        setModalVisible={setModalRejected}
        selectedState={selectedState}
      />
      <InfoSessionModal
        modalVisible={infoModal}
        setModalVisible={setInfoModal}
        selectedState={selectedState}
      />

      {/* //Index 2 Calendar Reservation Modal  */}
      <CalendarReservationModal
        visible={calendarReseveModel}
        closeModal={closeCalendarReservationModal}
        data={ReserveCancelData} // Assuming you have ReserveCancelData available
        setModalConfirm={() => {
          setCalendarReseveModel(false);
          setSelectedState(2);
          setModalConfirm(true);
        }}
        setSelectedState={setSelectedState}
        setCalendarRejectedModel={() => {
          setCalendarReseveModel(false);
          setCalendarRejectedModel(true);
        }}
      />

      <CalendarRejectedModal
        visible={isCalendarRejectedModel}
        closeModal={closeCalendarRejectedModal}
        handleRadioButtonPress={handleRadioButtonPress}
        selectedOption={selectedOption}
        setModalRejected={() => setModalRejected(true)}
      />

      <NotificationStatusModal
        visible={modalNotification}
        closeModal={() => {
          setModalNotification(false);
          setModalConfirm(true);
        }}
        data={ReserveNotifyData}
      />
    </View>
  );
};

export default CustomHeader;
