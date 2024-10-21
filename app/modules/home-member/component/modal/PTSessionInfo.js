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
const PTSessionInfo = ({ visible, closeModal, data, onRequestClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.modelViewcontainer}>
          <View style={[styles.viewModal]}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={onRequestClose}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>

            <View
              style={[
                styles.requestTextView,
                { marginBottom: verticalScale(4) },
              ]}
            >
              <Image source={images.pt_session} style={styles.reserveIcon} />
              <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
                PT Session Info
              </Text>
            </View>

            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={[styles.centerModal]}>
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
                      <Text style={styles.timeText}>10.20</Text>
                      <View style={styles.requestTextView}>
                        <FastImage
                          source={images.CalendarIcon}
                          style={styles.smallIcon}
                        />
                        <Text
                          style={[
                            styles.smallTextStyle,
                            { marginLeft: scale(6) },
                          ]}
                        >
                          Date
                        </Text>
                      </View>
                    </View>

                    <View style={styles.boxView}>
                      <Text style={styles.timeText}>10:30am</Text>
                      <View style={styles.requestTextView}>
                        <FastImage
                          source={images.ClockIcon}
                          style={styles.smallIcon}
                        />
                        <Text
                          style={[
                            styles.smallTextStyle,
                            { marginLeft: scale(6) },
                          ]}
                        >
                          Time
                        </Text>
                      </View>
                    </View>
                    <View style={styles.boxView}>
                      <Text style={styles.timeText}>10:30am</Text>
                      <View style={styles.requestTextView}>
                        <FastImage
                          source={images.ClockIcon}
                          style={styles.smallIcon}
                        />
                        <Text
                          style={[
                            styles.smallTextStyle,
                            { marginLeft: scale(6) },
                          ]}
                        >
                          Time
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.requestTextView,
                      {
                        marginRight: scale(5),
                        marginTop: scale(5),
                      },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => closeModal(false)}
                      style={[
                        styles.confirmStyle,
                        {
                          backgroundColor: COLORS.themGreen,
                          width: scale(79),
                          height: scale(30),
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.smallTextStyle,
                          { fontSize: scale(11), color: COLORS.black },
                        ]}
                      >
                        Confirm
                      </Text>
                    </TouchableOpacity>
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

export default PTSessionInfo;
