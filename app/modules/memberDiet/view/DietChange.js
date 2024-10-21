import * as React from "react";

import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Text,
  Modal,
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
import { useDispatch, useSelector } from "react-redux";
import updateDietApi from "../../../api/member-diet/updateDiet";
import {
  dietUpdateFailure,
  dietUpdateRequest,
  dietUpdateSuccess,
} from "../../../redux/dietUpdateSlice";
import { launchImageLibrary } from "react-native-image-picker";
import uploadImageApi from "../../../api/assets/uploadImage";
import ProgressBar from "react-native-progress/Bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CONTEXT } from "../../home/constant/theme";

const DietChange = ({ navigation }) => {
  const userData = useSelector((state) => state.diet.user.data);
  const dispatch = useDispatch();

  const [modalCalender, setModalCalender] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [share, setShare] = React.useState(false);
  const [image, setImage] = React.useState(userData?.images);
  const [proteinRating, setProteinRating] = React.useState(
    userData.dietLogs.memberLogs[0].rating
  );
  const [carbRating, setCarbRating] = React.useState(
    userData.dietLogs.memberLogs[1].rating
  );
  const [fatRating, setFatRating] = React.useState(
    userData.dietLogs.memberLogs[2].rating
  );
  const [fiberRating, setFiberRating] = React.useState(
    userData.dietLogs.memberLogs[3].rating
  );
  const [notes, setNotes] = React.useState(userData?.dietLogs?.memberNotes);
  const [meal, setMeal] = React.useState(userData?.meal);
  const [dietLogs, setDietLogs] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const [selectedDate, setSelectedDate] = React.useState(userData?.dietLogDate);
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
  }, [proteinRating, fatRating, fiberRating, carbRating, notes]);

  const handleValueChange = (value) => {
    setMeal(value);
  };

  const handleShareChange = (shareStatus) => {
    setShare(shareStatus);
  };
  const handleNavigation = (shareStatus) => {
    if (!share) {
      dietUpdate(selectedDate, meal, notes, dietLogs, userData?.id, image);
      navigation.navigate(NavigationStrings.DIET_UPDATE);
    } else {
      dietUpdate(selectedDate, meal, notes, dietLogs, userData?.id, image);
      navigation.navigate(NavigationStrings.DIET_UPDATE);
    }
  };
  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}.${day}`;
  };

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
  };

  const openPhotoGallery = () => {
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
          if (imgResponse.status) {
            setImage(imgResponse.data);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const dietUpdate = async (dietLogDate, meal, notes, dietLogs, id, img) => {
    try {
      dispatch(dietUpdateRequest());
      const response = await updateDietApi(
        dietLogDate,
        meal,
        notes,
        dietLogs,
        id,
        img
      );
      dispatch(dietUpdateSuccess(response));
    } catch (error) {
      dispatch(dietUpdateFailure(error.message));
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setModalCalender(false);
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

                {/* <FastImage
                  source={images.RightConfirm}
                  style={[styles.imageHolder, { marginTop: -5, marginLeft: 5 }]}
                /> */}
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
      <TouchableOpacity
        onPress={() => openPhotoGallery()}
        style={styles.changeButton}
      >
        <Text style={{ fontFamily: FONTS.ARCHI_SEMBOLD }}>
          {CONTEXT.changePhoto}
        </Text>
      </TouchableOpacity>
      {image ? (
        <FastImage
          source={{ uri: image.original }}
          style={[styles.dietImg, { opacity: 0.5 }]}
        />
      ) : (
        <FastImage
          source={images.no_image}
          style={[styles.dietImg, { opacity: 0.5 }]}
        />
      )}
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
        marginRight: 20,
        alignSelf: "flex-end",
        gap: 20,
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
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.newAccountContainer}>
            {Header()}
            {UploadModal()}
            {ImageContainer()}
            {RateContainer()}
            {ButtonContainer()}
            {ModalContainer()}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default DietChange;
