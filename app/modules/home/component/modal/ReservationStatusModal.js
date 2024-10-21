import React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  SectionList,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./Style";
import { images, COLORS } from "../../constant";
import { CONTEXT } from "../../constant/theme";
import { scale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import { theme } from "../../../workout/constant";

const ReservationStatusModal = ({
  visible,
  onRequestClose,
  data,
  onSessionCancel,
}) => {
  const getIconForStatus = (statusValue) => {
    switch (statusValue) {
      case "Booked":
        return images.booked; // Replace with your actual pending icon
      case "Cancelled":
        return images.cancel; // Replace with your actual approved icon
      case "Completed":
        return images.complete; // Replace with your actual completed icon
      // Add more cases for other status values and icons as needed
      default:
        return null; // Replace with a default icon or null
    }
  };

  // Extracting reservations from the data array
  const sections = data.map((statusObject) => ({
    title: statusObject.statusValue,
    icon: getIconForStatus(statusObject.statusValue),
    data: statusObject.reservations,
  }));

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}.${day}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.modelViewcontainer}>
          <View style={styles.headerModal}>
            <View style={[styles.requestTextView, { marginBottom: 20 }]}>
              <FastImage
                source={images.icon_white_calendar}
                style={styles.reserveIcon}
              />
              <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
                {!!data.length &&
                  formattedDate(data[0]?.reservations[0]?.bookedDate)}{" "}
                {CONTEXT.reservation_status}
              </Text>
            </View>
          </View>

          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item.id.toString()}
            ItemSeparatorComponent={({ leadingItem, trailingItem }) => {
              const showGap =
                leadingItem &&
                trailingItem &&
                leadingItem.status !== trailingItem.status;

              return (
                <View
                  style={{
                    height: 1,
                    backgroundColor: COLORS.gray,
                    marginVertical: -3,
                  }}
                />
              );
            }}
            renderItem={({ item }) => (
              <View style={[styles.reserveModal, { padding: 10 }]}>
                <View
                  style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: 50, flexDirection: "row" }}>
                    {!item.mProfileImg ? (
                      <FastImage
                        source={images.User}
                        style={[styles.userIcon, { marginRight: 5 }]}
                      />
                    ) : (
                      <FastImage
                        source={{ uri: item.mProfileImg.prof_img1_min }}
                        style={[styles.userIcon, { marginRight: 5 }]}
                      />
                    )}
                    <Text numberOfLines={1} style={[styles.userTextStyle]}>
                      {item.name}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.requestTextView,
                      {
                        justifyContent: "space-around",
                        width: 250,
                      },
                    ]}
                  >
                    <View style={[styles.requestTextView]}>
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
                        {formattedDate(item.bookedDate)}
                      </Text>
                    </View>

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
                        {formatTime(item.bookedDate)}
                      </Text>
                    </View>
                  </View>
                </View>

                {item?.statusValue === "Booked" && (
                  <TouchableOpacity
                    style={[
                      styles.cancelButton,
                      { borderColor: theme.COLORS.red, marginTop: 20 },
                    ]}
                    onPress={() => onSessionCancel(item)}
                  >
                    <Text style={styles.smallTextStyle}>{CONTEXT.cancel}</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            renderSectionHeader={({ section }) => (
              <View style={styles.headerStatus}>
                <View
                  style={[
                    styles.requestTextView,
                    { alignSelf: "flex-start", padding: 15 },
                  ]}
                >
                  <Image
                    source={section.icon}
                    style={[
                      section.title === "Reservation Requests"
                        ? styles.statusReserve
                        : styles.reserveIcon,
                    ]}
                  />
                  <Text
                    style={[styles.requestTextStyle, { marginLeft: scale(10) }]}
                  >
                    {section.data.length} {CONTEXT.session_data} {section.title}
                  </Text>
                </View>
              </View>
            )}
            ListFooterComponent={() => (
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  {
                    borderColor: theme.COLORS.red,
                    marginTop: 20,
                    marginBottom: 20,
                    alignSelf: "center",
                  },
                ]}
                onPress={onRequestClose}
              >
                <Text style={styles.smallTextStyle}>{CONTEXT.close}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReservationStatusModal;
