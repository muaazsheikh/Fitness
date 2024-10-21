// RejectionModal.js

import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { images, icons } from "../../../home/constant";
import styles from "./Style";
import { scale, verticalScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import { PrimaryButton } from "../../../../components";
import { NavigationStrings } from "../../../../constants";
import { CONTEXT } from "../../../home/constant/theme";

const RejectionModal = ({
  modalVisible,
  setModalVisible,
  selectedState,
  navigation,
  name,
  date,
  time,
  sessionHave,
  sessionDone,
}) => {
  const handleNavigation = (nav) => {
    if (nav === "Edit") {
      navigation.navigate(NavigationStrings.WRITE_WORKOUT_LOG_MEMBER);
      setModalVisible(false);
    } else {
      setModalVisible(false);
    }
  };

  const Button = () => (
    <View style={styles.buttonView}>
      <PrimaryButton
        title={"<  Back"}
        style={90}
        edit={true}
        color={true}
        onPress={() => handleNavigation("")}
      />
      <PrimaryButton
        title={"Confirm"}
        style={90}
        edit={true}
        color={false}
        onPress={() => handleNavigation("Edit")}
      />
    </View>
  );
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

            <View
              style={[
                styles.requestTextView,
                {
                  flexDirection: "row",
                  alignSelf: "center",
                  marginHorizontal: 10,
                },
              ]}
            >
              <FastImage
                source={icons.writing_workout}
                style={styles.reserveIcon}
              />
              <Text
                style={[
                  styles.requestTextStyle,
                  { marginLeft: scale(6), fontSize: 18 },
                ]}
              >
                {"Writing the workout log on " + date}
              </Text>
            </View>

            <View
              style={[
                styles.requestTextView,
                {
                  marginVertical: verticalScale(28),
                  justifyContent: "space-between",
                },
              ]}
            >
              <View style={{ marginRight: 10, width: 70, gap: 10 }}>
                <FastImage source={images.User} style={styles.userIcon} />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.requestTextStyle,
                    { fontSize: 14, textAlign: "center" },
                  ]}
                >
                  {name}
                </Text>
              </View>

              <View style={styles.boxView}>
                <Text style={styles.timeText}>{date}</Text>
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
                <Text style={styles.timeText}>{time}</Text>
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

              <View style={styles.boxView}>
                <Text style={styles.timeText}>
                  {sessionDone}/{sessionHave}
                </Text>
                <View style={styles.requestTextView}>
                  <Image source={images.SessionIcon} style={styles.smallIcon} />
                  <Text
                    style={[styles.smallTextStyle, { marginLeft: scale(6) }]}
                  >
                    {CONTEXT.session}
                  </Text>
                </View>
              </View>
            </View>

            {/* --------- Confirmed Button ------ */}

            {Button()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RejectionModal;
