// CalendarReservationModal.js
import React from "react";
import {
  Modal,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import styles from "./Style";
import { scale, verticalScale } from "react-native-size-matters";
import { icons, images } from "../../constant";
import { CONTEXT, COLORS } from "../../constant/theme";
import FastImage from "react-native-fast-image";
const InfoSessionModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View
          style={[
            styles.modelViewcontainer,
            { backgroundColor: COLORS.transparent },
          ]}
        >
          <View
            style={[
              styles.viewModal,
              {
                width: scale(250),
                marginTop: scale(90),
                backgroundColor: COLORS.lightBlack,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => setModalVisible(false)}
            >
              <Image source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>

            <View
              style={[
                styles.requestTextView,
                { alignSelf: "flex-start", marginHorizontal: 10 },
              ]}
            >
              <Image
                source={images.attendance_icon}
                style={[styles.taskImage, { alignSelf: "center" }]}
              />
              <Text style={[styles.TextReasone, { marginLeft: scale(6) }]}>
               {CONTEXT.gym_attendance}
              </Text>
            </View>
            <View style={styles.horizontalLineSmall} />
            <View
              style={[
                styles.requestTextView,
                { alignSelf: "flex-start", marginHorizontal: 10 },
              ]}
            >
              <Image
                source={images.trainer_img}
                style={[styles.taskImage, { alignSelf: "center" }]}
              />
              <Text style={[styles.TextReasone, { marginLeft: scale(6) }]}>
                {CONTEXT.trainer_Workout}
              </Text>
            </View>
            <View style={styles.horizontalLineSmall} />
            <View
              style={[
                styles.requestTextView,
                { alignSelf: "flex-start", marginHorizontal: 10 },
              ]}
            >
              <Image
                source={images.member_attend}
                style={[styles.taskImage, { alignSelf: "center" }]}
              />
              <Text style={[styles.TextReasone, { marginLeft: scale(6) }]}>
                {CONTEXT.member_Workout}
              </Text>
            </View>
            <View style={styles.horizontalLineSmall} />
            <View
              style={[
                styles.requestTextView,
                { alignSelf: "flex-start", marginHorizontal: 10 },
              ]}
            >
              <Image
                source={images.pt_session}
                style={[styles.taskImage, { alignSelf: "center" }]}
              />
              <Text style={[styles.TextReasone, { marginLeft: scale(6) }]}>
                {CONTEXT.pt_sessions}
              </Text>
            </View>
            <View style={styles.horizontalLineSmall} />
            <View
              style={[
                styles.requestTextView,
                { alignSelf: "flex-start", marginHorizontal: 10 },
              ]}
            >
              <Image
                source={images.session_touch}
                style={[styles.taskImage, { alignSelf: "center" }]}
              />
              <Text style={[styles.TextReasone, { marginLeft: scale(6) }]}>
                {CONTEXT.pt_reserved}
              </Text>
            </View>
            <View style={styles.horizontalLineSmall} />
            <View
              style={[
                styles.requestTextView,
                { alignSelf: "flex-start", marginHorizontal: 10 },
              ]}
            >
              <Image
                source={images.diet_log_img}
                style={[styles.taskImage, { alignSelf: "center" }]}
              />
              <Text style={[styles.TextReasone, { marginLeft: scale(6) }]}>
                {CONTEXT.diet_log_written}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default InfoSessionModal;
