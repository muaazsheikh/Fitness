import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import styles from "./Style";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseType from "../component/exercise";
import SearchBar from "../../../components/search";
import { images } from "../constant";
import _ from "lodash";
import { COLORS, CONTEXT } from "../constant/theme";
import CalendarModal from "../component/modal/calendar/CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import getTrainerCountApi from "../../../api/member-workout/getTrainerCount";
import CustomCalendar from "../component/calendar";
import { PrimaryButton } from "../../../components";
import {
  setSelectedExercise,
  updateName,
  updateSessionID,
  workoutDate,
} from "../../../redux/workoutSlice";
import {
  resetApiCallStatus,
  resetNumSetsArray,
} from "../../../redux/numSetsSlice";
import { NavigationStrings } from "../../../constants";
import getSessionWorkoutCountApi from "../../../api/trainer-workout/getSessionWorkoutCount";
import ExerciseList from "../component/trainerListDiet";
import FlashMessage from "../../../components/flash";
import Seperator from "../../auth/component/seperator";
import { scale } from "react-native-size-matters";

const SelectMember = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedID, setselectedID] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [calendarModal, setCalendarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalCalender, setModalCalender] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectDate, setSelectDate] = useState(new Date());
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [trainerData, setTrainerData] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const showMessage = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide the message after 3 seconds
  };

  useEffect(() => {
    let isMounted = true; // flag to track if the component is still mounted
    const fetchTrainerData = async () => {
      try {
        const responseList = await getTrainerCountApi(selectedDate);
        setLoading(false);

        if (isMounted) {
          setTrainerData(responseList?.data || []);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
          console.log("Error fetching trainer data:", error);
        }
      }
    };

    fetchTrainerData();
    return () => {
      isMounted = false; // cleanup flag when component unmounts
    };
  }, [selectDate]);

  const handleModalDateSelect = (date) => {
    if (date && !(date instanceof Date)) {
      date = new Date(date); // Ensure the selected date is converted to a Date object
    }

    setSelectDate(date);
    setSelectedDate(date);
    // Set the selected date
    setModalCalender(false); // Close modal after selection
  };

  const formatDate = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date)) {
      return ""; // Return empty string if date is invalid
    }

    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and add 1
    const day = date.getDate().toString().padStart(2, "0"); // Get day

    return `${month}.${day}`; // Return in mm.dd format
  };
  const dataList = [
    {
      text: selectDate ? formatDate(selectDate) : "",
      type: selectDate ? formatDate(selectDate) : "",
      icon: images.calendar_color,
    },
  ];

  const handleItemClick = (item) => {
    setModalCalender(true);
  };

  const handleItem = async (item) => {
    console.log("Selected member item:", item);
    setLoading(true);
    setId(item.memberId);
    setName(item.memberName);
    dispatch(updateName(item.memberName));
    setselectedID(item);
    try {
      const response = await getSessionWorkoutCountApi(item.memberId);
      // console.log("Session workout count response:", response);
      setCalendarData(response?.data.dates);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching session workout count:", error);
    }
    setCalendarModal(!calendarModal);
  };

  const handleDateSelect = (date, id) => {
    setSelectedDate(date);
    dispatch(updateSessionID(id));
    dispatch(workoutDate(date));
  };

  const handleNavigation = (nav) => {
    if (nav === "Edit") {
      if (selectedDate) {
        dispatch(resetNumSetsArray());
        dispatch(resetApiCallStatus());
        setCalendarModal(false);
        dispatch(setSelectedExercise([]));

        navigation.navigate(NavigationStrings.WRITE_WORKOUT_LOG);
      } else {
        showMessage();
      }
    } else {
      setCalendarModal(false);
    }
  };

  const handleInputChange = useCallback(
    _.debounce((text) => {
      setSearchQuery(text);
      setSearchHistory((prevHistory) => [text, ...prevHistory]);
    }, 500),
    []
  );

  const Search = () => (
    <View style={styles.searchView}>
      <SearchBar
        placeHolder={CONTEXT.name}
        handleInputChange={handleInputChange}
      />
    </View>
  );

  const HeaderList = () => (
    <View>
      <ExerciseType
        data={dataList}
        type={"workout"}
        date={selectDate}
        onItemClick={handleItemClick}
      />
    </View>
  );

  function renderNewSeasonSection() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={calendarModal}
        onRequestClose={() => {
          setCalendarModal(false);
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.lightBlack,
            paddingVertical: 20,
            borderRadius: 20,
            marginTop: 100,
            width: scale(330),
            alignSelf: "center",
          }}
        >
          <CustomCalendar
            name={name}
            sessionData={calendarData}
            selectedDate={selectedDate}
            onSelectDate={handleDateSelect}
          />
          {Button()}
        </View>
      </Modal>
    );
  }

  const Button = () => (
    <View
      style={{
        alignSelf: "flex-end",
        flexDirection: "row",
        gap: 20,
        marginRight: 20,
      }}
    >
      <PrimaryButton
        title={"<  Back"}
        style={90}
        edit={true}
        color={true}
        onPress={() => handleNavigation("")}
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

  const Container = () => (
    <View style={{ flex: 1 }}>
      {!trainerData?.length && !loading > 0 && (
        <Seperator title={"No Data Available"} dimesion={150} />
      )}
      <FlatList
        data={trainerData}
        keyExtractor={(item) => item.memberId}
        contentContainerStyle={styles.horizontalListContainer}
        renderItem={({ item }) => (
          <ExerciseList
            imageUrl={item.imageUrl}
            text={item.memberName}
            type={item.type}
            id={item.memberId}
            confirm={item.completeCount}
            inComplete={item.inCompleteCount}
            onPress={() => handleItem(item)}
            sessionCount={item.totalSessionCount}
            sessionComplete={item.completeCount}
          />
        )}
        numColumns={1}
      />
    </View>
  );

  const ModalContainer = () => (
    <CalendarModal
      modalVisible={modalCalender}
      setModalVisible={setModalCalender}
      selectedDate={selectedDate}
      onSelectDate={handleModalDateSelect}
    />
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Search()}
        {HeaderList()}
        {Container()}
        {renderNewSeasonSection()}
        {ModalContainer()}
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        {isVisible && (
          <FlashMessage top={true} message={"Please select date"} />
        )}
      </SafeAreaView>
    </View>
  );
};

export default SelectMember;
