import * as React from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./Style";
import DietHeader from "./component/header";
import { COLORS, FONTS, images } from "../../home/constant";
import FastImage from "react-native-fast-image";
import RatingContainer from "./component/ratingComponent";
import CalendarModal from "./component/modal/CalendarModal";
import { PrimaryButton } from "../../../components";
import { icons } from "../../workout/constant";
import { NavigationStrings } from "../../../constants";
import ProgressBar from "react-native-progress/Bar";
import {
  dietFailure,
  dietRequest,
  dietSuccess,
} from "../../../redux/dietCreateSlice";
import createDietApi from "../../../api/member-diet/createDiet";
import uploadImageApi from "../../../api/assets/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { launchImageLibrary } from "react-native-image-picker";
import FlashMessage from "../../../components/flash";
import { CONTEXT } from "../../home/constant/theme";

const DietCreateScreen = ({ navigation }) => {
  const loading = useSelector((state) => state.dietCreate.loading);

  const [defaultRating, setDefaultRating] = React.useState(1);
  const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);
  const [modalCalender, setModalCalender] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [shareVisible, setShareVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [share, setShare] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [proteinRating, setProteinRating] = React.useState(1);
  const [carbRating, setCarbRating] = React.useState(1);
  const [fatRating, setFatRating] = React.useState(1);
  const [fiberRating, setFiberRating] = React.useState(1);
  const [notes, setNotes] = React.useState("");
  const [dietLogs, setDietLogs] = React.useState([]);
  const [meal, setMeal] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [isVisible, setIsVisible] = React.useState(false);

  const showMessage = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide the message after 3 seconds
  };
  const dispatch = useDispatch();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setModalCalender(false);
  };

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}.${day}`;
  };

  const createDiet = async (
    dietLogDate,
    meal,
    notes,
    dietLogs,
    sharedToTrainer,
    images
  ) => {
    try {
      dispatch(dietRequest());
      const response = await createDietApi(
        dietLogDate,
        meal,
        notes,
        dietLogs,
        sharedToTrainer,
        images
      );
      dispatch(dietSuccess(response));
      navigation.navigate(NavigationStrings.DIET_UPDATE);
    } catch (error) {
      console.log(JSON.stringify(error));
      dispatch(dietFailure(error.message));
    }
  };

  React.useEffect(() => {
    setDietLogs([
      {
        nutrient: "Protien",
        rating: proteinRating,
      },
      {
        nutrient: "Carb",
        rating: carbRating,
      },
      {
        nutrient: "Fat",
        rating: fatRating,
      },
      {
        nutrient: "Fiber",
        rating: fiberRating,
      },
    ]);
  }, [proteinRating, fatRating, fiberRating, carbRating]);

  const handleValue = () => {
    let prevProgress = 0;
    const interval = setInterval(() => {
      prevProgress += 0.1;
      setProgress(prevProgress >= 1 ? 1 : prevProgress);
      if (prevProgress >= 1) {
        setModalVisible(false);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  };

  const handleValueChange = (value) => {
    setMeal(value);
  };

  const openPhotoGallery = () => {
    setProgress(0);
    try {
      launchImageLibrary(
        {
          mediaType: "photo",
          presentationStyle: "pageSheet",
          selectionLimit: 1,
        },
        async (res) => {
          handleValue();
          const { assets } = res;
          console.log(res);
          const file = {
            uri: assets[0]?.uri,
            name: assets[0]?.fileName,
            filename: assets[0]?.fileName,
            type: assets[0]?.type,
          };
          setModalVisible(true);

          const formData = new FormData();
          formData.append("file", file);
          const imgResponse = await uploadImageApi(formData);
          console.log(JSON.stringify(imgResponse));
          if (imgResponse.status) {
            console.log(JSON.stringify(imgResponse));
            setImage(imgResponse.data);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleShareChange = (shareStatus) => {
    setShare(shareStatus);
  };

  const handleNavigation = () => {
    if (!selectedDate) {
      alert("Please select date");
    } else if (!meal) {
      showMessage();
    } else {
      createDiet(selectedDate, meal, notes, dietLogs, share, image);
    }
  };

  const UploadModal = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => setModalVisible(false)}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>
            <Text style={styles.modalTextUpload}>File upload</Text>

            <View style={styles.smallContainer}>
              <View
                style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}
              >
                {/* <FastImage
                  source={images.image_placeholder}
                  style={styles.imageHolder}
                /> */}
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
                    progress={progress}
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
              {progress > 0.9 ? (
                <PrimaryButton
                  title={"Confirm"}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  color={false}
                  style={90}
                />
              ) : (
                <PrimaryButton
                  title={"Confirm"}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  color={true}
                  style={90}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
  const Header = () => (
    <View
      style={{
        flex: 1,
        zIndex: 1,
      }}
    >
      <DietHeader
        onShareChange={handleShareChange}
        visible={true}
        date={formattedDate(selectedDate)}
        onValueChange={handleValueChange}
        onPress={() => setModalCalender(true)}
      />
    </View>
  );

  const ImageContainer = () => (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={{ uri: image ? image.original : null }}
        style={styles.updateImg}
      >
        {!image ? (
          <View style={{ flexDirection: "row", marginTop: 40, gap: 10 }}>
            <Image source={images.dish} style={styles.modelIcon} />
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.ARCHI_BOLD,
                fontSize: 20,
              }}
            >
              {CONTEXT.uploadPhoto}
            </Text>
          </View>
        ) : null}

        {!image ? (
          <TouchableOpacity
            onPress={() => openPhotoGallery()}
            style={styles.uploadView}
          >
            <FastImage source={images.camera} style={styles.upload} />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            openPhotoGallery(), setProgress(0);
          }}
          style={styles.selectButton}
        >
          <Text style={{ fontFamily: FONTS.ARCHI_SEMBOLD }}>
            {CONTEXT.uploadPhoto}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );

  const RateContainer = () => (
    <RatingContainer
      navigation={navigation}
      proteinRating={proteinRating}
      setProteinRating={setProteinRating}
      carbRating={carbRating}
      setCarbRating={setCarbRating}
      fatRating={fatRating}
      setFatRating={setFatRating}
      fiberRating={fiberRating}
      setFiberRating={setFiberRating}
      notes={notes}
      setNotes={setNotes}
    />
  );
  const ModalContainer = () => (
    <CalendarModal
      modalVisible={modalCalender}
      setModalVisible={setModalCalender}
      selectedDate={selectedDate}
      onSelectDate={handleDateSelect}
    />
  );
  const ButtonContainer = () => (
    <View
      style={{
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 30,
        alignSelf: "flex-end",
      }}
    >
      <PrimaryButton
        title={"Back"}
        style={100}
        color={true}
        imgUrl={icons.left_arrow}
        onPress={() => navigation.goBack()}
      />
      <PrimaryButton
        title={"Save"}
        style={100}
        onPress={() => handleNavigation()}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.themeGray }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : -500}
      >
        <ScrollView style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={styles.newAccountContainer}>
              {Header()}
              {ImageContainer()}
              {RateContainer()}
              {ButtonContainer()}
              {ModalContainer()}
              {UploadModal()}
              <Spinner
                visible={loading}
                textContent={"Loading..."}
                textStyle={{ color: "#FFF" }}
              />
              {isVisible && (
                <FlashMessage bottom={true} message={"Please select meal"} />
              )}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DietCreateScreen;
