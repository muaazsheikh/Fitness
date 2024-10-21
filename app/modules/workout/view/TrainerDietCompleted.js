import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import styles from "./Style";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseType from "../component/exercise";
import SearchBar from "../../../components/search";
import { icons, images } from "../constant";
import _ from "lodash";
import { COLORS, CONTEXT } from "../constant/theme";
import { NavigationStrings } from "../../../constants";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import TrainerCompleteComponent from "../component/trainerCompleteComponent";
import TrainerUncompleteComponent from "../component/trainerUncompleteComponent";
import CalendarModal from "../component/modal/calendar/CalendarModal";
import { useFocusEffect } from "@react-navigation/native";
import {
  dietListFailure,
  dietListRequest,
  dietListSuccess,
} from "../../../redux/getDietSlice";
import getDietListApi from "../../../api/member-diet/getDietList";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import ExerciseList from "../component/trainerListDiet";
import getTrainerListApi from "../../../api/member-diet/getTrainerList";
import Seperator from "../../../components/seperator";

const TrainerDietCompleted = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedID, setselectedID] = React.useState();
  const [selectedType, setSelectedType] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchHistory, setSearchHistory] = React.useState([]);
  const [selectedView, setSelectedView] = React.useState("member");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCalender, setModalCalender] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectDate, setSelectDate] = React.useState(new Date());
  const [trainerList, setTrainerList] = useState([]);
  const [memberLogData, setMemberLogData] = useState([]);
  const [trainerLogData, setTrainerLogData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dinner, setDinner] = React.useState(null);
  const [lunch, setLunch] = React.useState(null);
  const [snacks, setSnacks] = React.useState(null);
  const [breakfast, setBreakfast] = React.useState(null);
  const [all, setAll] = useState(null);
  const [dinnerMember, setDinnerMember] = React.useState(null);
  const [lunchMember, setLunchMember] = React.useState(null);
  const [snacksMember, setSnacksMember] = React.useState(null);
  const [breakfastMember, setBreakfastMember] = React.useState(null);
  const [allMember, setAllMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("rgba(204, 255, 0, 0.2)");
  const [dotColor, setDotColor] = useState("red");
  const [lengthData, setLengthData] = useState(null);
  const showView = useSelector((state) => state?.work?.dietVisible);
  const buttonShow = useSelector((state) => state.choiceWindowSlice);

  const fadeAnim = new Animated.Value(0);

  const handleScrollEndDrag = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleMomentumScrollEnd = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        setLoading(true);

        setSelectedItem(null);
        try {
          dispatch(dietListRequest());
          const response = await getDietListApi(selectedID);
          const responseList = await getTrainerListApi();
          setTrainerList(responseList?.data);
          dispatch(dietListSuccess(response));

          const parsedData = response.data.map((item) => {
            const dietLogs = item.dietLogs || {};
            const memberLogs = dietLogs.memberLogs || [];
            const trainerLogs = dietLogs.trainerLogs || [];
            return {
              ...item,
              memberLogs,
              trainerLogs,
            };
          });

          const trainerLogs = parsedData.filter(
            (item) => item.memberLogs.length > 0 && item.trainerLogs.length > 0
          );
          const breakfast = trainerLogs?.filter(
            (item) => item?.meal === "Breakfast"
          );
          const lunch = trainerLogs?.filter((item) => item?.meal === "Lunch");

          const dinner = trainerLogs?.filter((item) => item?.meal === "Dinner");
          const snacks = trainerLogs?.filter((item) => item?.meal === "Snacks");
          const all = trainerLogs?.filter((item) => item);

          setAll(all);
          setDinner(dinner);
          setBreakfast(breakfast);
          setLunch(lunch);
          setSnacks(snacks);

          const memberLogs = parsedData.filter(
            (item) =>
              item.memberLogs.length > 0 && item.trainerLogs.length === 0
          );
          const breakfastMember = memberLogs?.filter(
            (item) => item?.meal === "Breakfast"
          );
          const lunchMember = memberLogs?.filter(
            (item) => item?.meal === "Lunch"
          );

          const dinnerMember = memberLogs?.filter(
            (item) => item?.meal === "Dinner"
          );
          const snacksMember = memberLogs?.filter(
            (item) => item?.meal === "Snacks"
          );
          const allMember = memberLogs?.filter((item) => item);
          setAllMember(allMember);
          setDinnerMember(dinnerMember);
          setBreakfastMember(breakfastMember);
          setLunchMember(lunchMember);
          setSnacksMember(snacksMember);
          setTrainerLogData(trainerLogs);
          setMemberLogData(memberLogs);

          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
          dispatch(dietListFailure(error.message));
        }
      }
      setLoading(false);

      fetchMyAPI();
      return () => {};
    }, [selectedID, loader])
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await getDietListApi(
          selectedID,
          searchQuery,
          selectedDate
        );
        const responseList = await getTrainerListApi(selectedDate);
        setTrainerList(responseList?.data);
        console.log("Diet loggggg", JSON.stringify(response));

        const parsedData = response.data.map((item) => {
          const dietLogs = item.dietLogs || {};
          const memberLogs = dietLogs.memberLogs || [];
          const trainerLogs = dietLogs.trainerLogs || [];
          return {
            ...item,
            memberLogs,
            trainerLogs,
          };
        });

        const trainerLogs = parsedData.filter(
          (item) => item.memberLogs.length > 0 && item.trainerLogs.length > 0
        );
        const breakfast = trainerLogs?.filter(
          (item) => item?.meal === "Breakfast"
        );
        const lunch = trainerLogs?.filter((item) => item?.meal === "Lunch");

        const dinner = trainerLogs?.filter((item) => item?.meal === "Dinner");
        const snacks = trainerLogs?.filter((item) => item?.meal === "Snacks");

        setDinner(dinner);
        setBreakfast(breakfast);
        setLunch(lunch);
        setSnacks(snacks);

        const memberLogs = parsedData.filter(
          (item) => item.memberLogs.length > 0 && item.trainerLogs.length === 0
        );
        const breakfastMember = memberLogs?.filter(
          (item) => item?.meal === "Breakfast"
        );
        const lunchMember = memberLogs?.filter(
          (item) => item?.meal === "Lunch"
        );

        const dinnerMember = memberLogs?.filter(
          (item) => item?.meal === "Dinner"
        );
        const snacksMember = memberLogs?.filter(
          (item) => item?.meal === "Snacks"
        );
        const allMember = memberLogs?.filter((item) => item);
        setAllMember(allMember);
        setDinnerMember(dinnerMember);
        setBreakfastMember(breakfastMember);
        setLunchMember(lunchMember);
        setSnacksMember(snacksMember);
        setTrainerLogData(trainerLogs);
        setMemberLogData(memberLogs);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(error);
        dispatch(dietListFailure(error.message));
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedDate, selectedID]);

  const handleViewPress = (view) => {
    setSelectedView(view);
    if (view === "trainer") {
      setSelectedView("member");
      navigation.navigate(NavigationStrings.WORKOUT_COMPLETED);
    }
  };

  const handleDateSelect = (date) => {
    setSelectDate(date);
    setSelectedDate(date);
    setColor('rgba(204, 255, 0, 0.5)')
    setModalCalender(false);
  };

  const getTodaysDate = () => {
    let today = !selectedDate.length ? new Date() : new Date(selectedDate);

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let formattedDate =
      (day < 10 ? "0" : "") + month + "." + (month < 10 ? "" : "") + day;
    return formattedDate;
  };

  const data = [
    { type: "user", text: "", icon: images.userImg },
    { type: "date", text: getTodaysDate(), icon: images.calendar_color },
    { type: "Incomplete", text: "Incomplete", icon: icons.uncompleted_icon },
    { type: "Complete", text: "Complete", icon: icons.completed_icon },
  ];

  const dataList = [
    { type: "user", text: "", icon: images.userImg },
    { type: "date", text: getTodaysDate(), icon: images.calendar_color },
  ];

  const handleItemClick = (item) => {
    let colorRgb;
    colorRgb = "rgba(204, 255, 0, 0.2)";
    if (item.type == "date") {
      setLengthData(0);
      setModalCalender(true);
      colorRgb = "#353638";
      setColor(colorRgb);
    } else if (item.type == "user") {
      if (!modalVisible) {
        setSelectedType("");
        setModalVisible(!modalVisible);
        colorRgb = "rgba(204, 255, 0, 0.2)";
      } else {
        setSelectedType("All");
        setModalVisible(!modalVisible);
        colorRgb = "rgba(204, 255, 0, 0.2)";
      }
    } else {
      if (item.type === "Complete") {
        colorRgb = "rgba(204, 255, 0, 0.2)";
        setLengthData(trainerLogData?.length);
        setDotColor("rgba(204, 255, 0, 0.5)");
      } else {
        colorRgb = "rgba(255, 124, 124, 0.2)";
        setDotColor("red");
        setLengthData(memberLogData?.length);
      }
      setColor(colorRgb);
      setSelectedType(item.text);
    }
    setSelectedItem(item.type); // Update selected item
  };

  const handleItem = (item) => {
    setselectedID(item);
    setSelectedType("All");
    setModalVisible(!modalVisible);
    // setSelectedType(item.text);
  };
  const handleOptionPress = (meal) => {
    if (meal === "1") {
      setMemberLogData(breakfastMember);
      setTrainerLogData(breakfast);
    } else if (meal === "2") {
      setMemberLogData(lunchMember);
      setTrainerLogData(lunch);
    } else if (meal === "3") {
      setMemberLogData(dinnerMember);
      setTrainerLogData(dinner);
    } else if (meal === "4") {
      setMemberLogData(snacksMember);
      setTrainerLogData(snacks);
    } else if (meal === "5") {
      setMemberLogData(allMember);
      setTrainerLogData(all);
    }
  };

  const handleInputChange = _.debounce((text) => {
    setSearchQuery(text);
    setSearchHistory((prevHistory) => [text, ...prevHistory]);
  }, 0);

  const Search = () => (
    <View style={styles.searchView}>
      <SearchBar
        placeHolder={CONTEXT.name}
        handleInputChange={handleInputChange}
      />
    </View>
  );

  const HeaderList = () => (
    <View style={[styles.headerTrainer, { height: !showView ? 80 : 200 }]}>
      <ExerciseType
        data={modalVisible ? dataList : data}
        type={"workout"}
        selectedItem={selectedItem}
        trainer={modalVisible ? false : true}
        onItemClick={handleItemClick}
        onItemMeal={handleOptionPress}
        color={color}
        lengthData={lengthData}
        dotColor={dotColor}
      />
    </View>
  );
  const Container = () => (
    <View style={{ flex: 2, zIndex: 1 }}>
      {selectedType == "Incomplete" && (
        <>
          <TrainerUncompleteComponent
            data={memberLogData}
            onChange={() => setLoader(true)}
          />
          {!memberLogData?.length > 0 ? (
            <Seperator
              imageUrl={images.dish_placeholder}
              title={CONTEXT.diet_placeholder}
              dimesion={150}
            />
          ) : null}
        </>
      )}
      {selectedType == "Complete" && (
        <>
          <TrainerCompleteComponent data={trainerLogData} />
          {!trainerLogData?.length > 0 && !loading ? (
            <Seperator
              imageUrl={images.dish_placeholder}
              title={CONTEXT.diet_placeholder}
              dimesion={150}
            />
          ) : null}
        </>
      )}
      {selectedType === "" && (
        <FlatList
          data={trainerList}
          // keyExtractor={(item) => item.memberId}
          contentContainerStyle={styles.horizontalListContainer}
          renderItem={({ item }) => (
            <ExerciseList
              //  key={item.memberId}
              imageUrl={item.imageUrl}
              text={item.memberName}
              type={item.type}
              id={item.memberId}
              confirm={item.complete}
              inComplete={item.incomplete}
              //  isSelected={selectedID.some(
              //    (selectedItem) => selectedItem.id === item.id
              //  )}
              onPress={() => handleItem(item.memberId)}
            />
          )}
          numColumns={1} // Set the number of columns to 1 (single column)
        />
      )}
      {selectedType == "All" && (
        <>
          {/* {trainerLogData && (
            <TrainerCompleteComponent
              navigation={navigation}
              data={trainerLogData}
            />
          )} */}
          {/* {memberLogData && (
            <TrainerUncompleteComponent
              navigation={navigation}
              data={memberLogData}
              onChange={() => setLoader(true)}
            />
          )} */}
          {!trainerLogData.length && !memberLogData.length && !loading ? (
            <Seperator
              imageUrl={images.dish_placeholder}
              title={CONTEXT.diet_placeholder}
              dimesion={150}
            />
          ) : (
            <>
              <TrainerUncompleteComponent
                navigation={navigation}
                data={memberLogData}
                onChange={() => setLoader(true)}
              />
              <TrainerCompleteComponent
                navigation={navigation}
                data={trainerLogData}
              />
            </>
          )}
        </>
      )}
    </View>
  );

  const ModalContainer = () => (
    <CalendarModal
      modalVisible={modalCalender}
      setModalVisible={setModalCalender}
      selectedDate={selectedDate}
      onSelectDate={handleDateSelect}
    />
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
          <FastImage
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
          <FastImage
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

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Search()}
        {HeaderList()}
        {ModalContainer()}
        <ScrollView
          scrollEventThrottle={16}
          onScrollEndDrag={handleScrollEndDrag}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          style={[
            styles.scrollV,
            { marginTop: !showView ? scale(-12) : scale(-113) },
          ]}
        >
          {Container()}
        </ScrollView>

        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        {/* {buttonShow?.show && (
          <View style={[styles.workoutButtonContainer]}>{WorkoutButton()}</View>
        )} */}
      </SafeAreaView>
    </View>
  );
};

export default TrainerDietCompleted;
