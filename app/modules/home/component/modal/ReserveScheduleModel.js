// ReusableModal.js

import React, { useState } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import styles from "./Style";
import { images, COLORS, icons } from "../../constant";
import { CONTEXT } from "../../constant/theme";
import { scale, verticalScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import { PrimaryButton } from "../../../../components";
import sessionCreateApi from "../../../../api/trainer-home/sessionCreate";
import Spinner from "react-native-loading-spinner-overlay";
import { NavigationStrings } from "../../../../constants";

const ReserveScheduleModel = ({
  visible,
  onRequestClose,
  data,
  confirmText,
  rejectText,
  onConfirm,
  onReject,
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  const [memberID, setMemberId] = useState(false);

  const selectedUser = data && data.length > 0 ? data[0] : null;

  const handleNavigation = async (nav) => {
    if (nav === "confirm") {
      setLoading(true);
      const sessionDates = data.map((item) => {
        const [timeStr, period] = item.time.split(" ");
        const [hoursStr, minutesStr] = timeStr.split(":");
        let hours = parseInt(hoursStr, 10);
        if (period === "PM" && hours !== 12) {
          hours += 12;
        }
        const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
        const formattedTime = `${formattedHours}:${minutesStr}`;
        return {
          date: item.date,
          time: formattedTime,
        };
      });
      const reservations = {
        memberId: data[0].id,
        sessionDates: sessionDates,
      };

      try {
        const response = await sessionCreateApi(reservations);
        setLoading(false);
        onConfirm();
        navigation.navigate(NavigationStrings.CALENDER_SCREEN);
        onReject();
      } catch (error) {
        setLoading(false);

        console.log(JSON.stringify("errrr:::::", error));
      }
    } else {
      onReject();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}.${day}`;
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
        onPress={() => handleNavigation("confirm")}
      />
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.modelViewcontainer}>
          <View style={styles.viewModal}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={onRequestClose}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>

            <View style={[styles.requestTextView, { marginBottom: 20 }]}>
              <Text
                numberOfLines={1}
                style={[styles.requestTextStyle, { marginLeft: scale(6) }]}
              >
                {CONTEXT.ReserveSchedule}
              </Text>
            </View>
            {selectedUser && (
              <View style={styles.requestTextView}>
                <View style={{ gap: 3, width: "100%" }}>
                  <FastImage source={images.User} style={styles.userIcon} />
                  <Text
                    style={{
                      ...styles.userTextStyle,
                      width: "60%",
                      textAlign: "center",
                    }}
                    numberOfLines={1}
                  >
                    {selectedUser?.user}
                  </Text>
                </View>
              </View>
            )}
            <View style={[styles.horizontalLine, { width: scale(320) }]} />
            <Text style={[styles.availableText]}>
              {CONTEXT.reservation_repeat}
            </Text>
            <FlatList
              data={data}
              // keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    backgroundColor: COLORS.gray,
                    marginVertical: 15,
                    marginHorizontal: 20,
                  }}
                />
              )}
              renderItem={({ item }) => (
                <View style={styles.requestTextView}>
                  <View style={styles.boxView}>
                    <Text style={styles.timeText}>
                      {formatDate(item?.date)}
                    </Text>
                    <View style={styles.requestTextView}>
                      <FastImage
                        source={images.CalendarIcon}
                        style={styles.smallIcon}
                      />
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.smallTextStyle,
                          { marginLeft: scale(6) },
                        ]}
                      >
                        {CONTEXT.date}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.boxView}>
                    <Text style={styles.timeText}>{item?.time}</Text>
                    <View style={styles.requestTextView}>
                      <FastImage
                        source={images.ClockIcon}
                        style={styles.smallIcon}
                      />
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.smallTextStyle,
                          { marginLeft: scale(6) },
                        ]}
                      >
                        {CONTEXT.time}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.boxView}>
                    <Text style={styles.timeText}>{item?.session}</Text>
                    <View style={styles.requestTextView}>
                      <FastImage
                        source={images.SessionIcon}
                        style={styles.sessionIcon}
                      />
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.smallTextStyle,
                          { marginLeft: scale(6) },
                        ]}
                      >
                        {CONTEXT.session}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
            <View style={[styles.horizontalLine, { width: scale(320) }]} />

            {Button()}
            <Spinner
              visible={loading}
              textContent={"Loading..."}
              textStyle={{ color: "#FFF" }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReserveScheduleModel;
