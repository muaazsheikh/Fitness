import * as React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  ScrollView,
} from "react-native";
import styles from "./Style";
import Seperator from "../../../components/seperator";
import { scale } from "react-native-size-matters";
import { icons, images } from "../constant";
import { CONTEXT } from "../constant/theme";
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
import { workoutDate, workoutTime } from "../../../redux/workoutSlice";
import {
  resetApiCallStatus,
  resetNumSetsArray,
} from "../../../redux/numSetsSlice";
import Spinner from "react-native-loading-spinner-overlay";

const WorkOutTabCreate = ({ navigation }) => {
  const [selectedView, setSelectedView] = React.useState("trainer");
  const loading = useSelector((state) => state.trainerDetail.loading);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalRejected, setModalRejected] = React.useState(false);
  const [selectedState, setSelectedState] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState("");

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
        dispatch(trainerDetailSuccess(response));
      } catch (error) {
        console.log(JSON.stringify(error));
        dispatch(trainerDetailFailure(error.message));
      }
    }
    fetchMyAPI();
  }, []);

  const trainerData = useSelector((state) => state?.trainerDetail?.user?.data);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    dispatch(workoutDate(date));
  };
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    dispatch(workoutTime(time));
  };

  const handleNavigation = (nav) => {
    if (nav === "Edit") {
      dispatch(resetNumSetsArray());
      dispatch(resetApiCallStatus());
      setModalVisible(false);
      setModalRejected(true);
    } else {
      setModalVisible(false);
    }
  };

  function renderNewSeasonSection() {
    return (
      <CustomCalendar
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
        onSelectTime={handleTimeSelect}
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

  const SeperatorContainer = () => (
    <View style={{ justifyContent: "center", alignSelf: "center" }}>
      {selectedView === "trainer" ? (
        <View>
          <Seperator
            title={CONTEXT.workout_available}
            subTitle={CONTEXT.workout_placeholder}
            imageUrl={images.machine_placeholder}
            dimesion={250}
          />
          <PrimaryButton
            imgUrl={icons.notes_edit}
            title={"create"}
            onPress={() =>
              navigation.navigate(NavigationStrings.WORKOUT_COMPLETED_MEMBER)
            }
            // onPress={() => setModalVisible(true)}

            style={90}
          />
        </View>
      ) : (
        <View>
          <Seperator
            title={CONTEXT.diet_placeholder}
            dimesion={150}
            // subTitle={CONTEXT.workout_placeholder}
            imageUrl={images.dish_placeholder}
          />

          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={"Loading..."}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      )}
    </View>
  );
  const WorkoutModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={[styles.modelViewcontainer]}>
        <View style={[styles.confirmModal]}>
          {renderNewSeasonSection()}
          <View style={{ alignSelf: "flex-end", marginLeft: scale(120) }}>
            {Button()}
          </View>
        </View>
      </View>
    </Modal>
  );
  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          {SeperatorContainer()}
          {WorkoutModal()}

          <RejectionModal
            name={trainerData?.trainerDetails.name}
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
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default WorkOutTabCreate;
