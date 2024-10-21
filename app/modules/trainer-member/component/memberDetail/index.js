import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
  Alert,
} from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { COLORS, icons, images } from "../../../workout/constant";
import { scale, verticalScale } from "react-native-size-matters";
import { PrimaryButton } from "../../../../components";
import CircularProgress from "../progress/CircularProgress";
import addTrainerGoalsApi from "../../../../api/trainer-trainer/addTrainerGoals";
import Spinner from "react-native-loading-spinner-overlay";
import addTrainerNotesApi from "../../../../api/trainer-trainer/addTrainerNotes";
import removeTrainerNotesApi from "../../../../api/trainer-trainer/removeTrainerNotes";
import {
  setSelectedExercise,
  updateSessionID,
  workoutDate,
  workoutLoading,
} from "../../../../redux/workoutSlice";
import { useDispatch } from "react-redux";
import { NavigationStrings } from "../../../../constants";
import sessionHistoryRequest from "../../../../api/trainer-trainer/sessionHistoryRequest";
import {
  resetApiCallStatus,
  resetNumSetsArray,
} from "../../../../redux/numSetsSlice";
import { CONTEXT } from "../../../home/constant/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const MAX_DISPLAY_LENGTH = 40;

const MemberDetail = (props) => {
  const [showList, setShowList] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNotes, setModalVisibleNotes] = useState(false);
  const [modalRequest, setModalRequest] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [workoutGoals, setWorkoutGoals] = useState([]);
  const [workoutNotes, setWorkoutNotes] = useState([""]);
  const [newGoal, setNewGoal] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [indexGoal, setNewGoalIndex] = useState(null);
  const [indexTrainer, setNewTrainerIndex] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { data, goals, notes, navigation } = props;

  console.log("lololololololololoo898", JSON.stringify(data));

  React.useEffect(() => {
    setWorkoutGoals(goals);
    setWorkoutNotes(notes);
  }, [goals, newNotes]);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}.${day}`;
  };

  const formattingDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    const day = date.getDate();
    const suffix = getDaySuffix(day);

    return `${formattedDate}${suffix}`;
  };

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const listShow = () => {
    setShowList(!showList);
  };
  const confirmHandle = () => {
    removeGoal(indexGoal);

    setModalVisible(false);
  };

  const confirmHandleNotes = () => {
    removeNotes(indexTrainer);

    setModalVisibleNotes(false);
  };

  const updateGoal = async (goals) => {
    setLoading(true);
    try {
      const response = await addTrainerGoalsApi(
        data?.memberDetails?.memberId,
        goals
      );
      dispatch(workoutLoading(true));
      setNewGoalIndex("");
      console.log("goals", JSON.stringify(response?.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(workoutLoading(false));
      console.log(error);
    }
  };

  const updateNotes = async (notes) => {
    setLoading(true);
    try {
      const response = await addTrainerNotesApi(
        data?.memberDetails?.memberId,
        newNotes
      );
      dispatch(workoutLoading(true));
      console.log(response);
      setLoading(false);
      setNewNotes("");
    } catch (error) {
      setLoading(false);
      dispatch(workoutLoading(false));

      console.log(JSON.stringify(error.response.data));
    }
  };

  const addGoal = () => {
    if (newGoal.trim() !== "") {
      setWorkoutGoals([...workoutGoals, newGoal]);
      updateGoal([...workoutGoals, newGoal]);
      setNewGoal("");
    }
  };
  const addNotes = () => {
    if (newNotes.trim() !== "") {
      const combinedNotes = [...workoutNotes, newNotes]
        .map((note) => (typeof note === "object" ? note.note : note)) // Map each note to its string representation
        .join("\n"); // Join the array of notes into a single string
      updateNotes(combinedNotes); // Pass the combinedNotes string to the updateNotes function
      setNewNotes("");
    }
  };

  const removeGoal = (index) => {
    const updatedGoals = [...workoutGoals];
    updatedGoals.splice(index, 1);
    updateGoal(updatedGoals);

    setWorkoutGoals(updatedGoals);
  };

  const deleteNotes = async (memberId, id) => {
    setLoading(true);
    try {
      const response = await removeTrainerNotesApi(memberId, id);
      console.log(response);
      dispatch(workoutLoading(true));

      setLoading(false);
      setNewTrainerIndex("");
      setNewNotes("");
    } catch (error) {
      setLoading(false);
      console.log(JSON.stringify(error.response.data));
    }
  };

  const removeNotes = () => {
    deleteNotes(data?.memberDetails?.memberId, indexTrainer);
    setNewTrainerIndex("");
  };
  const modalClose = () => {
    setModalVisible(false), setNewGoalIndex(null), setNewTrainerIndex(null);
  };

  const handleRequestPress = async (item) => {
    try {
      const response = await sessionHistoryRequest(item.sessionId);
      setShowConfirmModal(true);
    } catch (error) {
      console.log(JSON.stringify(error.response.data));
    }
  };

  const handleWirteLogPress = (item) => {
    dispatch(updateSessionID(item?.sessionId));
    dispatch(workoutDate(item?.bookDate));
    dispatch(resetNumSetsArray());
    dispatch(resetApiCallStatus());
    dispatch(setSelectedExercise([]));
    navigation.navigate(NavigationStrings.WRITE_WORKOUT_LOG);
  };

  const handleLogPress = (item) => {
    navigation.navigate(NavigationStrings.WORKOUT_MEMBER_DETAIL, {
      id: item?.workoutLogId,
      createdBy: item?.createdBy,
      color: COLORS.themGreen,
    });
  };

  const WorkoutDeleteModal = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => modalClose()}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => modalClose()}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>

            <Text style={styles.modalText}>
              Workout Goal deleted{"\n"}sucessfully
            </Text>

            <FastImage
              source={images.delete_confirm}
              style={styles.modalImage}
            />

            <View style={styles.smallContainer}></View>

            <PrimaryButton
              title={"Confirm"}
              onPress={() => confirmHandle()}
              style={90}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const WorkoutNotesModal = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisibleNotes}
      onRequestClose={() => {
        setModalVisibleNotes(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisibleNotes(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => setModalVisibleNotes(false)}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>

            <Text style={styles.modalText}>
              Workout Notes deleted{"\n"}sucessfully
            </Text>

            <FastImage
              source={images.delete_confirm}
              style={styles.modalImage}
            />

            <View style={styles.smallContainer}></View>

            <PrimaryButton
              title={"Confirm"}
              onPress={() => confirmHandleNotes()}
              style={90}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const WorkoutModalRequest = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalRequest}
      onRequestClose={() => {
        setModalRequest(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalRequest(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => setModalRequest(false)}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>
            <View style={styles.requestTextView}>
              <Image
                source={icons.noteIcon}
                style={[styles.noteIcon, { tintColor: COLORS.white }]}
              />
              <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
                Workout log request
              </Text>
            </View>
            <FastImage source={images.success} style={styles.successImage} />
            <Text style={styles.modalText}>
              Sign request message{"\n"}sent successfully.
            </Text>

            <View style={styles.smallContainer}></View>

            <PrimaryButton
              title={"Confirm"}
              onPress={() => {
                setModalRequest(false);
              }}
              style={90}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const ConfirmRequestModal = ({ visible, onCancel }) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => {
                setShowConfirmModal(false);
              }}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>
            <Text style={styles.modalText}>
              Notification to confirm session has been sent
            </Text>
            <View
              style={{ alignSelf: "center", marginVertical: verticalScale(10) }}
            >
              <FastImage
                source={images.success}
                style={{
                  width: scale(100),
                  height: scale(100),
                  resizeMode: "contain",
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.row}>
            <Image
              source={images.calendar_color}
              style={[styles.sessionIcon, { tintColor: COLORS.themGreen }]}
            />
            <Text style={styles.textUser}>
              Registration Date
              {/* {formatDate(data?.memberDetails?.registrationDate)} */}
            </Text>
            <View style={styles.ratingView}>
              <Text style={styles.ratingText}>Rating</Text>
              <FastImage source={icons.review} style={styles.starImg} />
              <Text style={styles.numberText}>
                {data?.memberDetails?.memberAvgRating?.toFixed(1)}
              </Text>
            </View>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.execerView}>
            <Text style={styles.exerciseText}>Last Exercises:</Text>
            {data?.memberDetails?.latestExercises[0] && (
              <FastImage source={icons.shoulder} style={styles.legImg} />
            )}
            <Text numberOfLines={1} style={styles.shoulderText}>
              {data?.memberDetails?.latestExercises[0]}
            </Text>
            {data?.memberDetails?.latestExercises[1] && (
              <FastImage source={icons.leg} style={styles.legImg} />
            )}
            <Text numberOfLines={1} style={styles.bodyText}>
              {data?.memberDetails?.latestExercises[1]}
            </Text>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={[styles.userHeaderList]}>
            <View style={{ marginLeft: 10 }}>
              <View style={[styles.requestTextView, { width: 70 }]}>
                <Image source={icons.Session_icon} style={[styles.smallIcon]} />
                <CircularProgress
                  value={data?.memberDetails?.sessionCompleted || 0}
                  maxValue={data?.memberDetails?.sessionCount || 0}
                />
              </View>
              <Text style={[styles.largeTextStyle]}>{CONTEXT.session}</Text>
            </View>

            <View style={styles.verticalLine} />

            <View>
              <View style={[styles.requestTextView]}>
                <Image source={images.ClockIcon} style={[styles.smallIcon]} />
                <Text style={[styles.smallTextStyle, { marginLeft: scale(6) }]}>
                  {data?.memberDetails?.noShowCount || 0}
                </Text>
              </View>
              <Text style={[styles.largeTextStyle, { marginLeft: scale(6) }]}>
                {CONTEXT.noShows}
              </Text>
            </View>

            <View style={styles.verticalLine} />

            <View>
              <View style={[styles.requestTextView]}>
                <View style={styles.extraView}>
                  <Image
                    source={icons.plus_icon}
                    style={[styles.smallPlusIcon]}
                  />
                </View>
                <Text style={[styles.smallTextStyle, { marginLeft: scale(6) }]}>
                  {data?.memberDetails?.addonCount || 0}
                </Text>
              </View>
              <Text style={[styles.largeTextStyle, { marginLeft: scale(6) }]}>
                {CONTEXT.extras}
              </Text>
            </View>

            <View style={styles.verticalLine} />

            <View>
              <View style={[styles.requestTextView]}>
                <FastImage
                  source={images.refresh}
                  style={[styles.sessionIcon]}
                />
                <Text style={[styles.smallTextStyle, { marginLeft: scale(6) }]}>
                  {data?.memberDetails?.lastSessionDay}
                  {/* <Text style={{ fontSize: 12 }}>(D+11)</Text> */}
                </Text>
              </View>
              <Text style={[styles.largeTextStyle, { marginLeft: scale(6) }]}>
                {CONTEXT.recentSession}
              </Text>
            </View>
          </View>
        </View>

        {/* 2nd card */}
        <View style={styles.containerHeader}>
          <View>
            <Text
              style={[
                styles.largeTextStyle,
                {
                  alignSelf: "flex-start",
                  marginHorizontal: 10,
                  marginVertical: 10,
                },
              ]}
            >
              {CONTEXT.performanceEvalu}
            </Text>
          </View>
          <View style={styles.horizontalLine}></View>

          <View style={styles.row}>
            <Image
              source={images.calendar_color}
              style={[styles.sessionIcon, { tintColor: COLORS.themGreen }]}
            />
            <Text style={styles.textUser}>Date: 8.11 - 8.12</Text>
            {/* <View style={styles.ratingView}>
            <Text style={styles.ratingText}>Rating</Text>
            <FastImage source={icons.review} style={styles.starImg} />
            <Text style={styles.numberText}>4</Text>
          </View> */}
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.execerView}>
            <FastImage source={images.user_name} style={styles.legImg} />
            <Text style={styles.exerciseText}>Gym attendance:</Text>
            <Text style={styles.exerciseText}>
              {data?.performanceScore?.gymAttendance} %
            </Text>
            <View>{/* <Text style={styles.bodyText}>(22/88)</Text> */}</View>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={[styles.userHeaderList, { width: "60%", height: 50 }]}>
            <View style={{ marginLeft: 10 }}>
              <View style={[styles.requestTextView]}>
                <Image
                  source={images.dumble_tab}
                  style={[styles.starImg, { tintColor: COLORS.lightWhite }]}
                />
                <Text
                  style={[
                    styles.smallTextStyle,
                    { marginLeft: scale(6), width: 90 },
                  ]}
                >
                  Workout logs:
                </Text>
              </View>
            </View>

            <View>
              <View style={[styles.requestTextView]}>
                <Image
                  source={icons.tab_workout}
                  style={[styles.starImg, { tintColor: COLORS.lightWhite }]}
                />
                <Text style={[styles.numberText, { marginLeft: scale(6) }]}>
                  {data?.performanceScore?.workoutDetails?.workoutCount}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.verticalLine,
                { height: scale(20), marginHorizontal: 15 },
              ]}
            />
            <View>
              <View style={[styles.requestTextView]}>
                <FastImage source={icons.review} style={styles.starImg} />
                <Text style={[styles.numberText, { marginLeft: scale(6) }]}>
                  {data?.performanceScore?.workoutDetails?.avgRating?.toFixed(
                    1
                  )}
                </Text>
              </View>
            </View>
          </View>
          {data?.performanceScore?.dietLogDetails > 0 && (
            <>
              <View style={styles.horizontalLine}></View>

              <View
                style={[styles.userHeaderList, { width: "60%", height: 50 }]}
              >
                <View style={{ marginLeft: 10 }}>
                  <View style={[styles.requestTextView]}>
                    <Image
                      source={images.banana_tab}
                      style={[
                        styles.starImg,
                        { tintColor: COLORS.lightWhite, width: 20 },
                      ]}
                    />
                    <Text
                      style={[
                        styles.smallTextStyle,
                        { marginLeft: scale(6), width: 85 },
                      ]}
                    >
                      Diet logs:
                    </Text>
                  </View>
                </View>

                <View>
                  <View style={[styles.requestTextView]}>
                    <Image
                      source={icons.tab_workout}
                      style={[styles.starImg, { tintColor: COLORS.lightWhite }]}
                    />
                    <Text style={[styles.numberText, { marginLeft: scale(6) }]}>
                      {data?.performanceScore?.dietLogDetails?.avgRating}
                    </Text>
                  </View>
                </View>
                <View style={[styles.verticalLine, { height: scale(20) }]} />
                <View>
                  <View style={[styles.requestTextView]}>
                    <FastImage source={icons.review} style={styles.starImg} />
                    <Text style={[styles.numberText, { marginLeft: scale(6) }]}>
                      {data?.performanceScore?.dietLogDetails?.avgRating}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>

        {/* 3rd Card */}
        <View style={styles.containerHeader}>
          <View>
            <Text
              style={[
                styles.largeTextStyle,
                {
                  alignSelf: "flex-start",
                  marginHorizontal: 10,
                  marginVertical: 10,
                },
              ]}
            >
              Workout Goal
            </Text>
          </View>
          <View style={styles.horizontalLine}></View>

          {workoutGoals &&
            workoutGoals.map((goal, index) => (
              <View
                key={index}
                style={[styles.row, { justifyContent: "space-between" }]}
              >
                <Text style={styles.textUser}>• {goal}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    setModalVisible(true);
                    setNewGoalIndex(index);
                  }}
                >
                  <FastImage
                    source={images.delete_img}
                    style={styles.deleteImg}
                  />
                </TouchableOpacity>
              </View>
            ))}

          <View style={styles.listView}>
            <TextInput
              style={styles.textInput}
              value={newGoal}
              onChangeText={(text) => setNewGoal(text)}
            />
            <TouchableOpacity
              style={[
                styles.secondaryButton,
                {
                  backgroundColor:
                    newGoal.length > 0 ? COLORS.themGreen : COLORS.lightGray,
                },
              ]}
              onPress={addGoal}
            >
              <Text style={styles.secondaryButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4 card */}
        <View style={[styles.containerHeader, { paddingVertical: 0 }]}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Text
              style={[
                styles.largeTextStyle,
                {
                  alignSelf: "flex-start",
                  marginVertical: 10,
                  marginHorizontal: 0,
                },
              ]}
            >
              {CONTEXT.sessionHistory}
            </Text>
            <TouchableOpacity onPress={() => listShow()}>
              <FastImage
                source={showList ? icons.down_white_icon : icons.right_arrow}
                style={showList ? styles.arrowDowIcon : styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine}></View>

          <View style={[styles.row]}>
            <FastImage source={images.pencil_color} style={styles.deleteImg} />
            <Text style={styles.textUser}>{CONTEXT.memberSignReq}</Text>
            <TouchableOpacity style={styles.deleteButton}>
              <FastImage source={images.danger} style={styles.dangerImg} />
            </TouchableOpacity>
          </View>

          {showList ? (
            <View style={[styles.listView, { flexDirection: "column" }]}>
              {data?.sessionInfo?.map((session, index) => (
                <View key={index} style={styles.row}>
                  <Image
                    source={images.calendar_color}
                    style={[
                      styles.smallIcon,
                      { tintColor: COLORS.lightWhite, alignSelf: "center" },
                    ]}
                  />
                  <Text
                    numberOfLines={1}
                    style={[styles.textUser, { width: "50%" }]}
                  >
                    {formatDate(session?.bookDate)}{" "}
                    {session?.exercises?.join(", ")}
                  </Text>
                  <View style={styles.ratingView}>
                    {session.isLogPresent ? (
                      <TouchableOpacity
                        onPress={() => handleLogPress(session)}
                        style={[
                          styles.confirmButton,
                          {
                            backgroundColor: COLORS.lightBlack,
                            borderWidth: 0.7,
                            borderColor: COLORS.themGreen,
                            borderRadius: scale(15),
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.smallTextStyle,
                            { color: COLORS.white },
                          ]}
                        >
                          Log
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => handleWirteLogPress(session)}
                        style={[
                          styles.confirmButton,
                          { backgroundColor: COLORS.gray },
                        ]}
                      >
                        <Text
                          style={[styles.confirmText, { color: COLORS.white }]}
                        >
                          {CONTEXT.writeLog}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {!session?.isLogPresent ? ( // Render request button if log is not present
                      <TouchableOpacity
                        disabled={session?.isRequestSent}
                        onPress={() => handleRequestPress(session)}
                        style={[
                          styles.confirmButton,
                          {
                            backgroundColor: !session?.isRequestSent
                              ? COLORS.red
                              : COLORS.Orange,
                          },
                        ]}
                      >
                        <Text
                          style={[styles.confirmText, { color: COLORS.white }]}
                        >
                          {!session?.isRequestSent
                            ? CONTEXT.request
                            : "Requested"}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          // Handle log not present action
                        }}
                        style={[styles.confirmButton]}
                      >
                        <Text style={[styles.confirmText]}>
                          {CONTEXT.confirm}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {/* 5 card */}
        <View style={styles.containerHeader}>
          <Text
            style={[
              styles.largeTextStyle,
              {
                alignSelf: "flex-start",
                marginHorizontal: 10,
                marginVertical: 10,
              },
            ]}
          >
            {CONTEXT.trainerNotes}
          </Text>

          <View style={styles.horizontalLine}></View>

          {workoutNotes &&
            workoutNotes.map((note, index) => (
              <View
                key={index}
                style={[styles.row, { justifyContent: "space-between" }]}
              >
                <Image
                  source={images.calendar_color}
                  style={[styles.sessionIcon, { tintColor: COLORS.lightWhite }]}
                />
                <Text
                  style={[
                    styles.textUser,
                    { width: "10%", alignSelf: "flex-start" },
                  ]}
                >
                  {formatDate(note?.date)}
                </Text>
                <View
                  style={[
                    styles.ratingView,
                    { width: "65%", justifyContent: "flex-start" },
                  ]}
                >
                  <Text style={styles.ratingText}>{note?.notes}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    setModalVisibleNotes(true), setNewTrainerIndex(note?.id);
                  }}
                >
                  <FastImage
                    source={images.delete_img}
                    style={styles.deleteImg}
                  />
                </TouchableOpacity>
              </View>
            ))}

          <View style={styles.listView}>
            <TextInput
              style={styles.textInput}
              value={newNotes}
              onChangeText={(text) => setNewNotes(text)}
            />
            <TouchableOpacity
              style={[
                styles.secondaryButton,
                {
                  backgroundColor:
                    newNotes.length > 0 ? COLORS.themGreen : COLORS.lightGray,
                },
              ]}
              onPress={addNotes}
            >
              <Text style={styles.secondaryButtonText}>{CONTEXT.add}</Text>
            </TouchableOpacity>
          </View>
          {WorkoutDeleteModal()}
          {WorkoutModalRequest()}
          {WorkoutNotesModal()}
          <ConfirmRequestModal
            visible={showConfirmModal}
            onCancel={() => {
              setShowConfirmModal(false);
            }}
          />
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default MemberDetail;
