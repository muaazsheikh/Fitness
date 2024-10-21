import React, { useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { icons, images } from "../../constant";
import styles from "./Style";
import { CONTEXT } from "../../constant/theme";
import { scale, verticalScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import sessionConfirmApi from "../../../../api/trainer-home/sessionConfirm";
import { useDispatch } from "react-redux";
import { workoutLoading } from "../../../../redux/workoutSlice";

const ConfirmModal = ({
  modalVisible,
  setModalVisible,
  selectedState,
  data,
}) => {
  const dispatch = useDispatch();
  const handleConfirm = async (accept, sessionId) => {
    try {
      let param = {
        isAccepted: accept,
        sessionId,
      };
      const response = await sessionConfirmApi(param);
      console.log(response);
      dispatch(workoutLoading(true));
      setModalVisible(false);
    } catch (error) {
      setModalVisible(false);
      console.log(JSON.stringify(error?.response?.data));
    }
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours; // Ensures hours are always two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Ensures minutes are always two digits
    return `${formattedHours}:${formattedMinutes}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}.${day}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modelViewcontainer}>
          <View style={[styles.confirmModal]}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => setModalVisible(false)}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>

            <View style={styles.requestTextView}>
              <FastImage
                source={
                  selectedState === 2 ? icons.CalenderIcon : icons.Contact
                }
                style={styles.reserveIcon}
              />
              <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
                {selectedState === 2
                  ? CONTEXT.ReserveCancel
                  : CONTEXT.ReserveRequest}
              </Text>
            </View>

            <View
              style={{ alignSelf: "center", marginVertical: verticalScale(25) }}
            >
              <FastImage
                source={images.success}
                style={{
                  width: scale(110),
                  height: verticalScale(110),
                  resizeMode: "contain",
                }}
              />
            </View>

            <Text style={styles.confirmLargeText}>{CONTEXT.confirmed}</Text>

            <View
              style={[
                styles.requestTextView,
                {
                  width: scale(190),
                  marginTop: verticalScale(28),
                  justifyContent: "space-between",
                  marginBottom: 20,
                },
              ]}
            >
              <View style={{ alignItems: "center", gap: 10, width: 60 }}>
                <FastImage source={images.User} style={styles.userIcon} />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.requestTextStyle,
                    { fontSize: 14, alignSelf: "center" },
                  ]}
                >
                  {data?.name}
                </Text>
              </View>

              <View style={styles.boxView}>
                <Text style={styles.timeText}>
                  {formatDate(data?.bookedDate)}
                </Text>
                <View style={styles.requestTextView}>
                  <FastImage
                    source={images.CalendarIcon}
                    style={styles.smallIcon}
                  />
                  <Text
                    style={[styles.smallTextStyle, { marginLeft: scale(6) }]}
                  >
                    {CONTEXT.date}
                  </Text>
                </View>
              </View>

              <View style={styles.boxView}>
                <Text style={styles.timeText}>
                  {formatTime(data?.bookedDate)}
                </Text>
                <View style={styles.requestTextView}>
                  <FastImage
                    source={images.ClockIcon}
                    style={styles.smallIcon}
                  />
                  <Text
                    style={[styles.smallTextStyle, { marginLeft: scale(6) }]}
                  >
                    {CONTEXT.time}
                  </Text>
                </View>
              </View>
            </View>

            {/* --------- Confirmed Button ------ */}
            <View style={{ marginTop: 25 }}>
              <TouchableOpacity
                onPress={() => {
                  handleConfirm(true, data.id);
                }}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmText}>{CONTEXT.confirm}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmModal;
