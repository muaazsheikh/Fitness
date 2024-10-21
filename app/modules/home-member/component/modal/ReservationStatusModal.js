import React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./Style"; // Import your styles from Style.js
import { images, COLORS, icons } from "../../constant"; // Import your images and constants
import { scale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import { CONTEXT, FONTS } from "../../constant/theme";
import moment from "moment";

const ReservationStatusModal = ({
  visible,
  onRequestClose,
  data,
  selectedDate,
}) => {
  const renderItem = (sectionData, sectionTitle) => {
    switch (sectionTitle) {
      case "attendance":
        return renderAttendance(sectionData);
      case "sessionDetails":
        return renderSessionDetails(sectionData);
      case "dietLogs":
        return renderDietLogs(sectionData);
      case "memberWorkoutLogs":
        return renderMemberWorkoutLogs(sectionData);
      case "trainerWorkoutLogs":
        return renderTrainerWorkoutLogs(sectionData);

      default:
        return null;
    }
  };
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 || 12; // Convert midnight (0 hours) to 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const renderAttendance = (attendance) => (
    <>
      {attendance.length > 0 && (
        <View style={styles.reserveModal}>
          <View style={[styles.requestTextView, { alignSelf: "flex-start" }]}>
            <Image source={images.attendance_icon} style={styles.taskImage} />
            <Text style={[styles.requestTextStyle, { marginLeft: scale(10) }]}>
              Attendance
            </Text>
          </View>
          {/* <FlatList
        data={attendance}
        renderItem={({ item }) => ( */}
          <View
            style={[
              styles.requestTextView,
              { alignSelf: "flex-start", marginTop: 10, marginLeft: 30 },
            ]}
          >
            <Image source={images.ClockIcon} style={styles.taskImage} />
            <Text style={[styles.userTextStyle]}>
              {formatTime(attendance[0]?.time)} |{" "}
              {formatTime(attendance[1]?.time)} |{" "}
              {formatTime(attendance[2]?.time)}
            </Text>
          </View>
          {/* )}
        keyExtractor={(item, index) => index.toString()}
      /> */}
        </View>
      )}
    </>
  );

  const renderSessionDetails = (sessionDetails) => (
    <>
      {sessionDetails.length > 0 && (
        <View style={styles.reserveModal}>
          <View style={[styles.requestTextView, { alignSelf: "flex-start" }]}>
            <Image source={images.pt_session} style={styles.taskImage} />
            <Text style={[styles.requestTextStyle, { marginLeft: scale(10) }]}>
              Session Information
            </Text>
          </View>
          <FlatList
            data={sessionDetails}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.requestTextView,
                  { alignSelf: "flex-start", marginTop: 10, marginLeft: 30 },
                ]}
              >
                <Image source={images.User} style={styles.userIcon} />

                <Text
                  numberOfLines={1}
                  style={[styles.userTextStyle, { marginLeft: 30, width: 60 }]}
                >
                  {item?.trainerName}
                </Text>

                <Image
                  source={images.SessionIcon}
                  style={[styles.taskImage, { marginLeft: 40 }]}
                />

                <Text style={[styles.userTextStyle, { marginLeft: 10 }]}>
                  {item?.sessionCompleted}/{item.sessionCount}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </>
  );

  const renderTrainerWorkoutLogs = (trainerWorkoutLogs) => (
    <>
      {trainerWorkoutLogs.length > 0 && (
        <View style={styles.reserveModal}>
          {/* <View style={[styles.requestTextView, { alignSelf: "flex-start" }]}>
            <Image source={images.member_attend} style={styles.taskImage} />
            <Text style={[styles.requestTextStyle, { marginLeft: scale(10) }]}>
              Trainer Workout Logs
            </Text>
          </View> */}
          <FlatList
            data={trainerWorkoutLogs}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    marginTop: 15,
                    padding: 10,
                  }}
                >
                  <View
                    style={[
                      styles.requestTextView,
                      { alignSelf: "flex-start", marginBottom: 5 },
                    ]}
                  >
                    <Image
                      source={images.trainer_img}
                      style={styles.taskImage}
                    />
                    <Text
                      style={[
                        styles.requestTextStyle,
                        { marginLeft: scale(10) },
                      ]}
                    >
                      Trainer Workout Logs
                    </Text>
                    <Image
                      source={icons.review}
                      style={[styles.taskImage, { marginLeft: 80 }]}
                    />
                    <Text
                      style={[
                        { color: COLORS.themGreen },
                        { fontFamily: FONTS.ARCHI_BOLD, fontSize: 18 },
                      ]}
                    >
                      {item?.avgRating}
                    </Text>
                  </View>
                  <Text
                    style={[
                      {
                        color: COLORS.themGreen,
                        marginLeft: scale(30),
                        marginVertical: 5,
                      },
                    ]}
                  >
                    Total {item.totalExercises} Exercises, {item?.totalSets}{" "}
                    Sets
                  </Text>
                  <View
                    style={[
                      styles.requestTextView,
                      {
                        alignSelf: "flex-start",
                        marginTop: 10,
                        marginLeft: 35,
                        gap: 25,
                      },
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <Image source={images.User} style={styles.userIcon} />

                      <Text
                        numberOfLines={1}
                        style={[styles.userTextStyle, { width: 60 }]}
                      >
                        {item?.memberDetails?.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Image
                        source={images.ClockIcon}
                        style={{ height: 12, width: 12 }}
                      />
                      <Text style={[styles.userTextStyle]}>
                        {moment(item?.workoutDate).format("hh:mm A")}
                      </Text>
                    </View>

                    {data?.sessionDetails?.sessionId && (
                      <View style={{ flexDirection: "row", gap: 3 }}>
                        <Image
                          source={images.SessionIcon}
                          style={[styles.taskImage]}
                        />

                        <Text style={[styles.userTextStyle]}>
                          {item?.sessionDetails?.completedSessions}/
                          {item?.sessionDetails?.totalSession}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </>
  );

  const renderMemberWorkoutLogs = (memberWorkoutLogs) => (
    <>
      {memberWorkoutLogs.length > 0 && (
        <View style={[styles.reserveModal]}>
          <FlatList
            data={memberWorkoutLogs}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    marginTop: 15,
                    padding: 10,
                  }}
                >
                  <View
                    style={[
                      styles.requestTextView,
                      { alignSelf: "flex-start", marginBottom: 5 },
                    ]}
                  >
                    <Image
                      source={images.member_attend}
                      style={styles.taskImage}
                    />
                    <Text
                      style={[
                        styles.requestTextStyle,
                        { marginLeft: scale(10) },
                      ]}
                    >
                      Member Workout Logs
                    </Text>
                    <Image
                      source={icons.review}
                      style={[styles.taskImage, { marginLeft: 80 }]}
                    />
                    <Text
                      style={[
                        { color: COLORS.themGreen },
                        { fontFamily: FONTS.ARCHI_BOLD, fontSize: 18 },
                      ]}
                    >
                      {item?.avgRating}
                    </Text>
                  </View>
                  <Text
                    style={[
                      {
                        color: "#FCFF62",
                        marginLeft: scale(30),
                        marginVertical: 5,
                      },
                    ]}
                  >
                    Total {item.totalExercises} Exercises, {item?.totalSets}{" "}
                    Sets
                  </Text>
                  <View
                    style={[
                      styles.requestTextView,
                      {
                        alignSelf: "flex-start",
                        marginTop: 10,
                        marginLeft: 35,
                        gap: 25,
                      },
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <Image source={images.User} style={styles.userIcon} />

                      <Text
                        numberOfLines={1}
                        style={[styles.userTextStyle, { width: 60 }]}
                      >
                        {item?.memberDetails?.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Image
                        source={images.ClockIcon}
                        style={{ height: 12, width: 12 }}
                      />
                      <Text style={[styles.userTextStyle]}>
                        {moment(item?.workoutDate).format("hh:mm A")}
                      </Text>
                    </View>

                    {data?.sessionDetails?.sessionId && (
                      <View style={{ flexDirection: "row", gap: 3 }}>
                        <Image
                          source={images.SessionIcon}
                          style={[styles.taskImage]}
                        />

                        <Text style={[styles.userTextStyle]}>
                          {item?.sessionDetails?.completedSessions}/
                          {item?.sessionDetails?.totalSession}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#515151",
                    // opacity: 0.5,
                    marginTop: 10,
                  }}
                />
              );
            }}
          />
        </View>
      )}
    </>
  );

  const renderDietLogs = (dietLogs) => (
    <>
      {dietLogs?.diets?.length > 0 && (
        <View style={styles.reserveModal}>
          <View style={[styles.requestTextView, { alignSelf: "flex-start" }]}>
            <Image source={images.member_attend} style={styles.taskImage} />
            <Text style={[styles.requestTextStyle, { marginLeft: scale(10) }]}>
              Diet Logs
            </Text>
          </View>

          {/* <Text style={[styles.userTextStyle]}>
        Member Notes: {dietLogs?.memberNotes}
      </Text> */}
          <FlatList
            data={dietLogs?.diets}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: scale(50),
                  marginTop: 10,
                }}
              >
                <FastImage source={images.meal} style={[styles.smallIcon]} />
                <Text
                  style={[
                    styles.smallTextStyle,
                    {
                      marginLeft: scale(6),
                    },
                  ]}
                >
                  {item?.meal} meals
                </Text>
                <View style={styles.verticalLine} />

                <FastImage
                  source={images.breakfast_color}
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
                  {item?.count} Snack
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* <View style={styles.horizontalLine} /> */}
          {/* <View
            style={{
              flexDirection: "row",
              marginLeft: scale(20),
            }}
          >
            <Image source={icons.noteIcon} style={styles.taskImage} />

            <Text style={[styles.userTextStyle]}>
              Trainer Notes: {dietLogs?.trainerNotes}
            </Text>
          </View> */}
        </View>
      )}
    </>
  );

  const formatMonthData = () => {
    const date = new Date(selectedDate);
    const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}.${(
      "0" + date.getDate()
    ).slice(-2)}`;
    return formattedDate;
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
          <ScrollView>
            <View
              style={[
                styles.headerModal,
                { backgroundColor: COLORS.gray, paddingVertical: 20 },
              ]}
            >
              <TouchableOpacity
                style={styles.crossIconView}
                onPress={onRequestClose}
              >
                <FastImage
                  source={icons.CrossButton}
                  style={styles.crossImage}
                />
              </TouchableOpacity>
              <View style={[styles.requestTextView, { marginBottom: 20 }]}>
                <FastImage
                  source={images.icon_white_calendar}
                  style={styles.reserveIcon}
                />
                <Text
                  style={[styles.requestTextStyle, { marginLeft: scale(6) }]}
                >
                  {formatMonthData()} {CONTEXT.reservation_status}
                </Text>
              </View>
              {Object.entries(data).map(
                ([sectionTitle, sectionData], index) => (
                  <React.Fragment key={index}>
                    {sectionData && renderItem(sectionData, sectionTitle)}
                  </React.Fragment>
                )
              )}
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReservationStatusModal;
