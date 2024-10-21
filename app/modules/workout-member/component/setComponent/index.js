import React, { useRef, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { COLORS, FONTS, icons, images } from "../../constant";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import styles from "./Style";
import { PrimaryButton } from "../../../../components";

import { useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { NavigationStrings } from "../../../../constants";
import trainerWorkoutDeleteApi from "../../../../api/trainer-workout/trainerWorkoutDelete";
import Video from "react-native-video";
import PagerView from "react-native-pager-view";
import { CONTEXT } from "../../../home/constant/theme";
import Swiper from "react-native-swiper";
import ConfirmModal from "../modal/ConfirmModal";

const Card = ({ item, onShare, navigation, createdBy }) => {
  const loading = useSelector((state) => state.memberToShare.loading);
  const [loader, setLoader] = useState(false);
  const [current, setCurrent] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [modalConfirm, setModalConfirm] = useState(false);

  const refPagerView = useRef();

  const deleteTrainer = async (id) => {
    setLoader(true);
    try {
      const response = await trainerWorkoutDeleteApi(id);
      console.log("response", JSON.stringify(response));
      setLoader(false);
      setModalConfirm(true);
      setTimeout(() => {
        setModalConfirm(false);
        navigation.goBack();
      }, 2000);
    } catch (error) {
      setLoader(false);

      console.log(JSON.stringify(error.response.data));
    }
  };

  const editTrainer = async (id) => {
    navigation.navigate(NavigationStrings.WORKOUT_EDIT, id);
  };
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: COLORS.gray1, marginHorizontal: 10 }}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <Image
            source={{ uri: item?.exerciseDetails?.exerciseImg }}
            style={{ width: 38, height: 37, margin: 10, resizeMode: "contain" }}
          />
          <View style={{ padding: 16, flexDirection: "row" }}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 18,
                fontFamily: FONTS.ARCHI_SEMBOLD,
                width: "80%",
              }}
            >
              {item?.exerciseDetails?.exerciseNameEng}
            </Text>
            <View
              style={{
                flexDirection: "row",
                // width: "50%",
                alignSelf: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <FastImage
                source={icons.review}
                style={{ width: 15, height: 14, alignSelf: "center" }}
              />
              <Text
                style={{
                  color: COLORS.white,
                  alignSelf: "flex-end",
                  fontSize: 20,
                  fontFamily: FONTS.ARCHI_SEMBOLD,
                  marginLeft: 10,
                }}
              >
                {item?.workoutLogFeedback?.rating}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.horizontalLine} />

        {item?.workoutLog?.map((logItem, logIndex) => {
          // Log the structure of logItem files
          console.log(`logItem ${logIndex} files:`, logItem?.files);

          // Flatten and combine images and videos arrays into a single array
          const images = logItem?.files?.images?.flat() || [];
          const videos = logItem?.files?.videos?.flat() || [];
          const media = [
            ...images.map((img, i) => ({
              ...img,
              type: "image",
              id: `img-${logIndex}-${i}`,
            })),
            ...videos.map((vid, i) => ({
              ...vid,
              type: "video",
              id: `vid-${logIndex}-${i}`,
            })),
          ];

          // Log the combined media array
          console.log(`Media for logItem ${logIndex}:`, media);

          // Render a single Swiper component with combined media
          return (
            <Swiper
              key={logIndex}
              index={0}
              activeDotColor={COLORS.themGreen}
              dotColor="#000"
              style={{ height: media.length > 0 ? 300 : 0 }}
              showsPagination={true}
              loop={false}
            >
              {/* Render combined media */}
              {media.map((mediaItem) => {
                if (mediaItem.type === "image") {
                  // Render image
                  return (
                    <View style={styles.slide} key={mediaItem.id}>
                      <FastImage
                        source={{ uri: mediaItem.original }}
                        style={{ height: 280, width: "100%", marginTop: 15 }}
                      />
                    </View>
                  );
                } else if (mediaItem.type === "video") {
                  // Render video
                  return (
                    <View style={styles.slide} key={mediaItem.id}>
                      <Video
                        source={{ uri: mediaItem.original }}
                        style={{ height: 280, width: "100%", marginTop: 15 }}
                        paused={false}
                        repeat={true}
                      />
                    </View>
                  );
                }
                return null;
              })}
            </Swiper>
          );
        })}

        <View>
          {item?.workoutLog &&
            item?.workoutLog.map((logItem, index) => (
              <View key={index} style={{ flexDirection: "row" }}>
                {/* Set */}
                <View style={{ flex: 1, padding: 8 }}>
                  <Text style={styles.setText}>
                    {logItem.set}1<Text style={styles.smallText}> set</Text>
                  </Text>
                </View>
                <View style={styles.verticalLine} />

                {/* Weight */}
                <View style={{ flex: 1, padding: 8 }}>
                  <Text style={styles.setText}>
                    {logItem.weight}
                    <Text style={styles.smallText}>{CONTEXT.kg}</Text>
                  </Text>
                </View>
                <View style={styles.verticalLine} />

                {/* Reps */}
                <View style={{ flex: 1, padding: 8 }}>
                  <Text style={styles.setText}>
                    {logItem.reps}
                    <Text style={styles.smallText}>{CONTEXT.reps}</Text>
                    {logItem.isEdit && (
                      <Text style={styles.editText}>{"(Edited)"}</Text>
                    )}
                  </Text>
                </View>
                {/* Vertical Line */}
              </View>
            ))}
        </View>
        <View style={styles.horizontalLine} />

        <View style={styles.bottomCard}>
          <Image
            source={
              createdBy === "member"
                ? icons.member_comment
                : icons.trainer_comment
            }
            style={styles.noteImg}
          />
          <Text style={{ color: COLORS.white, fontSize: 12 }}>
            {item?.workoutLogFeedback?.notes}
            {item?.workoutLogFeedback?.isEdit && (
              <Text style={styles.editText}>{"(Edited)"}</Text>
            )}
          </Text>
        </View>
        {createdBy === "member" && (
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              marginLeft: 30,
              alignSelf: "flex-end",
              gap: 10,
            }}
          >
            <PrimaryButton
              title={"Delete"}
              style={100}
              edit={true}
              color={true}
              onPress={() => deleteTrainer(item.id)}
            />
            {item?.sharedToTrainer == 0 ? (
              <PrimaryButton
                title={"Edit"}
                style={120}
                edit={true}
                imgStyle={COLORS.black}
                imgUrl={icons.edit_white}
                onPress={() => editTrainer(item)}
              />
            ) : null}

            <Spinner
              visible={loading || loader}
              textContent={"Loading..."}
              textStyle={{ color: "#FFF" }}
            />
          </View>
        )}
      </View>
      <ConfirmModal
        data={null}
        headerText={"Workout log"}
        modalVisible={modalConfirm}
        contentText={"Deleted"}
        // setModalVisible={() => confirmRequest(session?.sessionId)}
        selectedState={null}
      />
    </View>
  );
};

const WorkoutSetComponent = ({ data, onShare, navigation, createdBy }) => {
  return (
    <View style={styles.setList}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 5 }}>
            <Card
              navigation={navigation}
              item={item}
              createdBy={createdBy}
              onShare={onShare}
            />
          </View>
        )}
      />
    </View>
  );
};

export default WorkoutSetComponent;
