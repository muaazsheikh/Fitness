import React, { useState } from "react";
import { Modal, View, FlatList, Text, TouchableOpacity } from "react-native";
import styles from "./Style";
import { scale, verticalScale } from "react-native-size-matters";
import { icons, images } from "../../constant";
import { CONTEXT, COLORS } from "../../constant/theme";
import FastImage from "react-native-fast-image";
import { PrimaryButton } from "../../../../components";
import sessionClearApi from "../../../../api/trainer-home/sessionClear";
import { useDispatch } from "react-redux";
import { workoutLoading } from "../../../../redux/workoutSlice";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler"; // Import Swipeable from gesture handler
import Spinner from "react-native-loading-spinner-overlay";

const CalendarReservationModal = ({
  visible,
  closeModal,
  data,
  setModalConfirm,
  setSelectedState,
  setCalendarRejectedModel,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}.${day}`;
  };

  const handleClearNotification = async (item) => {
    try {
      setLoading(true);
      const response = await sessionClearApi(item);
      console.log("resss", JSON.stringify(response));
      setLoading(false);

      dispatch(workoutLoading(true));
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    } finally {
      // Optionally handle loading states here
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => closeModal(false)}
    >
      <GestureHandlerRootView style={styles.modelViewcontainer}>
        <View style={styles.modelViewcontainer}>
          <View style={[styles.viewModal]}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => closeModal(false)}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>

            <View
              style={[
                styles.requestTextView,
                { marginBottom: verticalScale(4) },
              ]}
            >
              <FastImage
                source={icons.CalenderIcon}
                style={styles.reserveIcon}
              />
              <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
                {CONTEXT.ReserveCancel}
              </Text>
            </View>

            <FlatList
              data={data}
              renderItem={({ item }) => (
                <Swipeable
                  onSwipeableRightOpen={() => handleClearNotification(item?.id)} // Trigger clear on right swipe
                >
                  <View
                    style={[
                      styles.centerModal,
                      {
                        backgroundColor: !item.cancelled
                          ? COLORS.themeGray
                          : "#FFE1CC",
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.requestTextView,
                        {
                          width: scale(280),
                          marginTop: verticalScale(5),
                          justifyContent: "space-between",
                        },
                      ]}
                    >
                      <View style={{ alignItems: "center", width: 70 }}>
                        <FastImage
                          source={images.User}
                          style={styles.userIcon}
                        />
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.requestTextStyle,
                            {
                              fontSize: 14,
                              color: !item.cancelled
                                ? COLORS.white
                                : COLORS.Orange,
                            },
                          ]}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <View>
                        <View style={[styles.requestTextView]}>
                          <Text
                            style={[
                              styles.smallTextStyle,
                              {
                                marginHorizontal: scale(13),
                                color: !item.cancelled
                                  ? COLORS.Lightred
                                  : "#FF7C7C",
                              },
                            ]}
                          >
                            Cancel Session:
                          </Text>

                          <View style={[styles.requestTextView]}>
                            <FastImage
                              source={images.CalendarIcon}
                              style={[
                                styles.smallIcon,
                                {
                                  tintColor: !item.cancelled
                                    ? COLORS.white
                                    : COLORS.Orange,
                                },
                              ]}
                            />
                            <Text
                              style={[
                                styles.smallTextStyle,
                                {
                                  marginLeft: scale(6),
                                  color: !item.cancelled
                                    ? COLORS.white
                                    : COLORS.Orange,
                                },
                              ]}
                            >
                              {formatDate(item.cancelRequestDate)}
                            </Text>
                          </View>

                          <View style={styles.verticalLine} />

                          <View style={styles.requestTextView}>
                            <FastImage
                              source={images.ClockIcon}
                              style={[
                                styles.smallIcon,
                                {
                                  tintColor: !item.cancelled
                                    ? COLORS.white
                                    : COLORS.Orange,
                                },
                              ]}
                            />
                            <Text
                              style={[
                                styles.smallTextStyle,
                                {
                                  marginLeft: scale(6),
                                  color: !item.cancelled
                                    ? COLORS.white
                                    : COLORS.Orange,
                                },
                              ]}
                            >
                              {formatTime(item.cancelRequestDate)}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.horizontalLine} />

                        <View style={[styles.requestTextView]}>
                          <Text
                            style={[
                              styles.smallTextStyle,
                              {
                                marginHorizontal: scale(10),
                                color: !item.cancelled
                                  ? COLORS.LightYellow
                                  : COLORS.Orange,
                              },
                            ]}
                          >
                            Time of Request:
                          </Text>
                          <View style={[styles.requestTextView]}>
                            <FastImage
                              source={images.CalendarIcon}
                              style={[
                                styles.smallIcon,
                                {
                                  tintColor: !item.cancelled
                                    ? COLORS.white
                                    : COLORS.Orange,
                                },
                              ]}
                            />
                            <Text
                              style={[
                                styles.smallTextStyle,
                                {
                                  marginLeft: scale(6),
                                  color: !item.cancelled
                                    ? COLORS.white
                                    : COLORS.Orange,
                                },
                              ]}
                            >
                              {formatDate(item.bookedDate)}
                            </Text>
                          </View>

                          <View style={styles.verticalLine} />

                          <View style={styles.requestTextView}>
                            <FastImage
                              source={images.ClockIcon}
                              style={[
                                styles.smallIcon,
                                {
                                  tintColor: !item.cancelled
                                    ? COLORS.white
                                    : COLORS.Orange,
                                },
                              ]}
                            />
                            <Text
                              style={[
                                styles.smallTextStyle,
                                {
                                  marginLeft: scale(6),
                                  color: !item.cancelled
                                    ? COLORS.white
                                    : COLORS.Orange,
                                },
                              ]}
                            >
                              {formatTime(item.bookedDate)}
                            </Text>
                          </View>
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
                      {!item.cancelled ? (
                        <>
                          <TouchableOpacity
                            onPress={() => {
                              setCalendarRejectedModel(item);
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
                              setModalConfirm(item);
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
                            onPress={() => closeModal(false)}
                            style={[
                              styles.confirmStyle,
                              {
                                backgroundColor: COLORS.Orange,
                                width: scale(59),
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.smallTextStyle,
                                { fontSize: scale(11), color: COLORS.white },
                              ]}
                            >
                              {CONTEXT.cancelled}
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                </Swipeable>
              )}
            />

            <View style={{ marginTop: 20 }}>
              <Spinner
                visible={loading}
                textContent={"Loading..."}
                textStyle={{ color: "#FFF" }}
              />
              <PrimaryButton
                title="Close"
                style={100}
                color={"transparent"}
                onPress={() => closeModal(false)}
              />
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default CalendarReservationModal;
