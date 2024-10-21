// RejectionModal.js

import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { icons, images } from "../../constant";
import styles from "./Style";
import { CONTEXT, COLORS } from "../../constant/theme";
import { scale, verticalScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import sessionConfirmApi from "../../../../api/trainer-home/sessionConfirm";
import { useDispatch } from "react-redux";
import { workoutLoading } from "../../../../redux/workoutSlice";
import cancelConfirmApi from "../../../../api/trainer-home/cancelConfirm";

const RejectionModal = ({
  modalVisible,
  setModalVisible,
  selectedState,
  data,
  selectedReason,
  cancel,
}) => {
  const dispatch = useDispatch();

  const handleConfirm = async (accept, sessionId) => {
    try {
      let param = {
        isAccepted: accept,
        sessionId,
        rejectReason: selectedReason,
      };
      if (cancel) {
        const response = await cancelConfirmApi(param);
      } else {
        const response = await sessionConfirmApi(param);
      }
      dispatch(workoutLoading(true));
      setModalVisible(false);
    } catch (error) {
      setModalVisible(false);
      console.log("error", error);
    }
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 || 12; // Convert midnight (0 hours) to 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
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
                  selectedState === 0 ? icons.Contact : icons.CalenderIcon
                }
                style={styles.reserveIcon}
              />
              <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
                {selectedState === 0
                  ? CONTEXT.ReserveRequest
                  : CONTEXT.ReserveCancel}
              </Text>
            </View>

            <View
              style={{ alignSelf: "center", marginVertical: verticalScale(25) }}
            >
              <FastImage
                source={images.rejected}
                style={{
                  width: scale(110),
                  height: verticalScale(110),
                  resizeMode: "contain",
                }}
              />
            </View>

            <Text style={styles.rejectedText}>Rejected</Text>

            <View
              style={[
                styles.requestTextView,
                {
                  width: scale(180),
                  marginTop: verticalScale(28),
                  justifyContent: "space-between",
                  marginBottom: 40,
                  gap: 10,
                },
              ]}
            >
              <View style={{ marginRight: 10, gap: 10, width: 60 }}>
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
                  {formatDate(data.bookedDate)}
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
                  {formatTime(data.bookedDate)}
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
            <TouchableOpacity
              onPress={() => {
                handleConfirm(false, data.id);
              }}
              style={styles.confirmButton}
            >
              <Text
                style={[
                  styles.smallTextStyle,
                  { fontSize: scale(12), color: COLORS.black },
                ]}
              >
                {CONTEXT.confirm}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RejectionModal;
