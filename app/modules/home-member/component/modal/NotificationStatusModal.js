// ReusableModal.js

import React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList,
  StyleSheet,
} from "react-native";
import styles from "./Style";
import { images, COLORS, icons } from "../../constant";
import { CONTEXT, FONTS } from "../../constant/theme";
import { scale, verticalScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";

const NotificationStatusModal = ({
  visible,
  onRequestClose,
  data,
  closeModal,
}) => {
  const groupedData = data.reduce((acc, item) => {
    const status = item.status || "Pending"; // Assuming 'Pending' is the default status
    acc[status] = acc[status] || [];
    acc[status].push(item);
    return acc;
  }, {});

  // Convert grouped data to an array of objects with 'title' and 'data' properties
  const sections = Object.keys(groupedData).map((status) => ({
    title: status,
    data: groupedData[status],
  }));

  // Helper function to get different colors based on section title (status)

  const renderItem = ({ item }) => (
    <View style={[item.state ? styles.itemState : styles.itemStateColor]}>
      <View style={styles.item}>
        <FastImage source={icons.notify_user} style={styles.image} />
        <View style={styles.column}>
          <Text style={styles.titleNotify}>{item.title}</Text>
          <View
            style={[
              styles.requestTextView,
              {
                justifyContent: "space-between",
                alignSelf: "flex-start",
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
                {item.date}
              </Text>
            </View>
            <View style={styles.verticalLine} />

            <View style={[styles.requestTextView]}>
              <FastImage source={images.ClockIcon} style={[styles.smallIcon]} />
              <Text
                style={[
                  styles.smallTextStyle,
                  {
                    marginLeft: scale(6),
                  },
                ]}
              >
                {item.time}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.timeView]}>
          <Text style={styles.minText}>{item.user}</Text>
        </View>
      </View>
      <View
        style={[
          styles.requestTextView,
          {
            alignSelf: "flex-end",
            marginRight: scale(5),
            marginTop: scale(5),
          },
        ]}
      >
        {item.state ? (
          <>
            <TouchableOpacity
              onPress={() => {}}
              style={[
                styles.confirmStyle,
                {
                  borderWidth: 1,
                  borderColor: COLORS.white,
                  margin: verticalScale(4),
                },
              ]}
            >
              <Text style={styles.rejectText}>{CONTEXT.cancel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                closeModal(false);
              }}
              style={[
                styles.confirmStyle,
                { backgroundColor: COLORS.themGreen },
              ]}
            >
              <Text style={styles.confirmText}>{CONTEXT.confirm}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[
                styles.confirmStyle,
                {
                  // backgroundColor: COLORS.Orange,
                  width: scale(90),
                  borderWidth: 1,
                  borderColor: COLORS.Orange,
                  height: 40,
                },
              ]}
            >
              <Text
                style={[
                  styles.smallTextStyle,
                  { fontSize: scale(11), color: COLORS.Orange },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                closeModal(false);
              }}
              style={[
                styles.confirmStyle,
                {
                  backgroundColor: COLORS.Orange,
                  width: scale(90),
                  height: 40,
                },
              ]}
            >
              <Text
                style={[
                  styles.smallTextStyle,
                  { fontSize: scale(11), color: COLORS.white },
                ]}
              >
                Accept
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => closeModal(false)}
    >
      <TouchableWithoutFeedback onPress={() => closeModal(false)}>
        <View style={[styles.modelViewcontainer]}>
          <View style={styles.headerModal}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NotificationStatusModal;
