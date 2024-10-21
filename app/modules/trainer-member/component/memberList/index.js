import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { COLORS, icons, images } from "../../../workout/constant";
import { FONTS } from "../../../home/constant";
import { CONTEXT } from "../../../home/constant/theme";
import { scale } from "react-native-size-matters";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Circle } from "react-native-svg";
import { NavigationStrings } from "../../../../constants";
import CircularProgress from "../progress/CircularProgress";

const MAX_DISPLAY_LENGTH = 40;

const MemberList = ({
  imageUrl,
  text,
  type,
  onPress,
  navigation,
  name,
  rating,
  sessionCount,
  sessionCompleted,
  recentSession,
  noShowCount,
  extras,
  lastExercise,
  lastExercises,
  notes,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [localSelected, setLocalSelected] = useState(isSelected);
  const [showFullContent, setShowFullContent] = useState(false);

  const displayContent = showFullContent
    ? notes
    : notes?.slice(0, MAX_DISPLAY_LENGTH) + "...";

  const handleReadMore = () => {
    setShowFullContent(!showFullContent);
  };

  const handlePress = () => {
    // setLocalSelected(!localSelected);
    // onPress(text, !localSelected);
    navigation.navigate(NavigationStrings.MEMBER_DETAIL);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.containerHeader}>
        <View style={styles.row}>
          <FastImage source={imageUrl} style={styles.img} />
          <Text style={styles.textUser}>{name}</Text>
          <View style={styles.ratingView}>
            <Text style={styles.ratingText}>Rating</Text>
            <FastImage source={icons.review} style={styles.starImg} />
            <Text style={styles.numberText}>{rating}</Text>
          </View>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={[styles.userHeaderList]}>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={[styles.requestTextView, { width: 70 }]}>
              <Image source={icons.Session_icon} style={[styles.smallIcon]} />
              <CircularProgress
                value={sessionCompleted || 0}
                maxValue={sessionCount || 0}
              />
            </View>
            <Text style={[styles.largeTextStyle]}>Session</Text>
          </View>

          <View style={styles.verticalLine} />

          <View>
            <View style={[styles.requestTextView]}>
              <Image source={images.ClockIcon} style={[styles.smallIcon]} />
              <Text style={[styles.smallTextStyle, { marginLeft: scale(6) }]}>
                {noShowCount}
              </Text>
            </View>
            <Text style={[styles.largeTextStyle, { marginLeft: scale(6) }]}>
              No-Shows
            </Text>
          </View>

          <View style={styles.verticalLine} />

          <View>
            <View style={[styles.requestTextView]}>
              <View style={styles.extraView}>
                <Image
                  source={icons.plus_icon}
                  style={[styles.smallPlusIcon]}
                />
              </View>
              <Text style={[styles.smallTextStyle, { marginLeft: scale(6) }]}>
                {extras}
              </Text>
            </View>
            <Text style={[styles.largeTextStyle, { marginLeft: scale(6) }]}>
              Extras
            </Text>
          </View>

          <View style={styles.verticalLine} />

          <View>
            <View style={[styles.requestTextView]}>
              <FastImage source={images.refresh} style={[styles.sessionIcon]} />
              <Text style={[styles.smallTextStyle, { marginLeft: scale(6) }]}>
                {recentSession}
                {/* <Text style={{ fontSize: 12 }}>(D+11)</Text> */}
              </Text>
            </View>
            <Text style={[styles.largeTextStyle, { marginLeft: scale(6) }]}>
              Recent Session
            </Text>
          </View>
        </View>

        {lastExercise && lastExercises && (
          <>
            <View style={styles.horizontalLine} />
            <View style={styles.execerView}>
              <Text style={styles.exerciseText}>Last Exercises:</Text>
              <FastImage source={icons.shoulder} style={styles.legImg} />
              <Text numberOfLines={1} style={styles.shoulderText}>
                {lastExercise}
              </Text>
              <FastImage source={icons.leg} style={styles.legImg} />
              <Text numberOfLines={1} style={styles.bodyText}>
                {lastExercises}
              </Text>
            </View>
          </>
        )}

        <View style={styles.horizontalLine}></View>

        {notes && (
          <View style={styles.row}>
            <FastImage source={icons.noteIcon} style={styles.noteImg} />

            <Text
              style={[
                styles.nutrientText,
                { flexDirection: "row", alignSelf: "flex-start", marginTop: 5 },
              ]}
            >
              {displayContent}
              {notes.length > MAX_DISPLAY_LENGTH && (
                <TouchableOpacity
                  style={{ justifyContent: "flex-end" }}
                  onPress={handleReadMore}
                >
                  <Text style={{ color: COLORS.themGreen }}>
                    {showFullContent ? "less" : "more"}
                  </Text>
                </TouchableOpacity>
              )}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MemberList;
