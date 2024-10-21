import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { COLORS, FONTS, icons, images } from "../../constant";
import styles from "./Style";
import LogCreated from "../log-created";
import { NavigationStrings } from "../../../../constants";

const Card = ({ item, navigation, color }) => {
  const [showList, setShowList] = useState(false);

  const listShow = () => {
    setShowList(!showList);
  };

  function capitalizeFirstLetter(string) {
    return [...string][0].toUpperCase() + [...string].slice(1).join("");
  }
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(NavigationStrings.WORKOUT_MEMBER_DETAIL, {
          id: item?.workoutLogSummary?.id,
          createdBy: item?.workoutLogSummary?.createdBy,
          color: color,
        });
      }}
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
            sessionCount={item?.sessionDetails?.completedSessions}
            rating={item?.workoutLogSummary?.avgRating}
            sessionPending={item?.sessionDetails?.totalSession}
          />
        </View>
        <View style={styles.horizontalLine} />

        <View>
          <Text style={[styles.exerciseText, { color: color }]}>Exercise</Text>
          <Text style={styles.totalText}>
            Total {item?.workoutLogSummary?.totalExercises} Exercises,{" "}
            {item?.workoutLogSummary?.totalSets} Sets
          </Text>
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
          source={icons.file}
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
    </TouchableOpacity>
  );
};

const PersonalLogComponent = ({ navigation, data, color }) => {
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
              item={item}
              onChange={dataRefresh}
            />
          </View>
        )}
      />
    </View>
  );
};

export default PersonalLogComponent;
