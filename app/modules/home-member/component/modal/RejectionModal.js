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
import moment from "moment";

const RejectionModal = ({
  modalVisible,
  setModalVisible,
  date,
  startTime,
  endTime,
  onCloseModal
}) => {
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
              onPress={() => onCloseModal()}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>

            <View style={styles.requestTextView}>
              <Text
                style={[
                  styles.requestTextStyle,
                  { marginLeft: scale(6), textAlign: "center" },
                ]}
              >
                Reservation Cancellation{"\n"}Requested Sent
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

            <View
              style={[
                styles.requestTextView,
                {
                  marginTop: verticalScale(28),
                  justifyContent: "space-between",
                  marginBottom: 40,
                },
              ]}
            >
              <View style={{ marginRight: 10 }}>
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
                <Text style={styles.timeText}>{startTime}</Text>
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

              <View style={styles.boxView}>
                <Text style={styles.timeText}>{endTime}</Text>
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

            {/* --------- Confirmed Button ------ */}
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={styles.confirmButton}
            >
              <Text
                style={[
                  styles.smallTextStyle,
                  { fontSize: scale(12), color: COLORS.black },
                ]}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RejectionModal;
