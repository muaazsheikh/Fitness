import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WriteLogComponent from "../component/writeLog";
import WriteLogContainer from "../component/exerciseContainer";
import WorkoutListComponent from "../component/workoutList";
import FeedBackModal from "../component/modal";
import { PrimaryButton } from "../../../components";
import { scale } from "react-native-size-matters";
import styles from "./Style";
import { COLORS, FONTS, icons, images } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateNumSetsArray } from "../../../redux/numSetsSlice"; // Import the new action creators
import { NavigationStrings } from "../../../constants";
import Spinner from "react-native-loading-spinner-overlay";
import {
  memberWorkoutCreateFailure,
  memberWorkoutCreateRequest,
  memberWorkoutCreateSuccess,
} from "../../../redux/memberWorkoutCreateSlice";
import memberWorkoutCreateApi from "../../../api/member-workout/memberWorkoutCreate";
import { launchImageLibrary } from "react-native-image-picker";
import uploadImageApi from "../../../api/assets/uploadImage";
import ProgressBar from "react-native-progress/Bar";
import FastImage from "react-native-fast-image";
import SessionModal from "../component/modal/session";
import workoutNoteCreateApi from "../../../api/trainer-workout/trainerWorkoutNoteCreate";
import memberWorkoutSessionCreateApi from "../../../api/member-workout/memberWorkoutSessionCreate";
import FlashMessage from "../../../components/flash";
import _ from "lodash";

