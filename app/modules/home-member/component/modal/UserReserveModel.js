import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./Style";
import { images, COLORS, icons, FONTS } from "../../constant";
import { scale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import { PrimaryButton } from "../../../../components";
import moment from "moment";

const UserReserveModel = ({
  visible,
  onRequestClose,
  data,
  confirmText,
  rejectText,
  onConfirm,
  onReject,
  timeData,
  date,
}) => {
  const generateTimeSlots = (time) => {
    const slots = [];
    if (time) {
      time.forEach((slot) => {
        const startTime = moment(slot?.startTime, "HH:mm");
        const endTime = moment(slot?.endTime, "HH:mm");
        const interval = 60; // Assuming interval is 1 hour

        let currentTime = startTime.clone();
        while (currentTime < endTime) {
          slots.push(currentTime.format("HH:mm")); // 'HH:mm' formats time in 24-hour format
          currentTime.add(interval, "minutes");
        }
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(timeData);
  const [timeSelectionVisible, setTimeSelectionVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    console.log(timeData);

    setModalVisible(!modalVisible);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onReject}
      >
        <View style={styles.modelViewcontainer}>
          <View style={styles.viewModal}>
            <TouchableOpacity style={styles.crossIconView} onPress={onReject}>
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>

            <View style={[styles.requestTextView, { marginBottom: 20 }]}>
              <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
                Session Reservation
              </Text>
            </View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    backgroundColor: COLORS.gray,
                    marginVertical: 5,
                    marginHorizontal: 20,
                  }}
                />
              )}
              renderItem={({ item }) => (
                <View style={styles.requestTextView}>
                  <View
                    style={[
                      styles.requestTextView,
                      {
                        justifyContent: "space-between",
                        alignSelf: "flex-start",
                      },
                    ]}
                  >
                    <View>
                      <Text
                        style={[
                          styles.smallTextStyle,
                          { marginBottom: scale(6), marginLeft: scale(6) },
                        ]}
                      >
                        select date
                      </Text>
                      <View
                        style={[
                          styles.boxView,
                          {
                            flexDirection: "row",
                            width: scale(100),
                            height: scale(32),
                          },
                        ]}
                      >
                        <FastImage
                          source={images.CalendarIcon}
                          style={[styles.smallIcon]}
                        />
                        <Text
                          style={[
                            styles.smallTextStyle,
                            { marginLeft: scale(6) },
                          ]}
                        >
                          {moment(date).format("MM.DD")}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity onPress={() => toggleModal(true)}>
                      <Text
                        style={[
                          styles.smallTextStyle,
                          { marginBottom: scale(6), marginLeft: scale(6) },
                        ]}
                      >
                        select time
                      </Text>
                      <View
                        style={[
                          styles.boxView,
                          {
                            flexDirection: "row",
                            width: scale(110),
                            height: scale(32),
                          },
                        ]}
                      >
                        <FastImage
                          source={images.ClockIcon}
                          style={[styles.smallIcon]}
                        />
                        <Text
                          style={[
                            styles.smallTextStyle,
                            { marginLeft: scale(6) },
                          ]}
                        >
                          {selectedTime || timeSlots[0]}
                        </Text>
                        <FastImage
                          source={
                            modalVisible ? icons.up_icon : icons.down_icon
                          }
                          style={[styles.smallIcon, { height: 8 }]}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            {modalVisible && (
              <View style={styles.timeSelectionModalContainer}>
                <View style={styles.userSmallModal}>
                  <FlatList
                    data={timeSlots}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          gap: 5,
                          justifyContent: "center",
                          marginTop: 10,
                        }}
                        index={index}
                        onPress={() => {
                          setSelectedTime(item);
                          setModalVisible(false);
                        }}
                      >
                        <FastImage
                          source={images.ClockIcon}
                          style={[styles.smallIcon]}
                        />
                        <Text style={styles.smallTextStyle}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            )}
            <View
              style={[
                styles.buttonContainer,
                {
                  alignSelf: "center",
                  flexDirection: "row",
                  marginTop: 30,
                  gap: 20,
                },
              ]}
            >
              <PrimaryButton
                title={"Cancel"}
                style={90}
                edit={true}
                color={true}
                onPress={onReject}
              />

              <PrimaryButton
                title={"Confirm"}
                style={90}
                edit={true}
                onPress={() => {
                  onRequestClose();
                  onConfirm && onConfirm(selectedTime || timeSlots[0], date);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Time Selection Modal */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      > */}

      {/* </Modal> */}
    </>
  );
};

export default UserReserveModel;
