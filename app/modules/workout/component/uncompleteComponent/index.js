import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { COLORS, FONTS, icons, images } from "../../constant";
import styles from "./Style";
import LogCreated from "../log-created";
import { NavigationStrings } from "../../../../constants";
import { PrimaryButton } from "../../../../components";
import trainerWorkoutRequestApi from "../../../../api/trainer-workout/trainerWorkoutRequest";
import trainerWorkoutShowApi from "../../../../api/trainer-workout/trainerWorkoutShow";
import Spinner from "react-native-loading-spinner-overlay";
import { updateSessionID, workoutDate } from "../../../../redux/workoutSlice";
import { useDispatch } from "react-redux";
import {
  resetApiCallStatus,
  resetNumSetsArray,
} from "../../../../redux/numSetsSlice";
import ConfirmModal from "../modal/ConfirmModal";
import FlashMessage from "../../../../components/flash";
import { scale } from "react-native-size-matters";

const Card = ({ item, navigation }) => {
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [selectedState, setSelectedState] = useState(0);
  const [session, setSession] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const dispatch = useDispatch();

  const handleNavigation = async (nav, id) => {
    setLoading(true);
    dispatch(resetNumSetsArray());
    dispatch(resetApiCallStatus());
    dispatch(workoutDate(id?.date));
    dispatch(updateSessionID(id?.sessionId));
    if (nav === "confirm") {
      setSession(id);
      setModalConfirm(true);
    } else if (nav === "no-show") {
      noShow(id);
    } else {
      navigation.navigate(NavigationStrings.WRITE_WORKOUT_LOG);
      setLoading(false);
    }
    setLoading(false);
  };
  const confirmRequest = async (id) => {
    setLoading(true);
    setModalConfirm(false);

    try {
      const response = await trainerWorkoutRequestApi(id);
      console.log(response);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage(error?.response?.data);
      showMessage();
      console.log(JSON.stringify(error.response.data));
    }
  };

  const noShow = async (id) => {
    try {
      const response = await trainerWorkoutShowApi(id);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(JSON.stringify(error));
    }
  };

  return (
    <View
      onPress={() =>
        navigation.navigate(
          NavigationStrings.WORKOUT_MEMBER_DETAIL,
          item?.workoutLogSummary?.id
        )
      }
      style={[styles.card]}
    >
      <View style={styles.cardView}>
        <View>
          <LogCreated
            name={item?.memberDetails?.name}
            date={item?.date}
            time={item.time}
            logs={"Pending"}
            navigation={navigation}
            color={COLORS.Lightred}
            rating={"1" || item?.sessionDetails?.avgRating}
            sessionCount={item?.sessionDetails?.completedSessions}
            sessionPending={item?.sessionDetails?.totalSession}
          />
        </View>

        <Text style={[styles.exerciseText, { color: COLORS.Lightred }]}>
          Workout log needs to be filled out.
        </Text>

        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          gap: 5,
        }}
      >
        {item.status !== "no-show" && (
          <PrimaryButton
            title={"No-Show"}
            style={80}
            edit={true}
            color={true}
            onPress={() => handleNavigation("no-show", item.sessionId)}
          />
        )}

        <PrimaryButton
          title={"Create Workout Log"}
          style={120}
          color={true}
          onPress={() => handleNavigation("create", item)}
        />
        <PrimaryButton
          title={"Request confirm"}
          style={100}
          onPress={() => handleNavigation("confirm", item)}
        />
      </View>
      <ConfirmModal
        data={session}
        modalVisible={modalConfirm}
        setModalVisible={() => confirmRequest(session?.sessionId)}
        selectedState={selectedState}
      />
      {isVisible && <FlashMessage message={message} />}
    </View>
  );
};

const UncompleteComponent = ({ navigation, data }) => {
  return (
    <View style={styles.setList}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 5, justifyContent: "center" }}>
            <Card navigation={navigation} item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default UncompleteComponent;
