// ConfirmModal.js

import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { icons, images } from "../../constant";
import styles from "./Style";
import { CONTEXT } from "../../constant/theme";
import { scale, verticalScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import Spinner from "react-native-loading-spinner-overlay";
import sessionCreateApi from "../../../../api/member-home/sessionCreate";
import moment from "moment";

const ConfirmModal = ({
  modalVisible,
  setModalVisible,
  selectedState,
  time,
  date,
}) => {
  const [loading, setLoading] = useState(false);

  const handleNavigation = async (nav) => {
    const sessionDates = [
      {
        date: moment(date).format("YYYY-MM-DD"),
        time: moment(time, "hh:mm A").format("HH:mm"),
      },
    ];
    try {
      const response = await sessionCreateApi(sessionDates);
      setLoading(false);
      setModalVisible(false);
    } catch (error) {
      setLoading(false);

      console.log(JSON.stringify(error.response.data));
    }
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
              <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
                Session Reservation Sent
              </Text>
            </View>

            <View
              style={{ alignSelf: "center", marginVertical: verticalScale(25) }}
            >
              <Image
                source={images.calendar_session}
                style={{
                  width: scale(50),
                  height: scale(50),
                  resizeMode: "contain",
                }}
              />
            </View>

            <View
              style={[
                styles.requestTextView,
                {
                  width: scale(170),
                  marginTop: verticalScale(28),
                  justifyContent: "space-between",
                  marginBottom: 20,
                  gap: 10,
                },
              ]}
            >
              <View style={{ alignItems: "center" }}>
                <FastImage source={images.User} style={styles.userIcon} />
                <Text style={[styles.requestTextStyle, { fontSize: 14 }]}>
                  Costa
                </Text>
              </View>

              <View style={styles.boxView}>
                <Text style={styles.timeText}>
                  {moment(date).format("MM.DD")}
                </Text>
                <View style={styles.requestTextView}>
                  <FastImage
                    source={images.CalendarIcon}
                    style={styles.smallIcon}
                  />
                  <Text
                    style={[styles.smallTextStyle, { marginLeft: scale(6) }]}
                  >
                    Date
                  </Text>
                </View>
              </View>

              <View style={styles.boxView}>
                {time ? (
                  <Text style={styles.timeText}>{time}</Text>
                ) : (
                  <Text style={styles.timeText}>{"10:00"}</Text>
                )}
                <View style={styles.requestTextView}>
                  <FastImage
                    source={images.ClockIcon}
                    style={styles.smallIcon}
                  />
                  <Text
                    style={[styles.smallTextStyle, { marginLeft: scale(6) }]}
                  >
                    Time
                  </Text>
                </View>
              </View>
            </View>
            <Text
              numberOfLines={3}
              style={[
                styles.smallTextStyle,
                {
                  marginLeft: scale(6),
                  alignSelf: "center",
                  textAlign: "center",
                },
              ]}
            >
              It will be confirmed after the trainer's confirmation.{"\n"}Once
              the reservation is confirmed, we will send{"\n"}you a message.
            </Text>
            {/* --------- Confirmed Button ------ */}
            <View style={{ marginTop: 25 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  handleNavigation();
                }}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmText}>{CONTEXT.confirm}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmModal;
