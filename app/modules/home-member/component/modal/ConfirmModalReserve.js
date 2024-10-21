// ConfirmModal.js

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
import { CONTEXT } from "../../constant/theme";
import { scale, verticalScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import { PrimaryButton } from "../../../../components";
import moment from "moment";

const ConfirmModalReserve = ({
  modalVisible,
  setModalVisible,
  selectedState,
  onConfirm,
  onReject,
  onRequestClose,
  date,
  startTime,
  endTime,
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
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>

            <View style={styles.requestTextView}>
              <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
                Reservation Request
              </Text>
            </View>

            <View
              style={{ alignSelf: "center", marginVertical: verticalScale(25) }}
            >
              <FastImage
                source={images.success}
                style={{
                  width: scale(70),
                  height: scale(70),
                  resizeMode: "contain",
                }}
              />
            </View>

            <Text style={styles.confirmLargeText}>{CONTEXT.request}</Text>

            <View
              style={[
                {
                  marginTop: verticalScale(28),

                  marginBottom: 20,
                  flexDirection: "row",
                  alignSelf: "center",
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
                  {moment(date)?.format("MM.DD")}
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
            <View
              style={[
                styles.buttonContainer,
                {
                  alignSelf: "flex-end",
                  flexDirection: "row",
                  marginTop: 30,
                },
              ]}
            >
              <PrimaryButton
                title={"Request to cancel"}
                style={140}
                edit={true}
                color={true}
                onPress={() => {
                  onRequestClose();
                  onReject && onReject();
                }}
              />

              <PrimaryButton
                title={"Confirm"}
                style={90}
                edit={true}
                onPress={() => {
                  onConfirm && onConfirm();
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmModalReserve;
