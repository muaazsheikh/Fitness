import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import styles from "./Style";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseType from "../component/exercise";
import { icons, images } from "../constant";
import _ from "lodash";
import { COLORS, CONTEXT } from "../constant/theme";
import { PrimaryButton } from "../../../components";
import FastImage from "react-native-fast-image";
import UncompleteComponent from "../component/uncompleteComponent";
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
import TrainerCreateComponent from "../component/trainerCreateComponent";
import MemberSharedComponent from "../component/memberSharedComponent";
import SearchBar from "../../../components/search";
import { NavigationStrings } from "../../../constants";
import Seperator from "../../auth/component/seperator";
import { scale } from "react-native-size-matters";
import ConfirmModal from "../component/modal/ConfirmModal";
import { toggleChoiceWindow } from "../../../redux/choiceWindowSlice";
import ContinueModal from "../component/modal/ContinueModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setSelectedExercise } from "../../../redux/workoutSlice";
import moment from "moment";
import { workoutNoteDiscardApi } from "../../../api/trainer-workout/trainerWorkoutNoteCreate";

const WorkoutLogCompleted = ({ navigation }) => {
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = React.useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  // const [buttonShow, setButtonShow] = useState(true);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trainerData, setTrainerData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [personalData, setPersonalData] = useState([]);
  const [noLogData, setNoLogData] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchHistory, setSearchHistory] = React.useState([]);
  const [color, setColor] = useState(COLORS.themGreen);
  const [lengthData, setLengthData] = useState(null);
  const [selectedView, setSelectedView] = React.useState("trainer");
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [modalDate, setModalDate] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const fadeAnim = new Animated.Value(0);
  const buttonShow = useSelector((state) => state.choiceWindowSlice);
  const shouldRefresh = useSelector((state) => state.refresh.shouldRefresh);

  useFocusEffect(
    React.useCallback(() => {
      const subscription = navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });

      return () => subscription();
    }, [navigation])
  );

  const handleScrollEndDrag = () => {
    // setButtonShow(false)
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleMomentumScrollEnd = () => {
    // setButtonShow(true)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      setButtonShow: true,
    }).start();
  };

  // To set the max number of Stars

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        setLoading(true);
        try {
          const dateFromLoaclStorage = await AsyncStorage.getItem("@workDate");

          const memberName = await AsyncStorage.getItem("@memberName");
          setSelectedMember(JSON.parse(memberName));
          setModalDate(
            moment(JSON.parse(dateFromLoaclStorage)).format("YYYY.MM.DD")
          );
          setSelectedType("All");
          dispatch(memberSummaryRequest());
          const response = await memberSummaryApi(searchQuery);
          dispatch(memberSummarySuccess(response));
          const trainerLogs = response?.data?.filter(
            (item) => item?.workoutLogSummary?.createdBy === "trainer"
          );
          const memberLogs = response?.data?.filter(
            (item) =>
              item?.workoutLogSummary?.createdBy === "member" &&
              item?.workoutLogSummary?.sessionId
          );
          const personalLogs = response?.data?.filter(
            (item) =>
              item?.workoutLogSummary?.createdBy === "member" &&
              !item?.workoutLogSummary?.sessionId
          );
          const noLog = response?.data?.filter((item) => item?.isPending);

          // Set the state variables with the filtered data
          setTrainerData(trainerLogs);
          setMemberData(memberLogs);
          setPersonalData(personalLogs);
          setNoLogData(noLog);
          setLoader(false);
        } catch (error) {
          setLoader(false);
          setLoading(false);
          console.log(JSON.stringify(error));
          dispatch(memberSummaryFailure(error.message));
        } finally {
          setLoading(false);
        }
      }
      fetchMyAPI();
      return () => {
        // You can clean up here if needed
      };
    }, [loader]) // Pass an empty dependency array to only run once when the component mounts
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      // setLoading(true);

      try {
        setSelectedType("All");
        const response = await memberSummaryApi(searchQuery);
        const trainerLogs = response?.data?.filter(
          (item) => item?.workoutLogSummary?.createdBy === "trainer"
        );
        const memberLogs = response?.data?.filter(
          (item) =>
            item?.workoutLogSummary?.createdBy === "member" &&
            item?.workoutLogSummary?.sessionId
        );
        const personalLogs = response?.data?.filter(
          (item) =>
            item?.workoutLogSummary?.createdBy === "member" &&
            !item?.workoutLogSummary?.sessionId
        );
        const noLog = response?.data?.filter((item) => item?.isPending);
        // Set the state variables with the filtered data
        setTrainerData(trainerLogs);
        setMemberData(memberLogs);
        setPersonalData(personalLogs);
        setNoLogData(noLog);
        setLoader(false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setLoader(false);
        console.log(JSON.stringify(error));
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const data = [
    { text: "All", type: "All" },
    {
      text: "Uncompleted workout logs",
      icon: icons.uncompleted_icon,
      type: "Uncompleted workout logs",
    },
    {
      text: "Logs created by trainer",
      icon: images.pt_name,
      type: "Logs created by trainer",
    },
    {
      text: "Logs Shared by Member",
      icon: images.user_name,
      type: "Logs created by Member",
    },
    {
      text: "Member’s personal logs",
      icon: icons.completed_icon,
      type: "Member’s personal logs",
    },
  ];

  const handleItemClick = (item) => {
    if (item.text === "Uncompleted workout logs") {
      colorRgb = "rgba(255, 124, 124, 0.3)";
      setLengthData(noLogData?.length);
    } else if (item.text === "Member’s personal logs") {
      colorRgb = "rgba(255, 124, 124, 0.3)";
      setLengthData(null);
    } else if (item.text === "Logs Shared by Member") {
      colorRgb = "rgba(0, 250, 224, 0.3)";
      setLengthData(null);
    } else {
      colorRgb = "rgba(204, 255, 0, 0.3)";
      setLengthData(null);
    }
    setColor(colorRgb);
    setSelectedType(item.type);
  };

  const handleContinue = async () => {
    setShowContinueModal(false);
    const jsonDataForworkoutData = await AsyncStorage.getItem("@workoutData");
    dispatch(setSelectedExercise(JSON.parse(jsonDataForworkoutData)));
    navigation.navigate(NavigationStrings.WRITE_LOG_EXERCISE);
  };

  const handleCeateNew = async () => {
    try {
      await AsyncStorage.removeItem("@numSetsArray");
      await AsyncStorage.removeItem("@sessionID");
      await AsyncStorage.removeItem("@workDate");
      await AsyncStorage.removeItem("@workoutData");
      const workoutId = await AsyncStorage.getItem("@workoutId");
      workoutNoteDiscardApi(workoutId);
      setShowContinueModal(false);
      navigation.navigate(NavigationStrings.SELECT_MEMBER);
    } catch (error) {
      console.log("discard error", error);
    }
  };

  const handleViewPress = (view) => {
    setSelectedView(view);
    dispatch(
      toggleChoiceWindow({
        show: false,
      })
    );
    if (view === "member") {
      setSelectedView("trainer");
      navigation.navigate(NavigationStrings.TRAINER_DIET_COMPLETED);
    }
  };

  const Search = () => (
    <View style={styles.searchView}>
      <SearchBar
        placeHolder={CONTEXT.name}
        handleInputChange={handleInputChange}
      />
    </View>
  );

  const WorkoutButton = () => (
    <View style={styles.workoutButtonContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          backgroundColor: COLORS.gray,
          height: scale(105),
        }}
      >
        <TouchableOpacity
          style={[
            styles.touchableView,
            selectedView === "trainer" && styles.selectedView,
          ]}
          onPress={() => {
            handleViewPress("trainer");
          }}
        >
          <Image
            source={
              selectedView === "trainer"
                ? images.dumble_tab
                : images.dumble_color
            }
            style={styles.dumbleImg}
          />
          <Text
            style={[
              styles.text,
              selectedView === "trainer" && styles.selectedText,
            ]}
          >
            {CONTEXT.workout_log}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.touchableView,
            selectedView === "member" && styles.selectedView,
          ]}
          onPress={() => handleViewPress("member")}
        >
          <Image
            source={
              selectedView === "member"
                ? images.banana_color
                : images.banana_tab
            }
            style={styles.bananaImg}
          />
          <Text
            style={[
              styles.text,
              selectedView === "member" && styles.selectedText,
            ]}
          >
            {CONTEXT.diet_log}
          </Text>
        </TouchableOpacity>
      </View>
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
    </View>
  );

  const Container = () => (
    <View style={{ flex: 1, marginBottom: 100 }}>
      {selectedType == "Uncompleted workout logs" && (
        <>
          <UncompleteComponent data={noLogData} navigation={navigation} />
          {!noLogData?.length > 0 ? (
            <Seperator
              title={"No Data Available"}
              dimesion={150}
              imageUrl={images.dish_placeholder}
            />
          ) : null}
        </>
      )}

      {selectedType == "Logs Shared by Member" && (
        <>
          <MemberSharedComponent
            data={memberData}
            color={COLORS.lightGreen}
            navigation={navigation}
          />
          {!memberData?.length > 0 ? (
            <Seperator
              title={"No Data Available"}
              dimesion={150}
              imageUrl={images.dish_placeholder}
            />
          ) : null}
        </>
      )}
      {selectedType == "Logs created by trainer" && (
        <>
          <TrainerCreateComponent
            data={trainerData}
            color={COLORS.themGreen}
            navigation={navigation}
            onChange={() => setLoader(true)}
          />
          {!trainerData?.length > 0 ? (
            <Seperator
              title={"No Data Available"}
              dimesion={150}
              imageUrl={images.dish_placeholder}
            />
          ) : null}
        </>
      )}

      {selectedType == "Member’s personal logs" && (
        <>
          <PersonalLogComponent
            data={personalData}
            color={COLORS.LightOrange}
            navigation={navigation}
          />
          {!personalData?.length > 0 ? (
            <Seperator
              title={"No Data Available"}
              dimesion={150}
              imageUrl={images.dish_placeholder}
            />
          ) : null}
        </>
      )}

      {selectedType == "All" && (
        <>
          <TrainerCreateComponent
            data={trainerData}
            color={COLORS.themGreen}
            navigation={navigation}
            onChange={() => setLoader(true)}
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

          <UncompleteComponent data={noLogData} navigation={navigation} />

          {!personalData?.length > 0 &&
          !memberData?.length > 0 &&
          !trainerData?.length > 0 &&
          !noLogData?.length > 0 &&
          !loading ? (
            <Seperator
              title={"No Data Available"}
              dimesion={150}
              imageUrl={images.dish_placeholder}
            />
          ) : null}
        </>
      )}
    </View>
  );

  const handleInputChange = _.debounce((text) => {
    setSearchQuery(text);
    setSearchHistory((prevHistory) => [text, ...prevHistory]);
  }, 0);
  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Search()}
        {HeaderList()}
        <ScrollView
          scrollEventThrottle={16}
          onScrollEndDrag={handleScrollEndDrag}
          onMomentumScrollEnd={handleMomentumScrollEnd}
        >
          {Container()}
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
          <Spinner
            visible={loader}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </ScrollView>

        {buttonShow && (
          <View style={[styles.addYellowview, { flexDirection: "row" }]}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              {!modalVisible ? (
                <FastImage
                  source={icons.plus_icon}
                  style={[styles.modelIcon, { tintColor: COLORS.black }]}
                />
              ) : (
                <Text style={styles.minus}> – </Text>
              )}
            </TouchableOpacity>

            {modalVisible && (
              <TouchableOpacity
                onPress={async () => {
                  {
                    // navigation.push(NavigationStrings.SELECT_MEMBER),
                    //   setModalVisible(false);

                    const sessionID = await AsyncStorage.getItem("@sessionID");
                    if (!!sessionID) {
                      setShowContinueModal(true);
                    } else {
                      setModalVisible(false);
                      navigation.push(NavigationStrings.SELECT_MEMBER);
                    }
                  }
                }}
              >
                <Text style={styles.modalText}>Create New Workout log</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {/* {"show":false,"selectedTab":"Workout log"} */}
        {buttonShow?.show && (
          <View style={[styles.workoutButtonContainer]}>{WorkoutButton()}</View>
        )}
        <ContinueModal
          visible={showContinueModal}
          onContinue={handleContinue}
          onCreateNew={handleCeateNew}
          date={modalDate}
          memberName={selectedMember}
          isMember={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default WorkoutLogCompleted;
