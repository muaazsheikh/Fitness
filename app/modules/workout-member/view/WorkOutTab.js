import * as React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import styles from "./Style";
import Seperator from "../../../components/seperator";
import { scale } from "react-native-size-matters";
import { COLORS, icons, images } from "../constant";
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import { PrimaryButton } from "../../../components";
import { NavigationStrings } from "../../../constants";
import CustomCalendar from "../component/calendar";
import RejectionModal from "../component/modal/RejectionModal";
import { useDispatch, useSelector } from "react-redux";
import {
  trainerDetailRequest,
  trainerDetailSuccess,
  trainerDetailFailure,
} from "../../../redux/getTrainerDetailSlice";
import getTrainerDetailApi from "../../../api/member-workout/getTrainerDetail";
import {
  updateSessionID,
  workoutDate,
  workoutTime,
} from "../../../redux/workoutSlice";
import {
  resetApiCallStatus,
  resetNumSetsArray,
} from "../../../redux/numSetsSlice";
import Spinner from "react-native-loading-spinner-overlay";
import getSessionWorkoutCountApi from "../../../api/member-workout/getSessionWorkoutCount";
import { CONTEXT } from "../../home/constant/theme";
import FlashMessage from "../../../components/flash";

const WorkOutTab = ({ navigation }) => {
  const [selectedView, setSelectedView] = React.useState("trainer");
  const loading = useSelector((state) => state.trainerDetail.loading);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalRejected, setModalRejected] = React.useState(false);
  const [selectedState, setSelectedState] = React.useState(0);

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [loader, setLoading] = React.useState(false);
  const [calendarData, setCalendarData] = React.useState([]);
  const [selectedSession, setSelectedSession] = React.useState(1);
  const [isVisible, setIsVisible] = React.useState(false);
  const [sessionId, setSessionId] = React.useState(null);

  const showMessage = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide the message after 3 seconds
  };

  const dispatch = useDispatch();

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}.${day}`;
  };

  React.useEffect(() => {
    async function fetchMyAPI() {
      try {
        dispatch(trainerDetailRequest());
        const response = await getTrainerDetailApi();

        const responseDate = await getSessionWorkoutCountApi();
        
        setCalendarData(responseDate?.data.dates);

        setLoading(false);

        dispatch(trainerDetailSuccess(response));
      } catch (error) {
        console.log(JSON.stringify(error));
        dispatch(trainerDetailFailure(error.message));
      }
    }
    fetchMyAPI();
  }, []);

  const handleMonthYearChange = async (month, year) => {
    setLoading(true);
    try {
      const response = await getSessionWorkoutCountApi(month, year);
      setCalendarData(response?.data.dates);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const trainerData = useSelector((state) => state?.trainerDetail?.user?.data);

  const handleDateSelect = (date, session) => {
    setSelectedDate(date);
    setSessionId(session);
    dispatch(workoutDate(date));
  };
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    dispatch(workoutTime(time));
  };

  const handleNavigation = (nav) => {
    if (sessionId) {
      dispatch(updateSessionID(sessionId));
    } else {
      dispatch(updateSessionID(""));
    }
    if (nav === "Edit") {
      if (selectedDate === null || selectedTime === null) {
        showMessage();
      } else {
        if (selectedTime === null) {
          showMessage();
        } else {
          dispatch(resetNumSetsArray());
          dispatch(resetApiCallStatus());
          setModalVisible(false);
          setModalRejected(true);
        }
      }
    } else {
      setModalVisible(false);
      navigation.goBack();
    }
  };

  const handleViewPress = (view) => {
    setSelectedSession(view);
    setSelectedDate(null);
    setSelectedTime(null);
    if (view === 3) {
      dispatch(updateSessionID(""));
    }
  };

  function renderNewSeasonSection() {
    return (
      <CustomCalendar
        name={"Write PT session workout log"}
        handleTimeSelect={handleTimeSelect}
        sessionData={calendarData}
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
        onMonthYearChange={handleMonthYearChange}
      />
    );
  }
  function renderSeasonSection() {
    return (
      <CustomCalendar
        name={"Write personal workout log"}
        handleTimeSelect={handleTimeSelect}
        selectedDate={selectedDate}
        sessionData={""}
        onSelectDate={handleDateSelect}
      />
    );
  }

  const Button = () => (
    <View style={styles.buttonView}>
      <PrimaryButton
        title={"<  Back"}
        style={90}
        edit={true}
        color={true}
        onPress={() => navigation.goBack()}
      />
      <PrimaryButton
        title={"Confirm"}
        style={90}
        edit={true}
        color={false}
        onPress={() => handleNavigation("Edit")}
      />
    </View>
  );

  const renderInputContainer = () => (
    <View style={{ alignSelf: "center", flexDirection: "row" }}>
      <TouchableOpacity
        style={[
          styles.flexDisableView,
          selectedSession === 1 && styles.flexContainer,
        ]}
        onPress={() => {
          handleViewPress(1);
        }}
      >
        <Image
          source={images.pt_name}
          style={[
            styles.starImageStyle,
            {
              tintColor:
                selectedSession === 1 ? COLORS.black : COLORS.themGreen,
              height: 17,
            },
          ]}
        />
        <Text
          numberOfLines={1}
          style={[styles.text, selectedSession === 1 && styles.deselectText]}
        >
          {CONTEXT.pt_sess}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.flexDisableView,
          selectedSession === 3 && styles.flexContainer,
        ]}
        onPress={() => {
          handleViewPress(3);
        }}
      >
        <Image
          source={images.user_name}
          style={[
            styles.starImageStyle,
            {
              tintColor:
                selectedSession === 3 ? COLORS.black : COLORS.themGreen,
              height: 17,
            },
          ]}
        />

        <Text
          numberOfLines={1}
          style={[styles.text, selectedSession === 3 && styles.deselectText]}
        >
          {CONTEXT.individual}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {renderInputContainer()}

        <ScrollView>
          {/* {SeperatorContainer()} */}
          {/* {WorkoutModal()} */}
          <View
            style={[
              styles.confirmModal,
              {
                marginTop: scale(10),
              },
            ]}
          >
            {selectedSession === 1
              ? renderNewSeasonSection()
              : renderSeasonSection()}
          </View>
          <View style={{ alignSelf: "flex-end", marginLeft: scale(120) }}>
            {Button()}
          </View>

          <RejectionModal
            name={selectedSession === 1?trainerData?.trainerDetails.name:trainerData?.userDetails.name}
            date={formattedDate(selectedDate)}
            time={selectedTime}
            sessionHave={trainerData?.totalSessions}
            sessionDone={trainerData?.sessionCompleted}
            modalVisible={modalRejected}
            setModalVisible={setModalRejected}
            selectedState={selectedState}
            navigation={navigation}
          />
          <Spinner
            visible={loading|| loader}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </ScrollView>
        {isVisible && (
          <FlashMessage bottom={true} message={"Please select date and time"} />
        )}
      </SafeAreaView>
    </View>
  );
};

export default WorkOutTab;
