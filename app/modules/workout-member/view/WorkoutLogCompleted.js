import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import styles from "./Style";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseType from "../component/exercise";
import { icons, images } from "../constant";
import _ from "lodash";
import { COLORS, CONTEXT } from "../constant/theme";
import { PrimaryButton } from "../../../components";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import UncompleteComponent from "../component/uncompleteComponent";
import TrainerHeader from "../component/header-component";
import {
  memberSummaryFailure,
  memberSummaryRequest,
  memberSummarySuccess,
} from "../../../redux/memberSummarySlice";
import { useDispatch, useSelector } from "react-redux";
import memberSummaryApi from "../../../api/member-workout/memberSummary";
import Spinner from "react-native-loading-spinner-overlay";
import { useFocusEffect } from "@react-navigation/native";
import PersonalLogComponent from "../component/personalLogComponent";
import Seperator from "../../../components/seperator";
import TrainerCreateComponent from "../component/trainerCreateComponent";
import MemberSharedComponent from "../component/memberSharedComponent";
import { NavigationStrings } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setSelectedExercise,
  workoutLoading,
} from "../../../redux/workoutSlice";
import CancelDiscardModal from "../../workout/component/modal/CancelDiscardModal";
import ContinueModal from "../../workout/component/modal/ContinueModal";
import { showDiscardModal } from "../../../redux/showDiscardModalSlice";
import moment from "moment";
import { workoutNoteDiscardApi } from "../../../api/trainer-workout/trainerWorkoutNoteCreate";

