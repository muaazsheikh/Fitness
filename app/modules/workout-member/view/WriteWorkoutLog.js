import React, { useState, useMemo, useEffect, useCallback } from "react";
import { View, FlatList, Alert } from "react-native";
import styles from "./Style";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseType from "../component/exercise";
import ExerciseList from "../component/exerciseList";
import { icons, images } from "../constant";
import _ from "lodash";
import { COLORS } from "../constant/theme";
import { PrimaryButton } from "../../../components";
import { NavigationStrings } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedExercise,
  setSelectedWorkout,
} from "../../../redux/workoutSlice";
import {
  exerciseFailure,
  exerciseRequest,
  exerciseSuccess,
} from "../../../redux/getExerciseSlice";
import getExerciseListApi from "../../../api/member-diet/getExerciseList";
import Spinner from "react-native-loading-spinner-overlay";
import Seperator from "../../../components/seperator";
import FlashMessage from "../../../components/flash";
import TrainerHeader from "../component/header-component";

const WriteWorkoutLog = ({ navigation }) => {
  const dispatch = useDispatch();
  const workoutSelect = useSelector((state) => state?.work?.selectedItems);
  const workoutExercise = useSelector((state) => state?.work?.selectedType);
  const sessionID = useSelector((state) => state?.work?.sessionId);
  const loading = useSelector((state) => state.work.loading);
  const [selectedItems, setSelectedItems] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const showMessage = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide the message after 3 seconds
  };

  const fetchExerciseData = useCallback(async () => {
    try {
      dispatch(exerciseRequest());
      const response = await getExerciseListApi();
      dispatch(exerciseSuccess(response));
      setExerciseData(response.data);
    } catch (error) {
      console.log(error);
      dispatch(exerciseFailure(error.message));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchExerciseData();
  }, [fetchExerciseData]);

  const data = [
    { text: "Favorites", image: icons },
    { text: "All" },
    { text: "Back" },
    { text: "Chest" },
    { text: "Biceps" },
    { text: "Leg" },
    { text: "Shoulder" },
    { text: "Triceps" },
  ];

  const filteredDataList = useMemo(() => {
    let filteredByType;

    if (selectedType === "Favorites") {
      filteredByType = exerciseData.filter((item) => item.isPrefer);
    } else if (selectedType !== "All") {
      filteredByType = exerciseData.filter(
        (item) => item.part === selectedType.toLowerCase()
      );
    } else {
      filteredByType = exerciseData;
    }

    const filteredBySearch = searchQuery
      ? filteredByType.filter((item) =>
          item.exerciseNameEng.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : filteredByType;

    return filteredBySearch;
  }, [exerciseData, selectedType, searchQuery]);

  const handleItemClick = (item) => {
    setSelectedType(item.text);
    dispatch(setSelectedWorkout(item.text));
  };

  const handleButton = () => {
    if (selectedItems.length > 0) {
      if (sessionID.length < 1) {
        navigation.navigate(
          NavigationStrings.WRITE_LOG_EXERCISE_SESSION_MEMBER
        );
      } else {
        navigation.navigate(NavigationStrings.WRITE_LOG_EXERCISE_MEMBER);
      }
    } else {
      showMessage();
    }
  };

  const handleItemPress = (item) => {
    const index = selectedItems.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );
    if (index === -1) {
      // Add the new item to the selectedItems array, including the imageUrl
      const newSelectedItem = {
        id: item.id,
        imageUrl: item.exerciseImg
          ? { uri: item.exerciseImg }
          : images.default_img, // Include the imageUrl
        exerciseName: item.exerciseNameEng, // You can add more details if needed
      };

      const updatedItems = [...selectedItems, newSelectedItem];

      setSelectedItems(updatedItems);
      dispatch(setSelectedExercise(updatedItems)); // Dispatch the updated array with imageUrl
    } else {
      // Remove the item if it is already selected
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems.splice(index, 1);

      setSelectedItems(updatedSelectedItems);
      dispatch(setSelectedExercise(updatedSelectedItems));
    }
  };

  const handleInputChange = _.debounce((text) => {
    setSearchQuery(text);
  }, 500);

  const Search = () => (
    <View style={styles.searchView}>
      <TrainerHeader
        text="Excercise Log"
        navigation={navigation}
        chat={true}
        imageUrl={icons.chat_icon}
      />
    </View>
  );

  const HeaderList = () => (
    <ExerciseType
      data={data}
      color={COLORS.themGreen}
      type={"list"}
      onItemClick={handleItemClick}
      selectedItem={selectedType}
    />
  );

  const Container = () => (
    <>
      <FlatList
        data={filteredDataList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.horizontalListContainer}
        renderItem={({ item }) => (
          <ExerciseList
            key={item.id}
            id={item?.id}
            imageUrl={
              item?.exerciseImg
                ? { uri: item?.exerciseImg }
                : images.default_img
            }
            text={item?.exerciseNameEng}
            isPrefer={item?.isPrefer}
            type={item?.part}
            isSelected={selectedItems.some(
              (selectedItem) => selectedItem.id === item.id
            )}
            onPress={() => handleItemPress(item)}
            refreshData={fetchExerciseData} // Pass the refresh function
          />
        )}
        numColumns={1}
      />
    </>
  );

  const selectedItemsLength = selectedItems.length;

  const button = () => (
    <View
      style={{
        position: "absolute",
        bottom: 30,
        zIndex: 1,
        alignSelf: "center",
      }}
    >
      <PrimaryButton
        title={`Add Log ${selectedItemsLength} exercises`}
        style={180}
        onPress={() => handleButton()}
      />
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Search()}
        {HeaderList()}
        {!filteredDataList?.length ? (
          <Seperator
            title={"                                   No Data Available"}
            dimesion={150}
          />
        ) : (
          Container()
        )}
        {button()}
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        {isVisible && (
          <FlashMessage top={true} message={"Please select item"} />
        )}
      </SafeAreaView>
    </View>
  );
};

export default WriteWorkoutLog;
