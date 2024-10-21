import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton } from "../../../components";
import { scale } from "react-native-size-matters";
import styles from "./Style";
import { images } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { NavigationStrings } from "../../../constants";
import Spinner from "react-native-loading-spinner-overlay";
import WorkoutListEditComponent from "../component/workoutListEdit";
import FeedBackModal from "../component/modal";
import WriteLogEditContainer from "../component/exerciseEditContainer";
import trainerWorkoutUpdateApi from "../../../api/trainer-workout/trainerWorkoutUpdate";
import _ from "lodash";

const WriteLogEdit = ({ navigation, route }) => {
  const id = route.params;
  const dispatch = useDispatch();
  const workDate = useSelector((state) => state?.work?.selectedDate);
  const workoutTime = useSelector((state) => state?.work?.selectedTime);
  const trainerData = useSelector((state) => state?.trainerDetail?.user?.data);
  const numSetsArray = useSelector((state) => state.numSets);
  const loading = useSelector((state) => state.memberWorkoutCreate.loading);
  const sessionID = useSelector((state) => state?.work?.sessionId);
  const memberName = useSelector((state) => state?.work?.memberName);

  const [progress, setProgress] = useState(5);
  const [repsProgress, setRepsProgress] = useState(10);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [workoutDate, setDate] = useState(id?.workoutDate);
  const [exerciseId, setExerciseID] = useState(id?.exerciseId);
  const [ID, setID] = useState(id?.id);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [workoutData, setWorkoutData] = useState(id?.workoutLog || []);
  const [rate, setRating] = useState(id?.workoutLogFeedback?.rating);
  const [notes, setMemo] = useState(id?.workoutLogFeedback?.notes);
  const dateString = workoutDate;
  const parsedDate = moment(dateString, "YYYY-MM-DD hh:mm A");
  const formattedDate = parsedDate.toISOString();

  const handleEditButtonClick = (index) => {
    setSelectedItemIndex(index);
    const selectedItem = workoutData[index];
    setProgress(selectedItem.weight);
    setRepsProgress(selectedItem.reps);
    setVisible(true);
  };

  const handleDeleteItem = (index) => {
    const updatedWorkoutData = [...workoutData];
    updatedWorkoutData.splice(index, 1); // Remove the item at the specified index
    setWorkoutData(updatedWorkoutData);
  };

  const handleUpdateWorkoutData = (updatedData) => {
    const updatedWorkoutData = [...workoutData];
    updatedWorkoutData[selectedItemIndex] = {
      ...updatedData,
      isEdit: true, // Add isEdit flag
    };
    setWorkoutData(updatedWorkoutData);
    setVisible(false);
  };

  const handleConfirm = () => {
    handleShowData();
    setModalVisible(false);
  };

  const handleModal = () => {
    setModalVisible(true);
  };

  const handleValueChange = useCallback(
    _.debounce((value) => {
      setButtonEnable(true);
      setProgress(value);
    }, 300), // Adjust the delay as needed
    []
  );

  const handleReps = useCallback(
    _.debounce((value) => {
      setButtonEnable(true);
      setRepsProgress(value);
    }, 300), // Adjust the delay as needed
    []
  );

  const handleContainer = () => {
    setVisible(false);
  };

  const handleRatingChange = (rating) => {
    setRating(rating);
  };
  const handleMemoChange = (notes) => {
    setMemo(notes);
  };

  const handleShowData = async () => {
    const dataToShow = numSetsArray[selectedItemIndex]?.map(
      (set, setIndex) => ({
        weight: set.progress,
        reps: set.repsProgress,
        files: {
          images: set.dataForListImage || [],
          videos: set.dataForListVideos || [],
        },
      })
    );
    const feedback = {
      rating: rate,
      notes: notes,
      ...(notes !== id?.workoutLogFeedback?.notes && { isEdit: true }),
    };

    try {
      const response = await trainerWorkoutUpdateApi(
        ID,
        exerciseId,
        dataToShow,
        feedback,
        formattedDate
      );

      console.log(response.data);

      navigation.navigate(NavigationStrings.WORKOUT_MEMBER_DETAIL);
    } catch (error) {
      console.log(JSON.stringify(error.response.data));
    }
  };

  const ContainerList = ({ index }) => {
    const sets = id?.workoutLog || [];
    return (
      <View style={{ marginTop: 20, marginBottom: 0 }}>
        <WorkoutListEditComponent
          workoutData={workoutData}
          handleEditButtonClick={handleEditButtonClick}
          handleDeleteItem={handleDeleteItem}
        />
      </View>
    );
  };

  const Container = ({ index }) => (
    <WriteLogEditContainer
      progress={progress}
      repsProgress={repsProgress}
      handleValueChange={handleValueChange}
      handleReps={handleReps}
      // handleAddSet={handleAddSet}
      onUpdate={(updatedData) => handleUpdateWorkoutData(updatedData)}
      onCrossButtonPress={handleContainer}
    />
  );

  const Button = () => (
    <View style={styles.buttonView}>
      {!buttonEnable ? (
        <PrimaryButton
          title={"Save"}
          onPress={handleModal}
          color={true}
          style={90}
        />
      ) : (
        <PrimaryButton
          title={"Save"}
          onPress={handleModal}
          color={false}
          style={90}
        />
      )}
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginBottom: scale(80) }}>
            {visible ? (
              <Container index={selectedItemIndex} />
            ) : (
              <ContainerList index={selectedItemIndex} />
            )}
            {!visible && <Button />}
            <Spinner
              visible={loading}
              textContent={"Loading..."}
              textStyle={{ color: "#FFF" }}
            />
            <FeedBackModal
              visible={modalVisible}
              setModalVisible={(val) => setModalVisible(val)}
              imageUrl={images.success}
              text={"How was the workout?"}
              navigation={navigation}
              onRatingChange={(val) => handleRatingChange(val)}
              onMemoChange={(val) => handleMemoChange(val)}
              onConfirm={handleConfirm}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default WriteLogEdit;