const WorkoutLogCompleted = ({ navigation }) => {
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = React.useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("rgba(204, 255, 0, 1)");

  // To set the max number of Stars
  const [trainerData, setTrainerData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [personalData, setPersonalData] = useState([]);
  const [noLogData, setNoLogData] = useState([]);
  const [trainerSignData, setTrainerSignData] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchHistory, setSearchHistory] = React.useState([]);
  const [lengthData, setLengthData] = useState(null);
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [modalDate, setModalDate] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const shouldRefresh = useSelector((state) => state.refresh.shouldRefresh);
  const reload = useSelector((state) => state?.work?.workoutReload);

  useFocusEffect(
    React.useCallback(async () => {
      // const subscription = navigation.addListener("beforeRemove", (e) => {
      //   e.preventDefault();
      // });
      // return () => subscription();
    }, [navigation])
  );

  useEffect(() => {
    fetchMyAPI();
  }, [shouldRefresh, reload]);

  useFocusEffect(
    React.useCallback(() => {
      fetchMyAPI();
      return () => {
        // You can clean up here if needed
      };
    }, [loader]) // Pass an empty dependency array to only run once when the component mounts
  );

  async function fetchMyAPI() {
    setLoading(true);
    try {
      const dateFromLoaclStorage = await AsyncStorage.getItem(
        "@workDateMember"
      );
      if (!!dateFromLoaclStorage) {
        setModalDate(
          moment(JSON.parse(dateFromLoaclStorage)).format("YYYY.MM.DD")
        );
      }
      setSelectedType("All");
      dispatch(memberSummaryRequest());
      const response = await memberSummaryApi();
      dispatch(workoutLoading(false));

      dispatch(memberSummarySuccess(response));

      const trainerLogs = response?.data?.filter(
        (item) =>
          item?.workoutLogSummary?.createdBy === "trainer" &&
          item?.workoutLogSummary?.traineeConfirm
      );
      const trainerSign = response?.data?.filter(
        (item) =>
          item?.workoutLogSummary?.createdBy === "trainer" &&
          !item?.workoutLogSummary?.traineeConfirm
      );
      const memberLogs = response?.data?.filter(
        (item) =>
          item?.workoutLogSummary?.createdBy === "member" &&
          item?.workoutLogSummary?.sessionId
      );
      const personalLogs = response?.data?.filter(
        (item) =>
          item?.workoutLogSummary?.createdBy === "member" &&
          item?.workoutLogSummary?.sessionId === null
      );
      const noLog = response?.data?.filter((item) => item?.isPending);
      // Set the state variables with the filtered data
      setLoading(false);

      setTrainerData(trainerLogs);
      setMemberData(memberLogs);
      setPersonalData(personalLogs);
      setNoLogData(noLog);
      setTrainerSignData(trainerSign);
    } catch (error) {
      setLoading(false);

      console.log(JSON.stringify(error));
      dispatch(memberSummaryFailure(error.message));
    }
  }
  const data = [
    { text: "All" },
    { text: "Write workout log", icon: icons.write_icon },
    { text: "Req. write log", icon: icons.req_write },
    { text: "Req. confirm", icon: icons.req_confirm },
    { text: "Trainer’s PT Session logs", icon: icons.tab_member },
  ];

  // const handleItemClick = (item) => {
  //   console.log("typpee", selectedType);
  //   setSelectedType(item.text);
  // };

  const handleItemClick = (item) => {
    colorRgb = "rgba(204, 255, 0, 1)";
    setLengthData(null);
    setColor(colorRgb);
    setSelectedType(item.text);
  };

  const handleContinue = async () => {
    setShowContinueModal(false);
    const jsonDataForworkoutData = await AsyncStorage.getItem(
      "@workoutDataMember"
    );
    dispatch(setSelectedExercise(JSON.parse(jsonDataForworkoutData)));
    navigation.navigate(NavigationStrings.WRITE_LOG_EXERCISE_MEMBER);
  };

  const handleCeateNew = async () => {
    await AsyncStorage.removeItem("@numSetsArrayMember");
    await AsyncStorage.removeItem("@sessionIDMember");
    await AsyncStorage.removeItem("@workDateMember");
    await AsyncStorage.removeItem("@workoutDataMember");
    const workoutId = await AsyncStorage.getItem("@workoutIdMember");
    workoutNoteDiscardApi(workoutId);
    setShowContinueModal(false);
    navigation.navigate(NavigationStrings.WORKOUT_Tab_MEMBER_STACK);
  };

  const Search = () => (
    <View style={styles.searchView}>
      <TrainerHeader
        navigation={navigation}
        chat={true}
        text="Excercise Log"
        imageUrl={icons.chat_icon}
      />
    </View>
  );

  const HeaderList = () => (
    <View style={{ backgroundColor: COLORS.transparent }}>
      <View>
        <ExerciseType
          data={data}
          trainer={false}
          type={"workout"}
          date={false}
          selectedItem={selectedType}
          onItemClick={handleItemClick}
          color={color}
          lengthData={lengthData}
          textColor={true}
        />
      </View>

      <ScrollView>{Container()}</ScrollView>
    </View>
  );

  const Container = () => (
    <View style={{ flex: 1, marginBottom: 100 }}>
      {selectedType == "Write workout log" && (
        <>
          <TrainerCreateComponent
            data={trainerData}
            color={COLORS.themGreen}
            navigation={navigation}
          />
          {!noLogData?.length > 0 ? (
            <Seperator title={"No Data Available"} dimesion={150} />
          ) : null}
        </>
      )}

      {selectedType == "Req. write log" && (
        <>
          <UncompleteComponent
            onChange={() => setLoader(true)}
            data={noLogData}
            navigation={navigation}
          />
          {!noLogData?.length > 0 ? (
            <Seperator title={"No Data Available"} dimesion={150} />
          ) : null}
        </>
      )}

      {selectedType == "Req. confirm" && (
        <>
          <TrainerCreateComponent
            disable={true}
            data={trainerSignData}
            color={COLORS.themGreen}
            navigation={navigation}
            onChange={() => setLoader(true)}
          />
          {!trainerData?.length > 0 ? (
            <Seperator title={"No Data Available"} dimesion={150} />
          ) : null}
        </>
      )}

      {selectedType == "Member’s PT Session logs" && (
        <>
          <TrainerCreateComponent
            data={trainerData}
            color={COLORS.themGreen}
            navigation={navigation}
          />
          <PersonalLogComponent
            data={personalData}
            color={COLORS.LightOrange}
            navigation={navigation}
            onChange={() => setLoader(true)}
          />
          <MemberSharedComponent
            data={memberData}
            color={COLORS.lightGreen}
            navigation={navigation}
            onChange={() => setLoader(true)}
          />

          {!personalData?.length > 0 &&
          !memberData?.length > 0 &&
          !trainerData?.length > 0 ? (
            <Seperator title={"No Data Available"} dimesion={150} />
          ) : null}
        </>
      )}

      {selectedType == "All" && (
        <>
          <PersonalLogComponent
            data={personalData}
            color={COLORS.LightOrange}
            navigation={navigation}
            onChange={() => setLoader(true)}
          />
          <MemberSharedComponent
            data={memberData}
            color={COLORS.lightGreen}
            navigation={navigation}
            onChange={() => setLoader(true)}
          />
          <TrainerCreateComponent
            disable={true}
            data={trainerSignData}
            color={COLORS.themGreen}
            navigation={navigation}
            onChange={() => setLoader(true)}
          />
          <TrainerCreateComponent
            data={trainerData}
            color={COLORS.themGreen}
            navigation={navigation}
            onChange={() => setLoader(true)}
          />

          <UncompleteComponent
            onChange={() => setLoader(true)}
            data={noLogData}
            navigation={navigation}
          />

          {!personalData?.length > 0 &&
          !memberData?.length > 0 &&
          !trainerData?.length > 0 &&
          !noLogData?.length > 0 &&
          !loading ? (
            <Seperator title={"No Data Available"} dimesion={150} />
          ) : null}
        </>
      )}
    </View>
  );

  const ModalContainer = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modelViewcontainer}>
          <View style={[styles.confirmModal]}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.crossIconView}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>
            <View style={{}}>
              <View>
                <Text
                  style={[
                    styles.largeTextStyle,
                    { fontSize: 18, marginTop: 0 },
                  ]}
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
                <FastImage source={images.User} style={[styles.userIcon]} />
                <Text style={[styles.userTextStyle]}>Mathew</Text>
                <View style={styles.verticalLine} />

                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.largeTextStyle]}>11.23</Text>
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
                  <Text
                    style={[styles.largeTextStyle, { marginLeft: scale(6) }]}
                  >
                    12:20
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
                  style={[
                    styles.largeTextStyle,
                    { fontSize: 18, marginTop: 10 },
                  ]}
                >
                  How would you rate your workout session?
                </Text>
              </View>

              <View style={[styles.buttonContainer, { alignSelf: "flex-end" }]}>
                <PrimaryButton
                  title={"Cancel"}
                  style={90}
                  edit={true}
                  color={true}
                  onPress={() => setModalVisible(false)}
                />

                <PrimaryButton
                  title={"Confirm"}
                  style={90}
                  edit={true}
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Search()}
        {HeaderList()}
        {ModalContainer()}
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        <View
          style={[styles.addYellowview, { flexDirection: "row", right: 30 }]}
        >
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            {!visible ? (
              <FastImage
                source={icons.plus_icon}
                style={[styles.modelIcon, { tintColor: COLORS.black }]}
              />
            ) : (
              <TouchableOpacity onPress={() => setVisible(!visible)}>
                <Text style={styles.minus}> – </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          {visible && (
            <TouchableOpacity
              onPress={async () => {
                const sessionID = await AsyncStorage.getItem(
                  "@sessionIDMember"
                );
                if (!!sessionID) {
                  setShowContinueModal(true);
                } else {
                  setVisible(false);
                  navigation.push(NavigationStrings.WORKOUT_Tab_MEMBER_STACK);
                }
              }}
            >
              <Text style={styles.modalText}>{"Create Workout Log"}</Text>
            </TouchableOpacity>
          )}
        </View>
        <ContinueModal
          visible={showContinueModal}
          onContinue={handleContinue}
          onCreateNew={handleCeateNew}
          date={modalDate}
          memberName={selectedMember}
          isMember={true}
        />
      </SafeAreaView>
    </View>
  );
};

export default WorkoutLogCompleted;
