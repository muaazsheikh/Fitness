import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { COLORS, FONTS, icons, images } from "../../constant";
import styles from "./Style";
import LogCreated from "../log-created";
import { NavigationStrings } from "../../../../constants";
import { PrimaryButton } from "../../../../components";
import Spinner from "react-native-loading-spinner-overlay";
import { CONTEXT } from "../../../home/constant/theme";
import { updateSessionID, workoutDate } from "../../../../redux/workoutSlice";
import { useDispatch } from "react-redux";
import trainerRequestWriteApi from "../../../../api/trainer-workout/trainerRequestWrite";
import {
  resetApiCallStatus,
  resetNumSetsArray,
} from "../../../../redux/numSetsSlice";
import FlashMessage from "../../../../components/flash";
import ConfirmModal from "../modal/ConfirmModal";

const Card = ({ item, navigation, onChange }) => {
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [modalConfirm, setModalConfirm] = useState(false);
  const [selectedState, setSelectedState] = useState(0);

  const dispatch = useDispatch();

  const handleNavigation = async (nav, id) => {
    setLoading(true);
    dispatch(resetNumSetsArray());
    dispatch(resetApiCallStatus());
    dispatch(workoutDate(id?.date));
    dispatch(updateSessionID(id?.sessionId));
    setLoading(true);
    if (nav === "confirm") {
      setLoading(false);
      setModalConfirm(true);
      setSession(id);

      // confirmRequest(id);
    } else {
      navigation.navigate(NavigationStrings.WRITE_WORKOUT_LOG_MEMBER);
      setLoading(false);
    }
    setLoading(false);
  };
  const confirmRequest = async (id) => {
    setModalConfirm(false);
    try {
      const response = await trainerRequestWriteApi(id);
      onChange();
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage(error?.response?.data);
      showMessage();
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
            logs={item?.workoutLogSummary?.sessionStatus}
            navigation={navigation}
            color={COLORS.Lightred}
            sessionCount={item?.sessionDetails?.completedSessions}
            rating={item?.workoutLogSummary?.avgRating}
            sessionPending={item?.sessionDetails?.totalSession}
          />
        </View>

        <Text style={[styles.exerciseText, { color: COLORS.Lightred }]}>
          {CONTEXT.workout_need}
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
          alignSelf: "flex-end",
        }}
      >
        <PrimaryButton
          title={"Create Workout Log"}
          style={120}
          color={true}
          onPress={() => handleNavigation("create", item)}
        />
        <PrimaryButton
          title={"Request write log"}
          style={120}
          onPress={() => handleNavigation("confirm", item)}
        />
      </View>
      <ConfirmModal
        data={session}
        modalVisible={modalConfirm}
        headerText={"Request write log"}
        setModalVisible={() => confirmRequest(session?.sessionId)}
        contentText={"Request write log to Trainer"}
        selectedState={selectedState}
        buttonText={"Send"}
      />
      {isVisible && <FlashMessage message={message} />}
    </View>
  );
};

const UncompleteComponent = ({ navigation, data, onChange }) => {
  const [refresh, SetRefresh] = useState(false);

  const dataRefresh = () => {
    SetRefresh(true);
    onChange();
  };
  return (
    <View style={styles.setList}>
      <FlatList
        data={data}
        extraData={refresh}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 5, justifyContent: "center" }}>
            <Card
              navigation={navigation}
              onChange={() => dataRefresh()}
              item={item}
            />
          </View>
        )}
      />
    </View>
  );
};

export default UncompleteComponent;
