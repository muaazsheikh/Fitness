import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import styles from "./Style";
import { SafeAreaView } from "react-native-safe-area-context";
import _ from "lodash";
import { COLORS, CONTEXT } from "../constant/theme";
import WorkoutSetComponent from "../component/setComponent";
import UserHeader from "../component/userHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  memberDetailFailure,
  memberDetailRequest,
  memberDetailSuccess,
} from "../../../redux/memberDetailSlice";
import memberDetailApi from "../../../api/member-workout/memberDetail";
import Spinner from "react-native-loading-spinner-overlay";
import SearchBar from "../../../components/search";
import { useFocusEffect } from "@react-navigation/native";
import Seperator from "../../auth/component/seperator";

const WorkoutLogCompletedDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { id, createdBy, color } = route.params;
  const loading = useSelector((state) => state.memberDetail.loading);

  const [share, setShare] = useState("");
  // To set the max number of Stars
  const [memberData, setMemberData] = useState([]);
  const [trainerData, setTrainerData] = useState([]);

  const handleShare = () => {
    setShare("");
  };
  // alert(createdBy)

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          dispatch(memberDetailRequest());
          const response = await memberDetailApi(id);
          console.log("response", JSON.stringify(response));

          dispatch(memberDetailSuccess(response));
          setMemberData(response?.data?.workoutLogFound);
          setTrainerData(response?.data);
        } catch (error) {
          console.log(JSON.stringify(error));
          dispatch(memberDetailFailure(error.message));
        }
      }
      fetchMyAPI();
      return () => {};
    }, [share]) // Pass an empty dependency array to only run once when the component mounts
  );

  const HeaderList = () => (
    <View style={{ backgroundColor: COLORS.transparent }}>
      <UserHeader
        name={trainerData?.memberDetails?.name}
        rating={trainerData?.avgRating}
        date={trainerData?.workoutTime || null}
        sessionCount={trainerData?.sessionDetails?.sessionCompleted}
        totalSession={trainerData?.sessionDetails?.totalSessions}
        color={color || COLORS.white}
      />
      <ScrollView>{Container()}</ScrollView>
    </View>
  );

  const Container = () => (
    <View style={{ flex: 2, marginBottom: 90, marginTop: 90 }}>
      {memberData ? (
        <WorkoutSetComponent
          navigation={navigation}
          data={memberData}
          onShare={handleShare}
          createdBy={createdBy}
          color={color}
        />
      ) : (
        <Seperator title={"No Data Available"} dimesion={150} />
      )}
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* {Search()} */}
        {HeaderList()}
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      </SafeAreaView>
    </View>
  );
};

export default WorkoutLogCompletedDetail;
