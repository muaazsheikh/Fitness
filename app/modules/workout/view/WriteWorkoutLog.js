import React, { useState, useMemo, useCallback, useEffect } from "react";
import { View, FlatList, AppState } from "react-native";
import styles from "./Style";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseType from "../component/exercise";
import SearchBar from "../../../components/search";
import ExerciseList from "../component/exerciseList";
import { icons, images } from "../constant";
import _ from "lodash";
import { COLORS, CONTEXT } from "../constant/theme";
import { PrimaryButton } from "../../../components";
import { NavigationStrings } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedExercise,
  setSelectedWorkout,
  workoutExercise,
  workoutList,
} from "../../../redux/workoutSlice";
import {
  exerciseFailure,
  exerciseRequest,
  exerciseSuccess,
} from "../../../redux/getExerciseSlice";
import getExerciseListApi from "../../../api/member-diet/getExerciseList";
import Spinner from "react-native-loading-spinner-overlay";
import TrainerHeader from "../../tariner-information/component/header";
import Seperator from "../../../components/seperator";
import FlashMessage from "../../../components/flash";

const WriteWorkoutLog = ({ navigation }) => {
  const dispatch = useDispatch();
  const workoutSelect = useSelector((state) => state?.work?.selectedItems);
  const selectedWorkoutItem = useSelector((state) => state?.work?.selectedType);
  const sessionID = useSelector((state) => state?.work?.sessionId);
  const loading = useSelector((state) => state.work.loading);
  const [exerciseData, setExerciseData] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchHistory, setSearchHistory] = React.useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

 
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
      console.log(response);
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
    { text: "Favorites", image: icons, type: "Favorites" },
    { text: "All", type: "All" },
    { text: "Back", type: "Back" },
    { text: "Chest", type: "Chest" },
    { text: "Biceps", type: "Biceps" },
    { text: "Leg", type: "Leg" },
    { text: "Shoulder", type: "Shoulder" },
    { text: "Triceps", type: "Triceps" },
  ];

  const filteredDataList = useMemo(() => {
    if (selectedType.toLowerCase === "All" && !searchQuery) {
      return exerciseData;
    }
    const filteredByType =
      selectedType !== "All"
        ? exerciseData.filter(
            (item) => item.part === selectedType.toLowerCase()
          )
        : exerciseData;
    const filteredBySearch = searchQuery
      ? filteredByType.filter((item) =>
          item.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : filteredByType;
    return filteredBySearch;
  }, [exerciseData, selectedType, searchQuery]);

  const handleItemClick = (item) => {
    setSelectedType(item.type);
    dispatch(setSelectedWorkout(item.text));
  };
  const handleButton = () => {
    if (selectedWorkoutItem?.length > 0) {
      navigation.navigate(NavigationStrings.WRITE_LOG_EXERCISE);
    } else {
      showMessage();
    }
  };

  // const handleItemPress = (item) => {
  //   const index = selectedWorkoutItem?.some(
  //     (selectedItem) => selectedItem?.id === item?.id
  //   );
  //   if (!index) {
  //     dispatch(setSelectedExercise([...selectedWorkoutItem, item]));
  //   } else {
  //     const updatedSelectedItems = selectedWorkoutItem.filter(
  //       (val) => val?.id !== item?.id
  //     );
  //     dispatch(setSelectedExercise(updatedSelectedItems));
  //   }
  // };
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
    setSearchHistory((prevHistory) => [text, ...prevHistory]);
  }, 500);
  const Search = () => (
    <View style={styles.searchView}>
      <TrainerHeader text="Excercise Log" imageUrl={icons.chat_icon} />
    </View>
  );

  const HeaderList = () => (
    <ExerciseType
      data={data}
      type={"list"}
      color={COLORS.themGreen}
      textColor={COLORS.black}
      selectedItem={selectedType}
      onItemClick={handleItemClick}
    />
  );

  const Container = () => (
    <>
      <FlatList
        data={filteredDataList}
        keyExtractor={(item) => item.id}
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
            localSelected={selectedWorkoutItem?.some(
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
  const selectedItemsLength = selectedWorkoutItem?.length;

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
        {!filteredDataList?.length > 0 ? (
          <View style={{ alignSelf: "center" }}>
            <Seperator title={"No Data Available"} dimesion={150} />
          </View>
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