const WriteLogExerciseSession = ({ navigation }) => {
  const dispatch = useDispatch();
  const workoutData = useSelector((state) => state?.work?.selectedType);
  const workDate = useSelector((state) => state?.work?.selectedDate);
  const workoutTime = useSelector((state) => state?.work?.selectedTime);
  const memberData = useSelector((state) => state?.memberDetail?.user?.data);
  const numSetsArray = useSelector((state) => state.numSets);
  const sessionID = useSelector((state) => state?.work?.sessionId);
  const memberName = useSelector((state) => state?.work?.memberName);

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [progress, setProgress] = useState(80);
  const [repsProgress, setRepsProgress] = useState(20);
  const [visible, setVisible] = useState(true);
  const [modalUpload, setModalUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalComment, setModalComment] = useState(false);
  const [workoutId, setID] = useState(null);
  const [rate, setRating] = useState(1);
  const [notes, setMemo] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [progressBar, setProgressBar] = React.useState(0);
  const [dataForListImage, setDataForListImage] = React.useState([]);
  const [dataForListVideo, setDataForListVideo] = React.useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [apiCallCount, setApiCallCount] = useState(0);
  const [maximumWeight, setMaximumWeight] = React.useState(150);
  const [maximumReps, setMaximumReps] = React.useState(20);

  useEffect(() => {
    if (apiCallCount >= totalItems) {
      setModalComment(true);
      return;
    }
  }, [apiCallCount]);

  const showMessage = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide the message after 3 seconds
  };
  // const apiCallsStatus = useSelector(state => state.numSets.apiCallsStatus); // Utilize useSelector for apiCallsStatus

  const [apiCallsStatus, setApiCallsStatus] = useState(
    Array(workoutData.length).fill({ success: false })
  );

  const dateString = workDate;
  const parsedDate = moment(dateString, "YYYY-MM-DD hh:mm A");
  const formattedDate = parsedDate.toISOString();
  const totalItems = workoutData.length;

  useEffect(() => {
    // dispatch(updateApiCallStatus(Array(workoutData.length).fill({ success: false })));
    setApiCallsStatus(Array(workoutData.length).fill({ success: false }));
  }, [workoutData]);

  const handleUpdateNumSetsArray = (index, numSets) => {
    setProgress(80);
    setRepsProgress(20);
    setImage([]);
    setVideo([]);
    setDataForListImage([]);
    setDataForListVideo([]);
    setMemo("");
    dispatch(updateNumSetsArray({ index, numSets }));
  };

  const handleModal = () => {
    if (numSetsArray[selectedItemIndex]?.length <= 0) {
      showMessage();
    } else {
      setModalVisible(true);
    }
  };

  const handleConfirm = () => {
    handleShowData();
    setModalVisible(false);
  };

  const handleConfirmComment = async () => {
    try {
      const response = await workoutNoteCreateApi(workoutId, comment);
      navigation.navigate(NavigationStrings.WORKOUT_COMPLETED_MEMBER);
      setModalComment(false);
    } catch (error) {
      // setModalComment(false);
      console.log("error", JSON.stringify(error.response.data));
    }
  };

  const handleValueChange = useCallback(
    _.debounce((value) => {
      setProgress(value);
    }, 300), // Adjust the delay as needed
    []
  );

  const handleReps = useCallback(
    _.debounce((value) => {
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
  const handleComment = (notes) => {
    setComment(notes);
  };

  const handleSelectItem = (index) => {
    setSelectedItemIndex(index);
    setVisible(true);
    setApiCallsStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = { ...newStatus[index], selected: true };
      return newStatus;
    });
  };

  const handleAddSet = () => {
    const newSet = {
      progress: progress,
      repsProgress: repsProgress,
      dataForListVideos: dataForListVideo,
      dataForListImage: dataForListImage,
    };

    const updatedNumSets = [...(numSetsArray[selectedItemIndex] || []), newSet];
    handleUpdateNumSetsArray(selectedItemIndex, updatedNumSets);
  };

  const handleShowData = async () => {
    setLoading(true);
    const Id = workoutData[selectedItemIndex]?.id;
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
    };

    try {
      dispatch(memberWorkoutCreateRequest());

      const response = await memberWorkoutSessionCreateApi(
        workoutId,
        Id,
        dataToShow,
        feedback,
        formattedDate
      );

      setLoading(false);

      dispatch(memberWorkoutCreateSuccess(response));
      setApiCallsStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[selectedItemIndex] = { success: true, selected: true };
        return newStatus;
      });
      setID(response?.data?.id);

      if (selectedItemIndex < totalItems - 1) {
        setVisible(true);
        setSelectedItemIndex((prevIndex) => prevIndex + 1);
      }
      // if (selectedItemIndex >= totalItems - 1) {
      //   setModalComment(true);
      //   // navigation.navigate(NavigationStrings.WORKOUT_COMPLETED);
      //   return;
      // }
      setApiCallCount(apiCallCount + 1);
    } catch (error) {
      setLoading(false);

      dispatch(memberWorkoutCreateFailure(error.message));
    } finally {
      setMemo("");
      setComment("");
    }
  };

  const handleValue = () => {
    let prevProgress = 0;
    const interval = setInterval(() => {
      prevProgress += 0.1;
      setProgressBar(prevProgress >= 1 ? 1 : prevProgress);
      if (prevProgress >= 1) {
        clearInterval(interval);
      }
    }, 500);
  };

  const openPhotoGallery = () => {
    setProgressBar(0);
    try {
      launchImageLibrary(
        {
          mediaType: "mixed", // Set mediaType to "mixed" to allow selection of both photos and videos
          presentationStyle: "pageSheet",
          selectionLimit: 1,
          multiple: true,
        },
        async (res) => {
          handleValue();
          const { assets } = res;

          for (const asset of assets) {
            if (asset?.type.startsWith("image")) {
              // If the asset is an image, handle it as before
              const file = {
                uri: asset?.uri,
                name: asset?.fileName,
                filename: asset?.fileName,
                type: asset?.type,
              };
              setModalUpload(true);
              const formData = new FormData();
              formData.append("file", file);
              const imgResponse = await uploadImageApi(formData);
              if (imgResponse.status) {
                const newImageData = {
                  original: imgResponse?.data?.original,
                  compressed: imgResponse?.data?.compressed,
                };
                const currentImages = dataForListImage[selectedItemIndex] || [];
                const updatedImages = [...currentImages, newImageData];
                const newDataForListImage = [...dataForListImage];
                newDataForListImage[selectedItemIndex] = updatedImages;
                setDataForListImage(newDataForListImage);
                setImage(imgResponse?.data);
              }
            } else if (asset?.type.startsWith("video")) {
              // If the asset is a video, handle it similarly to images
              setModalUpload(true);
              const file = {
                uri: asset?.uri,
                name: asset?.fileName,
                filename: asset?.fileName,
                type: asset?.type,
              };
              const formData = new FormData();
              formData.append("file", file);
              const videoResponse = await uploadImageApi(formData); // Assuming there's a separate upload function for videos
              if (videoResponse.status) {
                const newVideoData = {
                  original: videoResponse?.data?.original,
                  compressed: videoResponse?.data?.compressed,
                };
                const currentVideos = dataForListVideo[selectedItemIndex] || [];
                const updatedVideos = [...currentVideos, newVideoData];
                const newDataForListVideo = [...dataForListVideo];
                newDataForListVideo[selectedItemIndex] = updatedVideos;
                setDataForListVideo(newDataForListVideo);
                setVideo(videoResponse?.data);
                // Handle the response for video upload as needed
              }
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const UploadModal = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalUpload}
      onRequestClose={() => {
        setModalUpload(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalUpload(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => setModalUpload(false)}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>
            <Text style={styles.modalTextUpload}>File upload</Text>

            <View style={styles.smallContainer}>
              <View
                style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.ARCHI_SEMBOLD,
                  }}
                ></Text>
              </View>
              <View style={{ alignSelf: "center", flexDirection: "row" }}>
                <View>
                  <ProgressBar
                    progress={progressBar}
                    color={COLORS.themGreen}
                    width={200}
                  />
                </View>

                <FastImage
                  source={images.RightConfirm}
                  style={[styles.imageHolder, { marginTop: -5, marginLeft: 5 }]}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 1,
                  justifyContent: "space-around",
                  marginTop: -2,
                }}
              ></View>
            </View>
            <View style={{ marginTop: 10 }}>
              <PrimaryButton
                title={"Confirm"}
                onPress={() => {
                  setModalUpload(false);
                }}
                style={90}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const HeaderList = ({ navigation, workoutData }) => {
    const exerciseImageMap = workoutData.reduce((map, exercise) => {
      map[`exercise${exercise.id}`] = exercise.imageUrl; // Use exercise id to create keys
      return map;
    }, {});
    return (
      <View style={styles.headerBodyView}>
        <View style={styles.bodyView}>
          <WriteLogComponent
            numberOfItems={workoutData}
            numSets={numSetsArray[selectedItemIndex]?.length || 0}
            itemSize={workoutData[0]?.itemSize || 0}
            onSelectItem={handleSelectItem}
            apiCallsStatus={apiCallsStatus || null}
            selectedItemIndex={selectedItemIndex}
            exerciseImageMap={exerciseImageMap}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.addTouchable}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerWrite}>
          {workoutData[selectedItemIndex]?.exerciseName}
        </Text>
      </View>
    );
  };

  const ContainerList = ({ index }) => {
    const sets = numSetsArray[index] || [];
    return (
      <View style={{ marginTop: 20, marginBottom: 0 }}>
        {sets.map((set, setIndex) => (
          <WorkoutListComponent
            key={setIndex}
            progress={set.progress}
            reps={set.repsProgress}
            dataForListVideos={set.dataForListVideos}
            dataForListImage={set.dataForListImage}
            index={setIndex}
          />
        ))}
      </View>
    );
  };

  const Container = ({ index }) => {
    const sets = numSetsArray[index] || [];
    return (
      <WriteLogContainer
        progress={progress}
        repsProgress={repsProgress}
        handleValueChange={(val) => handleValueChange(val)}
        handleReps={handleReps}
        handleAddSet={handleAddSet}
        onCrossButtonPress={handleContainer}
        openPhoto={openPhotoGallery}
        dataForListImage={dataForListImage}
        dataForListVideos={dataForListVideo}
        isHide={false}
        sets={sets}
        setMaximumReps={(val) => setMaximumReps(val)}
        setMaximumWeight={(val) => setMaximumWeight(val)}
        maximumReps={maximumReps}
        maximumWeight={maximumWeight}
      />
    );
  };

  const Button = () => (
    <View style={styles.buttonView}>
      <PrimaryButton
        title={"Add Set  +"}
        onPress={() => setVisible(true)}
        style={90}
      />
      {numSetsArray[selectedItemIndex]?.length >= 0 && (
        <PrimaryButton
          title={"Next  >"}
          style={90}
          color={"transparent"}
          onPress={handleModal}
        />
      )}
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {workoutData && (
          <HeaderList navigation={navigation} workoutData={workoutData} />
        )}
        <Text style={styles.exerciseName}>
          {workoutData && workoutData[selectedItemIndex]?.exerciseNameEng}
        </Text>
        <ScrollView>
          <View style={{ marginBottom: scale(80) }}>
            <ContainerList index={selectedItemIndex} />
            {visible && <Container index={selectedItemIndex} />}
            {!visible && <Button />}
            <Spinner
              visible={loading}
              textContent={"Loading..."}
              textStyle={{ color: "#FFF" }}
            />
            <FeedBackModal
              visible={modalVisible}
              setModalVisible={setModalVisible}
              imageUrl={images.success}
              text={"How was the workout?"}
              navigation={navigation}
              onRatingChange={(val) => handleRatingChange(val)}
              exerciseName={
                workoutData && workoutData[selectedItemIndex]?.exerciseNameEng
              }
              onMemoChange={(val) => handleMemoChange(val)}
              onConfirm={handleConfirm}
            />
            <SessionModal
              visible={modalComment}
              setModalVisible={setModalComment}
              imageUrl={images.comment}
              text={`Please add comment for ${memberName} session`}
              navigation={navigation}
              onMemoChange={(val) => handleComment(val)}
              onConfirm={handleConfirmComment}
            />
            {/* {UploadModal()} */}
            {isVisible && (
              <FlashMessage top={true} message={"Please add set"} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default WriteLogExerciseSession;
