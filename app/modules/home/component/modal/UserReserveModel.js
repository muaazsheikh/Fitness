import React from "react";
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

const UserReserveModel = ({
  visible,
  onRequestClose,
  data,
  confirmText,
  rejectText,
  onConfirm,
  onReject,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modelViewcontainer}>
        <View style={styles.viewModal}>
          <TouchableOpacity
            style={styles.crossIconView}
            onPress={onRequestClose}
          >
            <FastImage source={icons.CrossButton} style={styles.crossImage} />
          </TouchableOpacity>

          <View style={[styles.requestTextView, { marginBottom: 20 }]}>
            <FastImage source={icons.Contact} style={styles.reserveIcon} />
            <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
              {CONTEXT.ReserveRequest}
            </Text>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.gray, // You can customize the color of the separator
                  marginVertical: 5,
                  marginHorizontal: 20, // You can customize the vertical margin of the separator
                }}
              />
            )}
            renderItem={({ item }) => (
              <View style={styles.requestTextView}>
                <View style={{ width: 45 }}>
                  <FastImage source={images.User} style={styles.userIcon} />
                  <Text numberOfLines={1} style={[styles.userTextStyle]}>{item?.name}</Text>
                </View>

                <View style={styles.boxView}>
                  <Text style={styles.timeText}>
                    {formatDate(item?.bookedDate)}
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
                  <Text style={styles.timeText}>
                    {formatTime(item?.bookedDate)}
                  </Text>
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
                  <Text style={styles.timeText}>
                    {item.sessionCompleted}/{item.sessionCount}
                  </Text>
                  <View style={styles.requestTextView}>
                    <FastImage
                      source={images.SessionIcon}
                      style={styles.sessionIcon}
                    />
                    <Text
                      style={[styles.smallTextStyle, { marginLeft: scale(6) }]}
                    >
                      Session
                    </Text>
                  </View>
                </View>

                <View style={{ marginTop: 5 }}>
                  <TouchableOpacity
                    onPress={() => {
                      onRequestClose();
                      onConfirm && onConfirm(item);
                    }}
                    style={[
                      styles.confirmStyle,
                      { backgroundColor: COLORS.themGreen },
                    ]}
                  >
                    <Text style={styles.confirmText}>{confirmText}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      onRequestClose();
                      onReject && onReject(item);
                    }}
                    style={[
                      styles.confirmStyle,
                      {
                        borderWidth: 1,
                        borderColor: COLORS.white,
                        margin: verticalScale(4),
                      },
                    ]}
                  >
                    <Text style={styles.rejectText}>{rejectText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default UserReserveModel;
