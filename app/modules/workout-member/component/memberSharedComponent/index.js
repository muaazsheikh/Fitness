import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { COLORS, FONTS, icons, images } from "../../constant";
import styles from "./Style";
import LogCreated from "../log-created";
import { NavigationStrings } from "../../../../constants";
import { PrimaryButton } from "../../../../components";
import memberShareTrainerApi from "../../../../api/member-workout/memberShareTrainer";
import FastImage from "react-native-fast-image";
import { CONTEXT } from "../../../home/constant/theme";

const Card = ({ item, navigation, color, onChange }) => {
  const [showList, setShowList] = useState(false);
  const handleNavigation = async (nav, id) => {
    try {
      const response = await memberShareTrainerApi(id);
      console.log(response);
      onChange();
    } catch (error) {
      console.log(JSON.stringify(error.response.data));
    }
  };

  const listShow = () => {
    setShowList(!showList);
  };

  function capitalizeFirstLetter(string) {
    return [...string][0].toUpperCase() + [...string].slice(1).join("");
  }
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(NavigationStrings.WORKOUT_MEMBER_DETAIL, {
          id: item?.workoutLogSummary?.id,
          createdBy: item?.workoutLogSummary?.createdBy,
        })
      }
      style={[styles.card, { borderColor: color }]}
    >
      <View style={styles.cardView}>
        <View>
          <LogCreated
            name={item?.memberDetails?.name}
            date={item?.workoutLogSummary?.workoutDate}
            time={item.time}
            logs={item?.workoutLogSummary?.sessionStatus}
            navigation={navigation}
            color={color}
            // status={item?.workoutLogSummary?.traineeConfirm}
            sessionCount={item?.sessionDetails?.completedSessions}
            rating={item?.workoutLogSummary?.avgRating}
            sessionPending={item?.sessionDetails?.totalSession}
          />
        </View>
        <View style={styles.horizontalLine} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <View>
            <Text style={[styles.exerciseText, { color: color }]}>
              {CONTEXT.exercise}
            </Text>
            <Text style={styles.totalText}>
              {CONTEXT.total} {item?.workoutLogSummary?.totalExercises}{" "}
              {CONTEXT.exercise}s, {item?.workoutLogSummary?.totalSets}{" "}
              {CONTEXT.sets}
            </Text>
          </View>
        </View>

        <View style={styles.horizontalLine} />

        {item.log !== "Pending" ? (
          <View
            style={
              item.log !== "Logs requesting signatures"
                ? { opacity: 1 }
                : { opacity: 0.1 }
            }
          >
            {item?.workoutLogSummary?.exerciseDetails.map((detail, index) => (
              <View key={index}>
                <View style={styles.listView}>
                  <Text style={styles.backText}>• {detail.type}</Text>
                  <TouchableOpacity onPress={() => listShow()}>
                    <Image
                      source={
                        showList ? icons.down_white_icon : icons.right_arrow
                      }
                      style={showList ? styles.arrowDowIcon : styles.arrowIcon}
                    />
                  </TouchableOpacity>
                </View>

                {showList ? (
                  <View>
                    {detail.exerciseList.map((exercise, idx) => (
                      <Text key={idx} style={styles.pullText}>
                        {exercise}
                      </Text>
                    ))}
                  </View>
                ) : null}
                <View style={styles.horizontalLine} />
              </View>
            ))}
          </View>
        ) : (
          <Text style={[styles.exerciseText, { color: COLORS.Lightred }]}>
            Workout log needs to be filled out.
          </Text>
        )}
      </View>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={icons.member_comment}
          style={[styles.imageNotes, { tintColor: color }]}
        />
        <Text style={[styles.memberText, { color: color }]}>
          {`${capitalizeFirstLetter(
            item?.workoutLogSummary?.createdBy
          )} Memo : `}

          <Text style={[styles.backText]}>
            {item?.workoutLogSummary?.notes}
          </Text>
        </Text>
      </View>
      <View style={{ alignSelf: "flex-end" }}>
        {!item?.workoutLogSummary?.sharedToTrainer ? (
          <PrimaryButton
            title={"Share to trainer"}
            style={120}
            color={true}
            onPress={() =>
              handleNavigation("confirm", item?.workoutLogSummary?.id)
            }
          />
        ) : (
          <View style={styles.trainerView}>
            <Text style={[styles.trainerText]}>{CONTEXT.shared}</Text>
            <TouchableOpacity
              // onPress={() => handleSharePress()}
              style={styles.shareView}
            >
              <FastImage source={images.share_color} style={styles.shareIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const MemberSharedComponent = ({ navigation, data, color, onChange }) => {
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
              color={color}
              navigation={navigation}
              onChange={dataRefresh}
              item={item}
            />
          </View>
        )}
      />
    </View>
  );
};

export default MemberSharedComponent;
