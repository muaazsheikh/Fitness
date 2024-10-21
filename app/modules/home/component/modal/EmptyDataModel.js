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

const EmptyDataModel = ({
  visible,
  onRequestClose,
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

          <View style={[styles.requestTextView, { marginVertical: 10 }]}>
          <FastImage source={images.cancel} style={styles.taskImage} />
          <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
              {CONTEXT.noEventsToday}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EmptyDataModel;
