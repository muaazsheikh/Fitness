// CustomSeekBar.js

import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import styles from "./Style";
import Spinner from "react-native-loading-spinner-overlay";
import { PrimaryButton } from "../../../../../components";
import { COLORS, images } from "../../../../home/constant";
import { icons } from "../../../../workout-member/constant";
import ViewModal from "../../../../workout/component/modal/view/ViewModal";

const MAX_DISPLAY_LENGTH = 120;
const DietListUpdate = ({
  dietLogDate,
  meal,
  sharedToTrainer,
  contentNote,
  navigation,
  id,
  imgUrl,
  type,
  progress,
  trainer,
  memberName = "",
  trainerName = "",
  data,
  onChange,
}) => {
  // const { memberLogs, memberNotes, trainerLogs, trainerNotes } = data;

  const [showFullContent, setShowFullContent] = useState(false);
  const [defaultRating, setDefaultRating] = React.useState(2);
  const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);
  const [modalView, setModalView] = useState(false);
  const [proteinRating, setProteinRating] = React.useState(1);
  const [carbRating, setCarbRating] = React.useState(1);
  const [fatRating, setFatRating] = React.useState(1);
  const [fiberRating, setFiberRating] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [notes, setNotes] = React.useState("");
  const [trainerNotes, setTrainerNotes] = React.useState("");
  const [trainerNameNotes, setTrainerNotesName] = React.useState("");
  const [dietLogs, setDietLogs] = React.useState([]);

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

  const handleReadMore = () => {
    setShowFullContent(!showFullContent);
  };

  const handleView = (trainer) => {
    if (trainer) {
      setTrainerNotes(data?.dietLogs?.trainerNotes);
      setTrainerNotesName(trainerName);
      setModalView(true);
    } else {
      setTrainerNotes(data?.dietLogs?.memberNotes);
      setModalView(true);
      setTrainerNotesName(memberName);
    }
  };

  const shareMember = async (id) => {
    setLoading(true);
    try {
      const response = await shareMemberApi(notes, dietLogs, id);
      onChange();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(JSON.stringify(error));
    }
  };

  const ViewContainer = () => (
    <ViewModal
      modalView={modalView}
      setModalView={setModalView}
      trainerNotes={trainerNotes}
      name={trainerNameNotes}
      // selectedState={selectedState}
    />
  );

  const nutrientIcons = {
    Protein: icons.protien_icon,
    Carb: icons.carb_icon,
    Fat: icons.fat_icon,
    Fiber: icons.fiber_icon,
    // Add other nutrients and their corresponding icons here
  };

  const TrainerContainer = () => (
    <View style={{ flex: 1 }}>
      <View style={styles.trainerContainer}>
        <View style={styles.row}>
          <FastImage source={images.User} style={[styles.userIcon]} />
          <Text numberOfLines={1} style={styles.userText}>
            {memberName}
          </Text>
        </View>

        <View style={styles.row}>
          <FastImage source={images.User} style={[styles.userIcon]} />
          <Text style={styles.userText}>{trainerName}</Text>
        </View>
      </View>
      <View style={styles.horizontalLine}></View>

      {data?.dietLogs?.memberLogs.map((memberLog, index) => (
        <View key={index} style={styles.trainerDiet}>
          {/* Display member rating */}
          <View style={styles.gap}>
            <FastImage source={icons.white_star} style={styles.starIcon} />
            <Text style={styles.reviewText}>{memberLog?.rating}</Text>
          </View>
          {/* Display nutrient */}
          <View style={[styles.gap, { width: 100 }]}>
            <FastImage
              source={nutrientIcons[memberLog?.nutrient] || icons.protien_icon}
              style={[styles.nutrientIconLarge]}
            />
            <Text style={[styles.nutrientText, { fontSize: 18 }]}>
              {memberLog?.nutrient}
            </Text>
          </View>
          {/* Display trainer rating */}
          <View style={[styles.gap, { marginRight: 10 }]}>
            {/* Assuming trainerLogs contains ratings for the same nutrients */}
            <FastImage source={icons.white_star} style={styles.starIcon} />
            {/* Use the index to access the corresponding trainerLog */}
            <Text style={styles.reviewText}>
              {data?.dietLogs?.trainerLogs?.[index]?.rating ?? "N/A"}
            </Text>
          </View>
        </View>
      ))}
      <View
        style={[
          styles.row,
          {
            marginTop: 20,
            justifyContent: "space-between",
            paddingHorizontal: 10,
          },
        ]}
      >
        <PrimaryButton
          title={"View"}
          style={80}
          edit={true}
          imgUrl={icons.file}
          onPress={() => handleView()}
        />
        <PrimaryButton
          title={"View"}
          style={80}
          edit={true}
          imgUrl={icons.file}
          onPress={() => handleView(true)}
        />
      </View>
    </View>
  );

  const ReviewContainer = () => (
    <>
      <Text style={[styles.userText, { marginTop: 15 }]}>
        {`This is ${memberName} ratings`}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignSelf: "center",
          padding: 15,
          gap: 10,
        }}
      >
        {data?.memberLogs.map((log, index) => {
          const imageStyles = [
            { width: 14, height: 14, alignSelf: "center" },
            { width: 15, height: 8, alignSelf: "center" },
            { width: 14, height: 14, alignSelf: "center" },
            { width: 14, height: 14, alignSelf: "center" },
          ];

          const nutrientStyle = imageStyles[index] || styles.nutrientIcon;
          return (
            <View style={styles.nutrientContainer} key={index}>
              <View style={styles.gap}>
                <FastImage
                  source={icons[log.nutrient.toLowerCase() + "_icon"]}
                  style={nutrientStyle}
                />
                <Text style={styles.nutrientText}>{log.nutrient}</Text>
              </View>
              <View style={styles.gap}>
                <FastImage source={icons.white_star} style={styles.starIcon} />
                <Text style={styles.reviewText}>{log.rating}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <View style={{ padding: 10 }}>
        <Text style={[styles.nutrientText, { flexDirection: "row" }]}>
          {contentNote}
        </Text>
        {contentNote.length > MAX_DISPLAY_LENGTH && (
          <TouchableOpacity
            style={{ justifyContent: "flex-end" }}
            onPress={handleReadMore}
          >
            <Text style={{ color: COLORS.themGreen }}>
              {showFullContent ? "less" : "more"}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.horizontalLine}></View>
      </View>
    </>
  );

  return (
    <View
      style={{
        flex: 1,
        alignSelf: "center",
        padding: 5,
        marginTop: 10,
        backgroundColor: COLORS.gray1,
        width: scale(330),
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-start",
          padding: 5,
          marginLeft: 15,
          width: scale(330),
        }}
      >
        <FastImage source={images.User} style={[styles.userIcon]} />
        <Text numberOfLines={1} style={[styles.userText, { width: 80 }]}>
          {memberName}
        </Text>
        <View style={styles.headerClick}>
          <FastImage source={images.calendar_color} style={styles.smallIcon} />
          <Text style={styles.textCalendar}>{dietLogDate}</Text>
        </View>
        <View>
          <View
            style={[styles.headerClick, { width: scale(70), marginLeft: 10 }]}
          >
            <FastImage
              source={images.breakfast_color}
              style={styles.breakIcon}
            />
            <Text style={styles.trainerText}>{meal}</Text>
          </View>
        </View>
        {progress && (
          <View style={styles.trainerView}>
            <Text style={[styles.trainerText]}>Shared</Text>

            <TouchableOpacity
              // onPress={() => handleSharePress()}
              style={styles.shareView}
            >
              <FastImage source={images.share_color} style={styles.shareIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {imgUrl ? (
        <FastImage source={{ uri: imgUrl }} style={styles.dietImg} />
      ) : (
        <FastImage source={images.no_image} style={styles.dietImg} />
      )}

      {trainer && TrainerContainer()}
      {/* Review things */}
      {!trainer && (
        <View>
          {/* {ReviewContainer()} */}
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </View>
      )}
      {ViewContainer()}
    </View>
  );
};

export default DietListUpdate;
