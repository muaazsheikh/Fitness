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
const CalendarReservationModal = ({
  visible,
  closeModal,
  data,
  setModalConfirm,
  setSelectedState,
  setCalendarRejectedModel,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => closeModal(false)}
    >
      <TouchableWithoutFeedback onPress={() => closeModal(false)}>
        <View style={styles.modelViewcontainer}>
          <View style={[styles.viewModal, { backgroundColor: "#FFE1CC" }]}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => closeModal(false)}
            >
              <Image
                source={icons.CrossButton}
                style={[styles.crossImage, { tintColor: COLORS.Orange }]}
              />
            </TouchableOpacity>

            <View
              style={[
                styles.requestTextView,
                { marginBottom: verticalScale(4) },
              ]}
            >
              <Text
                style={[
                  styles.requestTextStyle,
                  { marginLeft: scale(6), color: COLORS.Orange },
                ]}
              >
                {CONTEXT.ReserveCancel}
              </Text>
            </View>

            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.centerModal,
                    {
                      backgroundColor: item.state ? "#FFE1CC" : "#FFE1CC",
                    },
                  ]}
                >
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
                      <Text
                        style={[
                          styles.requestTextStyle,
                          { fontSize: 14, color: COLORS.Orange },
                        ]}
                      >
                        Costa
                      </Text>
                    </View>

                    <View style={styles.boxColor}>
                      <Text style={[styles.timeText, { color: COLORS.Orange }]}>
                        10.20
                      </Text>
                      <View style={styles.requestTextView}>
                        <Image
                          source={images.CalendarIcon}
                          style={[
                            styles.smallIcon,
                            { tintColor: COLORS.Orange },
                          ]}
                        />
                        <Text
                          style={[
                            styles.smallTextStyle,
                            { marginLeft: scale(6), color: COLORS.Orange },
                          ]}
                        >
                          Date
                        </Text>
                      </View>
                    </View>

                    <View style={[styles.boxColor]}>
                      <Text style={[styles.timeText, { color: COLORS.Orange }]}>
                        10:30am
                      </Text>
                      <View style={styles.requestTextView}>
                        <Image
                          source={images.ClockIcon}
                          style={[
                            styles.smallIcon,
                            { tintColor: COLORS.Orange },
                          ]}
                        />
                        <Text
                          style={[
                            styles.smallTextStyle,
                            { marginLeft: scale(6), color: COLORS.Orange },
                          ]}
                        >
                          Time
                        </Text>
                      </View>
                    </View>
                    <View style={styles.boxColor}>
                      <Text style={[styles.timeText, { color: COLORS.Orange }]}>
                        10/5
                      </Text>
                      <View style={styles.requestTextView}>
                        <Image
                          source={images.SessionIcon}
                          style={[
                            styles.smallIcon,
                            { tintColor: COLORS.Orange },
                          ]}
                        />
                        <Text
                          style={[
                            styles.smallTextStyle,
                            { marginLeft: scale(6), color: COLORS.Orange },
                          ]}
                        >
                          Session
                        </Text>
                      </View>
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
                          onPress={() => {
                            setCalendarRejectedModel(true);
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
                          <Text style={styles.rejectText}>
                            {CONTEXT.reject}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            closeModal(false);
                            setSelectedState(2);
                            setModalConfirm(true);
                          }}
                          style={[
                            styles.confirmStyle,
                            { backgroundColor: COLORS.themGreen },
                          ]}
                        >
                          <Text style={styles.confirmText}>
                            {CONTEXT.confirm}
                          </Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity
                          onPress={() => setCalendarRejectedModel(true)}
                          style={[
                            styles.confirmStyle,
                            {
                              // backgroundColor: COLORS.Orange,
                              width: scale(120),
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
                            Request to cancel
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
                            confirm
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalendarReservationModal;
