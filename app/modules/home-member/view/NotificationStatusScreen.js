// ReusableModal.js

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import { COLORS, FONTS, icons, images } from "../constant";
import { CONTEXT } from "../constant/theme";
import NotificationsHeader from "../component/notifications/notificationsHeader";
import { useDispatch, useSelector } from "react-redux";
import notificationsListApi from "../../../api/member-home/notificationsListApi";
import {
  notificationsListRequest,
  notificationsListSuccess,
} from "../../../redux/geNotificationsListSlice";
import Spinner from "react-native-loading-spinner-overlay";
import ConfirmModalReserve from "../component/modal/ConfirmModalReserve";
import RejectionReasonModal from "../component/modal/RejectionReasonModal";
import RejectionModal from "../component/modal/RejectionModal";
import sessionConfirmApi, {
  updateNotificationList,
} from "../../../api/member-home/sessionConfirm";
import moment from "moment";
import { NavigationStrings } from "../../../constants";
import { PrimaryButton } from "../../../components";
import SignatureScreen from "react-native-signature-canvas";
import uploadImageBase64Api from "../../../api/assets/uploadImageBase64";
import { workoutLoading } from "../../../redux/workoutSlice";
import notificationsClearListApi from "../../../api/member-home/notificationsClearListApi";
import Seperator from "../../../components/seperator";
import { useFocusEffect } from "@react-navigation/native";

const NotificationStatusScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [reasonModal, setReasonModal] = useState(false);
  const [modalConfirmReserve, setModalConfirmReserve] = useState(false);
  const [modalRejected, setModalRejected] = useState(false);
  const [modalSignature, setModalSignatureVisible] = useState(false);
  const [input, setInput] = useState(null);
  const [signatureButton, setSignatureButton] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedState, setSelectedState] = useState(0);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [date, setDate] = useState();
  const [selectedData, setSelecteData] = useState();
  const reload = useSelector((state) => state?.work?.workoutReload);

  const opacity = useSharedValue(0);
  const ref = useRef();

  const notifications =
    useSelector((state) => state.geNotificationsList.data) || [];

  useFocusEffect(
    React.useCallback(() => {
      async function fetchNotiData() {
        setLoading(true);
        try {
          dispatch(notificationsListRequest());
          const response = await notificationsListApi();
          dispatch(workoutLoading(false));

          dispatch(notificationsListSuccess(response.data));
        } catch (error) {
          dispatch(notificationsListSuccess(error.response.data.message));
        } finally {
          setLoading(false);
        }
      }
      fetchNotiData();
      return () => {
        // You can clean up here if needed
      };
    }, [reload])
  );

  const formatDate = (dateString, type) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);

    const year = date.getFullYear().toString().substr(2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var formattedDate = year + "." + month + "." + day;

    yesterday.setDate(yesterday.getDate() - 1);

    if (type === "notification_date") {
      if (date.toDateString() === today.toDateString()) {
        return "Recent";
      } else if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
      } else {
        return formattedDate;
      }
    } else if (type === "notification_date_time") {
      const now = new Date();
      const diffMs = now - date;
      const diffSeconds = Math.floor(diffMs / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffSeconds < 60) {
        return diffSeconds + "s ago";
      } else if (diffMinutes < 60) {
        return diffMinutes + "m ago";
      } else if (date.toDateString() === yesterday.toDateString()) {
        return (
          "Yesterday, " +
          date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })
        );
      } else {
        return (
          formattedDate +
          " ," +
          date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })
        );
      }
    } else if (type === "notification_calendar_date") {
      return formattedDate;
    } else if (type === "notification_time") {
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const seconds = date.getUTCSeconds();

      const formattedHours = hours < 10 ? "0" + hours : hours;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

      const timeString = formattedHours + ":" + formattedMinutes;
      return timeString;
    }
  };

  const groupedNotifications = notifications?.reduce((acc, notification) => {
    const date = new Date(notification.modifyDate).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notification);
    return acc;
  }, {});

  const updateInput = (text) => {
    setInput(text);
  };

  const updateSelectedReason = (reason) => {
    setSelectedReason(reason);
  };
  const handleClearAllNotification = async () => {
    try {
      const response = await notificationsClearListApi();
      dispatch(workoutLoading(true));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPressed = async (accept) => {
    try {
      const paramsData = {
        isAccepted: accept,
        sessionId: selectedData?.item?.metaData?.id,
      };
      if (!accept) {
        paramsData.rejectReason = selectedReason;
      }
      const response = await sessionConfirmApi(paramsData);
      const updateListResponse = await updateNotificationList(
        selectedData?.item.id
      );
      dispatch(workoutLoading(true));
    } catch (error) {
      console.log(JSON.stringify(error?.response?.data?.message));
    } finally {
      !accept ? setModalRejected(false) : setModalConfirmReserve(false);
    }
  };
  const onPressCancelButtons = async (item) => {
    setLoading(true);
    try {
      const updateListResponse = await updateNotificationList(item?.id);
      console.log("resss", JSON.stringify(updateListResponse));
      dispatch(workoutLoading(true));
      setLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error?.response?.data?.message));
    } finally {
      setLoading(false);
      dispatch(workoutLoading(false));
    }
  };

  const onPressitemButtons = (item, type) => {
    setSelecteData(item);
    setEndTime(moment(item?.metaData?.date).format("HH:mm"));
    setStartTime(moment(item?.metaData?.date).format("HH:mm"));
    !type ? setReasonModal(true) : setModalConfirmReserve(true);
  };
  const handleSignature = async (signature) => {
    try {
      if (signature) {
        setSignatureButton(false);
        setModalSignatureVisible(false);

        const imgResponse = await uploadImageBase64Api(
          signature,
          selectedData?.item?.metaData?.id
        );
        console.log(imgResponse);
        const updateListResponse = await updateNotificationList(
          selectedData?.item?.id
        );
        dispatch(workoutLoading(true));

        if (imgResponse.success) {
          setModalSignatureVisible(false);
        } else {
          throw new Error("Failed to upload image");
        }
      }
    } catch (error) {
      console.log(JSON.stringify(error?.response?.data?.message));
      setModalSignatureVisible(false);
    }
  };

  const handleEmpty = () => {
    setSignatureData(null); // Clear the signature data if empty
    setSignatureButton(false); // Disable the button if empty
  };

  const handleConfirm = () => {
    ref.current.readSignature();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const ModalSignature = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSignature}
        onRequestClose={() => {
          setModalSignatureVisible(false);
        }}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modelViewcontainer}>
            <View style={{ marginTop: Dimensions.get("window").height * 0.25 }}>
              <View
                style={{
                  backgroundColor: "white",
                  paddingVertical: 2,
                  width: "90%",
                  alignSelf: "center",
                  borderRadius: 20,
                }}
              >
                <Animated.View
                  style={[
                    {
                      height: 150,
                      width: "90%",
                      alignSelf: "center",
                      borderRadius: 20,
                      overflow: "hidden",
                      backgroundColor: COLORS.gray1,
                    },
                    animatedStyle,
                  ]}
                >
                  <SignatureScreen
                    ref={ref}
                    onOK={handleSignature}
                    onEmpty={handleEmpty}
                    onEnd={() => setSignatureButton(true)}
                    autoClear={true}
                    backgroundColor={COLORS.gray}
                    penColor={COLORS.white}
                    style={{ flex: 1 }}
                    webStyle={`
                  .m-signature-pad {
                    background-color: ${COLORS.gray1};
                    border: none;
                    box-shadow: none;
                  }
                  .m-signature-pad--body {
                    border: none;
                  }
                  .m-signature-pad--footer {
                    display: none;
                  }
                  .m-signature-pad--body canvas {
                    background-color: ${COLORS.gray1};
                  }
                `}
                  />
                </Animated.View>
              </View>
              <View style={styles.buttonContainer}>
                {!signatureButton ? (
                  <PrimaryButton
                    title={"Confirm"}
                    style={90}
                    color={true}
                    // edit={false}
                    // onPress={{handleConfirm}}
                  />
                ) : (
                  <PrimaryButton
                    title={"Confirm"}
                    style={90}
                    edit={true}
                    onPress={handleConfirm}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  function ModalContainer() {
    return (
      <>
        <ConfirmModalReserve
          date={selectedData?.metaData}
          startTime={startTime}
          endTime={endTime}
          onRequestClose={() => setModalConfirmReserve(false)}
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
            updateSelectedReason(selectedOption);
          }}
          updateInput={updateInput}
        />
        <RejectionModal
          date={selectedData?.metaData}
          startTime={startTime}
          endTime={endTime}
          selectedReason={selectedReason || input}
          modalVisible={modalRejected}
          setModalVisible={(val) => {
            handleConfirmPressed(val);
          }}
          selectedState={selectedState}
          onCloseModal={() => setModalRejected(false)}
        />
      </>
    );
  }

  const RejectAcceptButton = (item) => {
    return (
      <View
        style={[
          styles.requestTextView,
          {
            alignSelf: "flex-end",
            marginRight: scale(5),
            gap: scale(5),
            marginTop: 10,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => onPressCancelButtons(item.item)}
          style={[
            styles.confirmStyle,
            {
              borderWidth: 1,
              borderColor: COLORS.white,
            },
          ]}
        >
          <Text style={styles.rejectText}>{CONTEXT.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPressitemButtons(item, 1)}
          style={[styles.confirmStyle, { backgroundColor: COLORS.themGreen }]}
        >
          <Text style={styles.confirmText}>{CONTEXT.confirm}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const ViewDetailButton = (item, type) => {
    return (
      <View
        style={[
          styles.requestTextView,
          {
            alignSelf: "flex-end",
            marginRight: scale(5),
            gap: scale(5),
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => onPressCancelButtons(item)}
          style={[
            styles.confirmStyle,
            {
              borderWidth: 1,
              borderColor: COLORS.white,
            },
          ]}
        >
          <Text style={styles.rejectText}>{CONTEXT.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // closeModal(false);
            // setModalConfirm(true);
            navigation.navigate(NavigationStrings.DIET_SCREEN);
          }}
          style={[styles.confirmStyle, { backgroundColor: COLORS.themGreen }]}
        >
          <Text style={styles.confirmText}>{CONTEXT.view}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const SignButton = (item, type) => {
    return (
      <View
        style={[
          styles.requestTextView,
          {
            alignSelf: "flex-end",
            marginRight: scale(5),
            gap: scale(5),
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => onPressCancelButtons(item)}
          style={[
            styles.confirmStyle,
            {
              borderWidth: 1,
              borderColor: COLORS.white,
            },
          ]}
        >
          <Text style={styles.rejectText}>{CONTEXT.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // closeModal(false);
          // setModalConfirm(true);
          onPress={() => {
            opacity.value = withTiming(1, {
              duration: 500,
              easing: Easing.inOut(Easing.ease),
            });
            setSelecteData(item);
            setModalSignatureVisible(true);
          }}
          // navigation.navigate(NavigationStrings.DIET_SCREEN);

          style={[styles.confirmStyle, { backgroundColor: COLORS.themGreen }]}
        >
          <Text style={styles.confirmText}>{"Sign"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const SessionsNotificationCard = ({ item, formatDate }) => {
    const isSessionCompleted =
      item?.metaData?.totalSessions === item?.metaData?.sessionCompleted;
    return (
      <TouchableOpacity style={styles.itemStateColor}>
        <View style={styles.item}>
          <View style={styles.timeView}>
            <Text style={styles.minText}>
              {formatDate(item?.modifyDate, "notification_date_time")}
            </Text>
          </View>
          <View style={styles.itemDetailContainer}>
            <FastImage source={icons.notify_user} style={styles.image} />
            <View style={styles.column}>
              <Text
                style={{
                  ...styles.titleNotify,
                  color: isSessionCompleted ? COLORS.themGreen : COLORS.white,
                }}
              >
                {item?.notificationText}
              </Text>
              <View
                style={[
                  styles.requestTextView,
                  {
                    justifyContent: "space-between",
                    alignSelf: "flex-start",
                  },
                ]}
              >
                <View style={styles.requestTextView}>
                  <FastImage
                    source={images.CalendarIcon}
                    style={[styles.smallIcon]}
                  />
                  <Text
                    style={[
                      styles.smallTextStyle,
                      {
                        marginLeft: scale(6),
                      },
                    ]}
                  >
                    {formatDate(
                      item?.metaData?.date,
                      "notification_calendar_date"
                    )}
                  </Text>
                </View>
                <View style={styles.verticalLine} />
                <View style={[styles.requestTextView]}>
                  <FastImage
                    source={images.ClockIcon}
                    style={[styles.smallIcon]}
                  />
                  <Text
                    style={[
                      styles.smallTextStyle,
                      {
                        marginLeft: scale(6),
                      },
                    ]}
                  >
                    {formatDate(item?.metaData?.date, "notification_time")}
                  </Text>
                </View>
                <View style={styles.verticalLine} />
                <View style={styles.requestTextView}>
                  <FastImage
                    source={icons.Session_icon}
                    style={[styles.imageSmall]}
                  />
                  <Text
                    style={[
                      styles.smallTextStyle,
                      {
                        marginLeft: scale(6),
                      },
                    ]}
                  >
                    {item?.metaData?.sessionCompleted +
                      "/" +
                      item?.metaData?.totalSessions}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {!item?.isCompleted && item.actionType === "accept_reject" ? (
          <>
            <View style={styles.horizontalLine} />
            <RejectAcceptButton item={item} />
          </>
        ) : (
          <View
            style={[
              styles.requestTextView,
              {
                alignSelf: "flex-end",
                marginRight: scale(5),
                gap: scale(5),
                marginTop: 10,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => onPressCancelButtons(item, 0)}
              style={[
                styles.confirmStyle,
                {
                  borderWidth: 1,
                  borderColor: COLORS.white,
                },
              ]}
            >
              <Text style={styles.rejectText}>{CONTEXT.close}Close</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
          onPress={() => onPressitemButtons(item,1)}
          style={[
            styles.confirmStyle,
            { backgroundColor: COLORS.themGreen },
          ]}
        >
          <Text style={styles.confirmText}>{CONTEXT.confirm}</Text>
        </TouchableOpacity> */}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const DietLogNotificationCard = ({ item, formatDate }) => {
    return (
      <TouchableOpacity style={styles.itemStateColor}>
        <View style={styles.item}>
          <View style={styles.timeView}>
            <Text style={styles.minText}>
              {formatDate(item?.modifyDate, "notification_date_time")}
            </Text>
          </View>
          <View style={styles.itemDetailContainer}>
            <FastImage source={icons.notify_user} style={styles.image} />
            <View style={styles.column}>
              <Text style={styles.titleNotify}>{item?.notificationText}</Text>
              <View
                style={[
                  styles.requestTextView,
                  {
                    justifyContent: "space-between",
                    alignSelf: "flex-start",
                  },
                ]}
              >
                {/* <Text style={{ color: COLORS.white }}>
                  Please sign to confirm that the session has taken place.
                </Text> */}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <ViewDetailButton item={item} />
      </TouchableOpacity>
    );
  };

  const MessageNotificationCard = ({ item, formatDate }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPressCancelButtons(item);

          let conversationId = item?.metaData?.id;

          navigation.navigate(NavigationStrings.CHAT, {
            conversationId,
          });
        }}
        style={styles.itemStateColor}
      >
        <View style={styles.item}>
          <View style={styles.timeView}>
            <Text style={styles.minText}>
              {formatDate(item?.modifyDate, "notification_date_time")}
            </Text>
          </View>
          <View style={styles.itemDetailContainer}>
            <FastImage source={icons.notify_user} style={styles.image} />
            <View style={styles.column}>
              <Text style={styles.titleNotify}>{item?.notificationText}</Text>
              <View
                style={[
                  styles.requestTextView,
                  {
                    justifyContent: "space-between",
                    alignSelf: "flex-start",
                  },
                ]}
              >
                <Text style={{ color: COLORS.white }}>
                  {item?.metaData?.text}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const WorkoutLogNotificationCard = ({ item, formatDate }) => {
    return (
      <TouchableOpacity style={styles.itemStateColor}>
        <View style={styles.item}>
          <View style={styles.timeView}>
            <Text style={styles.minText}>
              {formatDate(item.modifyDate, "notification_date_time")}
            </Text>
          </View>
          <View style={styles.itemDetailContainer}>
            <FastImage source={icons.notify_user} style={styles.image} />
            <View style={styles.column}>
              <Text style={styles.titleNotify}>{item.notificationText}</Text>
              <View
                style={[
                  styles.requestTextView,
                  {
                    justifyContent: "space-between",
                    alignSelf: "flex-start",
                  },
                ]}
              >
                <Text style={{ color: COLORS.white }}>
                  {item?.metaData?.text}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <SignButton item={item} />
      </TouchableOpacity>
    );
  };

  const NotificationItem = ({ item, formatDate }) => {
    return (
      <>
        {item?.notificationType === "sessions" ? (
          <SessionsNotificationCard item={item} formatDate={formatDate} />
        ) : item?.notificationType === "diet_logs" ? (
          <DietLogNotificationCard item={item} formatDate={formatDate} />
        ) : item?.notificationType === "message" ? (
          <MessageNotificationCard item={item} formatDate={formatDate} />
        ) : item?.notificationType === "workout_logs" ? (
          <WorkoutLogNotificationCard item={item} formatDate={formatDate} />
        ) : null}
      </>
    );
  };

  const NotificationList = ({ notifications, formatDate }) => {
    return (
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NotificationItem item={item} formatDate={formatDate} />
        )}
      />
    );
  };

  function renderHeader() {
    return (
      <NotificationsHeader
        navigation={navigation}
        onPressChat={() => navigation.navigate(NavigationStrings.CHAT_LIST)}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.themeGray }}>
      {renderHeader()}
      {ModalContainer()}
      {ModalSignature()}
      <ScrollView style={{ marginBottom: verticalScale(50) }}>
        {notifications?.length > 0 ? (
          <TouchableOpacity
            onPress={() => handleClearAllNotification()}
            style={styles.imageCross}
          >
            <Image source={icons.CrossButton} style={styles.crossImage} />
          </TouchableOpacity>
        ) : (
          <Seperator title={"No Data Available"} dimesion={150} />
        )}
        {Object.entries(groupedNotifications).map(([date, notifications]) => (
          <View key={date} style={styles.notificationView}>
            <Text style={styles.dateText}>
              {formatDate(date, "notification_date")}
            </Text>
            <NotificationList
              notifications={notifications}
              formatDate={formatDate}
            />
          </View>
        ))}
      </ScrollView>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
    </SafeAreaView>
  );
};

export default NotificationStatusScreen;

const styles = StyleSheet.create({
  notificationView: { marginBottom: 5, width: "93%", alignSelf: "center" },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(10),
  },
  buttonText: {
    fontSize: moderateScale(16),
    color: "blue",
  },
  viewContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
  requestTextView: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  reserveIcon: {
    width: scale(23),
    height: scale(23),
    resizeMode: "contain",
  },
  timeText: {
    fontSize: 13,
    marginBottom: verticalScale(4),
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  smallIcon: {
    width: scale(12),
    height: verticalScale(11),
    resizeMode: "contain",
  },
  sessionIcon: {
    width: scale(14),
    height: verticalScale(9),
    resizeMode: "contain",
  },
  smallTextStyle: {
    color: COLORS.white,
    fontSize: 13,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  confirmText: {
    fontFamily: FONTS.ARCHI_SEMBOLD,
    fontSize: 12,
    color: COLORS.black,
  },
  confirmLargeText: {
    color: COLORS.white,
    fontSize: 26,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    textAlign: "center",
  },
  rejectText: {
    fontSize: 12,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    color: COLORS.white,
  },
  boxView: {
    alignItems: "center",
    width: scale(70),
    height: scale(52),
    borderRadius: verticalScale(2),
    backgroundColor: COLORS.calendarColor,
    marginLeft: scale(5),
    padding: scale(8),
    justifyContent: "space-around",
  },
  confirmStyle: {
    alignItems: "center",
    width: 70,
    height: 27,
    borderRadius: verticalScale(15),
    marginLeft: scale(10),
    padding: scale(3),
    justifyContent: "center",
  },
  verticalLine: {
    borderRightWidth: 0.7,
    borderRightColor: COLORS.white,
    marginHorizontal: verticalScale(8),
    width: scale(4),
    height: verticalScale(10),
  },
  horizontalLine: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginVertical: scale(10),
    width: "100%",
    alignSelf: "center",
  },
  item: {
    width: "95%",
    alignSelf: "center",
  },
  image: {
    width: scale(45),
    height: scale(43),
    resizeMode: "contain",
  },
  column: {
    justifyContent: "space-around",
    flex: 1,
    gap: 10,
  },

  titleNotify: {
    fontSize: 16,
    fontFamily: FONTS.ARCHI_MEDIUM,
    color: COLORS.white,
  },
  timeView: {
    alignItems: "flex-end",
    paddingBottom: scale(2),
  },
  minText: {
    fontSize: 10,
    color: COLORS.placeholderColor,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  itemState: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    flexDirection: "column",
    flexGrow: 1,
    height: 150,
  },
  itemStateColor: {
    marginBottom: 10,
    backgroundColor: "#3F3F3FB2",
    paddingBottom: scale(15),
    paddingTop: scale(5),
    borderRadius: 10,
  },
  itemDetailContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  dateText: { fontSize: 18, marginBottom: 10, color: COLORS.white },
  imageSmall: {
    height: verticalScale(10),
    width: 20,
    resizeMode: "contain",
  },
  modelViewcontainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "flex-start",
  },
  crossImage: {
    width: scale(12),
    height: scale(11),
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: COLORS.black,
  },
  imageCross: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    right: 40,
    width: 25,
    height: 25,
    backgroundColor: COLORS.themGreen,
    borderRadius: 40,
    justifyContent: "center",
    zIndex: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
