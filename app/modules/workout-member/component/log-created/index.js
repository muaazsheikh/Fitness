import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import { COLORS, icons, images } from "../../constant";
import styles from "./Style";
import { NavigationStrings } from "../../../../constants";
import { useNavigation } from "@react-navigation/native";
import { CONTEXT } from "../../../home/constant/theme";

const LogCreated = ({
  name,
  rating,
  date,
  time,
  sessionCount,
  logs,
  sessionPending,
  color,
  status,
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
        <View style={status ? { opacity: 0.1 } : { opacity: 1, width: 60 }}>
          <FastImage source={images.User} style={[styles.userIcon]} />
          <Text numberOfLines={1} style={[styles.userTextStyle]}>
            {name}
          </Text>
        </View>

        {status ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NavigationStrings.WORKOUT_SIGNATURE)
            }
            style={[styles.button, { opacity: 1 }]}
          >
            <Text style={[styles.userTextStyle, { color: color }]}>
              {"Logs requesting signatures"}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, { opacity: 1 }]}>
            <Text style={[styles.userTextStyle, { color: color }]}>
              {logs ? logs : "Pending Logs"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={status ? { opacity: 0.1 } : { opacity: 1 }}>
        <View style={[rating ? styles.userHeaderList : styles.userHeaderList]}>
          <View>
            <Text
              style={[
                styles.colorText,
                { marginLeft: scale(6), color: rating ? color : COLORS.white },
              ]}
            >
              {rating ? rating : 0}
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
              <FastImage
                source={images.CalendarIcon}
                style={[styles.smallIcon]}
              />
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
              <FastImage source={images.ClockIcon} style={[styles.smallIcon]} />
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
              <FastImage
                source={icons.Session_icon}
                style={[styles.sessionIcon]}
              />
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
