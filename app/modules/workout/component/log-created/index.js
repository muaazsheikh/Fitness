import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import { icons, images } from "../../constant";
import { COLORS, CONTEXT } from "../../constant/theme";
import styles from "./Style";
import { NavigationStrings } from "../../../../constants";
import { useNavigation } from "@react-navigation/native";

const LogCreated = ({
  name,
  rating,
  date,
  time,
  sessionCount,
  logs,
  sessionPending,
  color,
  traineConfirm,
  createdBy,
}) => {
  const navigation = useNavigation();

  // const dateObj = new Date(date);

  // Format date as "MM.DD"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}.${month}.${day}`;
  };

  // Format time as "h:mm A"
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? " pm" : " am";
    // hours = hours % 12;
    // hours = hours ? hours : 12; // Handle midnight (0 hours)

    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  const formattedDate = formatDate(date); // Output: "2.26"
  const formattedTime = formatTime(date);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <View
          style={
            logs !== "Logs requesting signatures"
              ? { opacity: 1, width: 70 }
              : { opacity: 0.2, width: 70 }
          }
        >
          <FastImage source={images.User} style={[styles.userIcon]} />
          <Text numberOfLines={1} style={[styles.userTextStyle]}>
            {name}
          </Text>
        </View>

        {createdBy == "trainer" && (
          <View
            style={
              logs !== "Logs requesting signatures"
                ? { opacity: 1 }
                : { opacity: 0.2 }
            }
          >
            <FastImage
              source={
                traineConfirm ? images.traine_confirm : images.traine_false
              }
              style={[styles.userIcon]}
            />
          </View>
        )}

        {logs === "Pending" ? (
          <View
            onPress={() =>
              navigation.navigate(NavigationStrings.WORKOUT_SIGNATURE)
            }
            style={[styles.button, { opacity: 1 }]}
          >
            <Text style={[styles.userTextStyle, { color: color }]}>{logs}</Text>
          </View>
        ) : (
          <View style={[styles.button, { opacity: 1 }]}>
            <Text style={[styles.userTextStyle, { color: color }]}>{logs}</Text>
          </View>
        )}
      </View>

      <View
        style={
          logs !== "Logs requesting signatures"
            ? { opacity: 1 }
            : { opacity: 0.2 }
        }
      >
        <View style={[rating ? styles.userHeaderList : styles.userHeaderList]}>
          <View>
            <Text
              style={[styles.colorText, { marginLeft: scale(6), color: color }]}
            >
              {rating}
            </Text>
            <View style={[styles.requestTextView]}>
              <FastImage
                source={icons.review_place}
                style={[styles.smallIcon]}
              />
              <Text style={[styles.smallTextStyle, { marginLeft: scale(3) }]}>
                {CONTEXT.rating}
              </Text>
            </View>
          </View>
          <View style={styles.verticalLine} />

          <View style={{ marginLeft: 10 }}>
            <Text style={[styles.largeTextStyle]}>{formattedDate}</Text>
            <View style={[styles.requestTextView]}>
              <Image source={images.CalendarIcon} style={[styles.smallIcon]} />
              <Text style={[styles.smallTextStyle, { marginLeft: scale(6) }]}>
                {CONTEXT.date}
              </Text>
            </View>
          </View>

          <View style={styles.verticalLine} />

          <View>
            <Text style={[styles.largeTextStyle, { marginLeft: scale(6) }]}>
              {formattedTime}
            </Text>
            <View style={[styles.requestTextView]}>
              <Image source={images.ClockIcon} style={[styles.smallIcon]} />
              <Text style={[styles.smallTextStyle, { marginLeft: scale(6) }]}>
                {CONTEXT.time}
              </Text>
            </View>
          </View>

          <View style={styles.verticalLine} />

          <View>
            {sessionCount ? (
              <Text style={[styles.largeTextStyle, { marginLeft: scale(6) }]}>
                {sessionCount}/{sessionPending}
              </Text>
            ) : (
              <Text style={[styles.largeTextStyle, { marginLeft: scale(6) }]}>
                {"0"}
              </Text>
            )}
            <View style={[styles.requestTextView]}>
              <Image source={icons.Session_icon} style={[styles.sessionIcon]} />
              <Text style={[styles.smallTextStyle, { marginLeft: scale(6) }]}>
                {CONTEXT.session}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LogCreated;
