import React from "react";
import { View, Text, Image } from "react-native";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import { icons, images } from "../../constant";
import { COLORS, CONTEXT } from "../../constant/theme";
import styles from "./Style";

const UserHeader = ({
  name,
  rating,
  date,
  sessionCount,
  totalSession,
  color,
}) => {
  const dateObj = new Date(date);

  // Format date as "MM.DD"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}.${month}.${day}`;
  };

  // Format time as "h:mm A"
  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const formattedDate = formatDate(dateObj);
  const formattedTime = formatTime(dateObj);

  return (
    <View style={[rating ? styles.userHeader : styles.userHeaderList]}>
      <View style={{ width: 70 }}>
        <Image source={images.User} style={[styles.userIcon]} />
        <Text numberOfLines={1} style={[styles.userTextStyle]}>
          {name}
        </Text>
      </View>

      {rating && (
        <View>
          <Text
            style={[styles.colorText, { marginLeft: scale(6), color: color }]}
          >
            {rating}
          </Text>
          <View style={[styles.requestTextView]}>
            <Image source={icons.review_place} style={[styles.smallIcon]} />
            <Text style={[styles.smallTextStyle, { marginLeft: scale(3) }]}>
              {CONTEXT.rating}
            </Text>
          </View>
        </View>
      )}

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
        <Text style={[styles.largeTextStyle, { marginLeft: scale(6) }]}>
          {sessionCount}/{totalSession}
        </Text>
        <View style={[styles.requestTextView]}>
          <Image source={icons.Session_icon} style={[styles.sessionIcon]} />
          <Text style={[styles.smallTextStyle, { marginLeft: scale(6) }]}>
            {CONTEXT.session}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserHeader;
