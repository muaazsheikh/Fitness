import React from "react";
import { View, Text, Image } from "react-native";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import { icons, images } from "../../constant";
import styles from "./Style";
import { CONTEXT } from "../../../home/constant/theme";

const UserHeader = ({ name, rating, date, sessionCount, totalSession }) => {
  const dateObj = new Date(date);

  // Format date as "MM.DD"
  const formatDate = (date) => {
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const day = date.getDate();
    return `${month}.${day}`;
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
      <View>
        <Image source={images.User} style={[styles.userIcon]} />
        <Text style={[styles.userTextStyle]}>{name}</Text>
      </View>

      {rating && (
        <View>
          <Text style={[styles.colorText, { marginLeft: scale(6) }]}>
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
