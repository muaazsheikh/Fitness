import React, { useState, useMemo, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./Style";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../constant";
import _ from "lodash";
import { COLORS } from "../constant/theme";
import { PrimaryButton } from "../../../components";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import WorkoutSetComponent from "../component/setComponent";
import UserHeader from "../component/userHeader";
import TrainerHeader from "../component/header-component";
import CustomRatingInput from "../component/rating";
import { useDispatch, useSelector } from "react-redux";
import {
  memberDetailFailure,
  memberDetailRequest,
  memberDetailSuccess,
} from "../../../redux/memberDetailSlice";
import memberDetailApi from "../../../api/member-workout/memberDetail";
import Spinner from "react-native-loading-spinner-overlay";
import Seperator from "../../../components/seperator";
import { useFocusEffect } from "@react-navigation/native";
import { CONTEXT } from "../../home/constant/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PTSessionReview from "../../../api/member-workout/PTSessionReview";

const { width, height } = Dimensions.get("window");

const WorkoutLogCompletedDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { id, createdBy } = route.params;
  const loading = useSelector((state) => state.memberDetail.loading);

  const [modalVisible, setModalVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [defaultRating, setDefaultRating] = useState(2);
  const [share, setShare] = useState("");
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [memberData, setMemberData] = useState([]);
  const [trainerData, setTrainerData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [workoutSatisfactionReason, setWorkoutSatisfactionReason] =
    useState("");
  const [workoutIntensityReason, setWorkoutIntensityReason] = useState("");
  const [workoutDurationReason, setWorkoutDurationReason] = useState("");
  const [workoutDirectionReason, setWorkoutDirectionReason] = useState("");
  const [workoutTypeSatisfactionReason, setWorkoutTypeSatisfactionReason] =
    useState("");
  const [communicationSatisfactionReason, setCommunicationSatisfactionReason] =
    useState("");
  const [
    feedbackTimingSatisfactionReason,
    setFeedbackTimingSatisfactionReason,
  ] = useState("");
  const [sessionPunctualityReason, setSessionPunctualityReason] = useState("");

  const [workoutSatisfaction, setWorkoutSatisfaction] = useState(2);
  const [workoutIntensity, setWorkoutIntensity] = useState(2);
  const [workoutDuration, setWorkoutDuration] = useState(2);
  const [workoutDirection, setWorkoutDirection] = useState(2);
  const [workoutTypeSatisfaction, setWorkoutTypeSatisfaction] = useState(2);
  const [communicationSatisfaction, setCommunicationSatisfaction] = useState(2);
  const [feedbackTimingSatisfaction, setFeedbackTimingSatisfaction] =
    useState(2);
  const [sessionPunctuality, setSessionPunctuality] = useState(2);

  const handleShare = (id) => {
    // Alert the id received from the child component
    setShare(id);
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${month}.${day}`;
  };

  const formatTime = (date) => {
    const dateObj = new Date(date);

    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    }).format(dateObj);
  };

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          dispatch(memberDetailRequest());
          const response = await memberDetailApi(id);
          dispatch(memberDetailSuccess(response));
          setMemberData(response?.data?.workoutLogFound);
          setTrainerData(response?.data);
        } catch (error) {
          console.log(JSON.stringify(error));
          dispatch(memberDetailFailure(error.message));
        }
      }
      fetchMyAPI();
      return () => {};
    }, [share]) // Pass an empty dependency array to only run once when the component mounts
  );

  const Search = () => (
    <View style={styles.searchView}>
      <TrainerHeader
        text="Logs created by members"
        imageUrl={icons.chat_icon}
      />
    </View>
  );

  const HeaderList = () => (
    <View style={{ backgroundColor: COLORS.transparent }}>
      <UserHeader
        name={trainerData?.trainerDetails?.name}
        rating={trainerData?.avgRating}
        date={trainerData?.workoutTime || null}
        sessionCount={trainerData?.sessionDetails?.sessionCompleted}
        totalSession={trainerData?.sessionDetails?.totalSessions}
      />
      <ScrollView>{Container()}</ScrollView>
    </View>
  );

  const Container = () => (
    <View style={{ flex: 2, marginBottom: 90, marginTop: 90 }}>
      {memberData ? (
        <WorkoutSetComponent
          navigation={navigation}
          data={memberData}
          onShare={handleShare}
          createdBy={createdBy}
        />
      ) : (
        <Seperator title={"No Data Available"} dimesion={150} />
      )}
    </View>
  );

  const onRevieweSubmmit = async () => {
    try {
      const params = {
        workoutLogId: id,
        reviews: {
          workoutSatisfaction,
          workoutSatisfactionReason,

          workoutIntensity,
          workoutIntensityReason,

          workoutDuration,
          workoutDurationReason,

          workoutDirection,
          workoutDirectionReason,

          workoutTypeSatisfaction,
          workoutTypeSatisfactionReason,

          communicationSatisfaction,
          communicationSatisfactionReason,

          feedbackTimingSatisfaction,
          feedbackTimingSatisfactionReason,

          sessionPunctuality,
          sessionPunctualityReason,
        },
        notes: "Needs more understanding",
      };
      const response = await PTSessionReview(params);
      setModalVisible(false);
      setShowConfirmModal(true);
    } catch (error) {
      console.log("submit review error", JSON.stringify(error.response));
    }
  };

  const ConfirmModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmModal}
        onRequestClose={() => {
          setShowConfirmModal(false);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setShowConfirmModal(false)}>
          <View style={styles.reviewModelView}>
            <View style={styles.confirmModal}>
              <TouchableOpacity
                style={styles.crossIconView}
                onPress={() => setShowConfirmModal(false)}
              >
                <FastImage
                  source={icons.CrossButton}
                  style={styles.crossImage}
                />
              </TouchableOpacity>
              <View style={styles.requestTextView}>
                <Text
                  style={[styles.requestTextStyle, { marginLeft: scale(6) }]}
                >
                  {CONTEXT.reviewSubmitted}
                </Text>
              </View>
              <View style={styles.successImageView}>
                <FastImage
                  source={images.success}
                  style={styles.successImageStyle}
                />
              </View>
              <Text style={styles.confirmLargeText}>
                {CONTEXT.thanksForFeedback}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const ModalContainer = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modelViewcontainer}>
        <View style={styles.confirmModal}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.crossIconView}
          >
            <FastImage source={icons.CrossButton} style={styles.crossImage} />
          </TouchableOpacity>
          <View style={{}}>
            <View>
              <Text
                style={[styles.largeTextStyle, { fontSize: 18, marginTop: 0 }]}
              >
                Write PT session review
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                gap: 20,
                marginVertical: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  gap: 10,
                  marginVertical: 20,
                }}
              >
                <FastImage source={images.User} style={styles.userIcon} />
                <Text style={[styles.userTextStyle]}>
                  {trainerData?.trainerDetails?.name}
                </Text>
              </View>

              <View style={styles.verticalLine} />

              <View style={{ marginLeft: 10 }}>
                <Text style={[styles.largeTextStyle]}>
                  {formatDate(trainerData?.workoutTime)}
                </Text>
                <View style={[styles.requestTextView]}>
                  <FastImage
                    source={images.CalendarIcon}
                    style={[styles.smallIcon]}
                  />
                  <Text
                    style={[styles.smallTextStyle, { marginLeft: scale(6) }]}
                  >
                    {CONTEXT.date}
                  </Text>
                </View>
              </View>

              <View style={styles.verticalLine} />

              <View>
                <Text style={[styles.largeTextStyle, { marginLeft: scale(6) }]}>
                  {formatDate(trainerData?.workoutTime)}
                </Text>
                <View style={[styles.requestTextView]}>
                  <FastImage
                    source={images.ClockIcon}
                    style={[styles.smallIcon]}
                  />
                  <Text
                    style={[styles.smallTextStyle, { marginLeft: scale(6) }]}
                  >
                    {CONTEXT.time}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.horizontalLine} />
            <View>
              <Text
                style={[styles.largeTextStyle, { fontSize: 18, marginTop: 10 }]}
              >
                How would you rate your workout session?
              </Text>
            </View>
            <KeyboardAwareScrollView
              style={{ height: height * 0.4, marginTop: 5 }}
            >
              <CustomRatingInput
                imageUrl={images.dumbbell_icon}
                title={"Workout\nsatisfaction"}
                maxRating={maxRating}
                defaultRating={workoutSatisfaction}
                setDefaultRating={setWorkoutSatisfaction}
                value={workoutSatisfactionReason}
                onChangeValue={setWorkoutSatisfactionReason}
                edit={isEdit}
              />
              <CustomRatingInput
                imageUrl={images.workout_intensity}
                title={"Workout\nintensity"}
                maxRating={maxRating}
                defaultRating={workoutIntensity}
                setDefaultRating={setWorkoutIntensity}
                value={workoutIntensityReason}
                onChangeValue={setWorkoutIntensityReason}
                edit={isEdit}
              />
              <CustomRatingInput
                imageUrl={images.workout_intensity}
                title={"Workout\nduration"}
                maxRating={maxRating}
                defaultRating={workoutDuration}
                setDefaultRating={setWorkoutDuration}
                value={workoutDurationReason}
                onChangeValue={setWorkoutDurationReason}
                edit={isEdit}
              />
              <CustomRatingInput
                imageUrl={images.workout_direction}
                title={"Workout\ndirection"}
                maxRating={maxRating}
                defaultRating={workoutDirection}
                setDefaultRating={setWorkoutDirection}
                value={workoutDirectionReason}
                onChangeValue={setWorkoutDirectionReason}
                edit={isEdit}
              />
              <CustomRatingInput
                imageUrl={images.workout_type}
                title={"Workout type\nsatisfaction"}
                maxRating={maxRating}
                defaultRating={workoutTypeSatisfaction}
                setDefaultRating={setWorkoutTypeSatisfaction}
                value={workoutTypeSatisfactionReason}
                onChangeValue={setWorkoutTypeSatisfactionReason}
                edit={isEdit}
              />
              <CustomRatingInput
                imageUrl={images.communication}
                title={"Communication\nsatisfaction"}
                maxRating={maxRating}
                defaultRating={communicationSatisfaction}
                setDefaultRating={setCommunicationSatisfaction}
                value={communicationSatisfactionReason}
                onChangeValue={setCommunicationSatisfactionReason}
                edit={isEdit}
              />
              <CustomRatingInput
                imageUrl={images.communication}
                title={"Feedback timing\nsatisfaction"}
                maxRating={maxRating}
                defaultRating={feedbackTimingSatisfaction}
                setDefaultRating={setFeedbackTimingSatisfaction}
                value={feedbackTimingSatisfactionReason}
                onChangeValue={setFeedbackTimingSatisfactionReason}
                edit={isEdit}
              />
              <CustomRatingInput
                imageUrl={images.communication}
                title={"Session\nPunctuality"}
                maxRating={maxRating}
                defaultRating={sessionPunctuality}
                setDefaultRating={setSessionPunctuality}
                value={sessionPunctualityReason}
                onChangeValue={setSessionPunctualityReason}
                edit={isEdit}
              />
            </KeyboardAwareScrollView>

            <View
              style={[
                styles.buttonContainer,
                { alignSelf: "flex-end", gap: 5 },
              ]}
            >
              {isEdit ? (
                <PrimaryButton
                  title={"Edit"}
                  style={90}
                  edit={true}
                  color={true}
                  onPress={() => {
                    setIsEdit(false);
                  }}
                />
              ) : (
                <PrimaryButton
                  title={"Cancel"}
                  style={90}
                  edit={true}
                  color={true}
                  onPress={() => setModalVisible(false)}
                />
              )}

              <PrimaryButton
                title={"Confirm"}
                style={90}
                edit={true}
                onPress={() => {
                  if (isEdit) {
                    onRevieweSubmmit();
                  } else {
                    setIsEdit(true);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Search()}
        {HeaderList()}
        {ModalContainer()}
        {ConfirmModal()}
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        {createdBy === "trainer" && (
          <View style={[styles.addYellowview, { flexDirection: "row" }]}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.modalText}>Write PT session review</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default WorkoutLogCompletedDetail;
