import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import Swiper from "react-native-swiper";
import { scale } from "react-native-size-matters";
import { CONTEXT } from "../../../home/constant/theme";
import { COLORS, FONTS, images } from "../../../workout/constant";
import { icons } from "../../../home/constant";

const SwipeImage = ({ text, imageUrl, onPress, data, name }) => {
  const [expandedList, setExpandedList] = useState(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const meridian = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    return `${year}.${month}.${day} ${formattedHours}:${minutes} ${meridian}`;
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "column", padding: 10 }}>
      {/* Parent Comment */}
      <View style={{ flexDirection: "row" }}>
        <Image source={images.user_name} style={styles.userImg} />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 10,
            marginBottom: 10,
          }}
        >
          <Text style={[styles.largeTextStyle, { flexDirection: "row" }]}>
            {item?.gymStaffInfo?.gymStaffName} | {item?.comment}
          </Text>
        </View>
      </View>

      {/* Nested Comments */}
      {item.comments && item.comments.length > 0 && (
        <View style={{ marginLeft: 30 }}>
          {item.comments.map((nestedComment, index) => (
            <View key={index} style={{ marginTop: 5, flexDirection: "row" }}>
              <Image source={images.user_name} style={styles.userImg} />
              <Text
                style={[
                  styles.largeTextStyle,
                  { color: COLORS.lightWhite, marginLeft: 10 },
                ]}
              >
                {nestedComment?.gymStaffInfo?.gymStaffName} |{" "}
                {nestedComment?.comment}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Second Row */}
      <View>
        <Text
          style={[
            styles.largeTextStyle,
            {
              alignSelf: "flex-start",
              marginLeft: 30,
              color: COLORS.lightWhite,
            },
          ]}
        >
          {formatDate(item?.regDate)}
        </Text>
      </View>
    </View>
  );

  const Container = () => (
    <View>
      <FlatList
        data={
          expandedList ? data?.boardComments : data?.boardComments?.slice(0, 5)
        }
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString()}
      />
      {data?.boardComments?.length > 5 && !expandedList && (
        <TouchableOpacity
          onPress={() => setExpandedList(true)}
          style={{ padding: 10 }}
        >
          <Text style={{ color: COLORS.themGreen }}>View More</Text>
        </TouchableOpacity>
      )}
      {expandedList && (
        <TouchableOpacity
          onPress={() => setExpandedList(false)}
          style={{ padding: 10 }}
        >
          <Text style={{ color: COLORS.themGreen }}>Show less</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerUser}>
        <View
          style={[
            styles.row,
            { justifyContent: "space-between", paddingHorizontal: 10 },
          ]}
        >
          <View style={styles.row}>
            <Image
              source={images.user_name}
              style={[styles.informationImage]}
            />
            <Text
              style={[
                styles.largeTextStyle,
                { marginLeft: scale(6), marginTop: 0 },
              ]}
            >
              {data?.gymStaffInfo?.gymStaffName}
            </Text>
            <Image source={icons.star_bach} style={[styles.informationImage]} />
          </View>

          <View style={styles.row}>
            <Image source={icons.eye} style={[styles.informationImage]} />

            <Text style={[styles.largeTextStyle, { marginTop: 0 }]}>
              {data.views}
            </Text>
          </View>
        </View>
        {data?.files && data?.files?.length >= 1 ? (
          <>
            <Swiper
              index={0}
              activeDotColor={COLORS.themGreen}
              dotColor="#000"
              style={{ height: 300 }}
              showsPagination={true}
              loop={false}
            >
              {data?.files &&
                data?.files?.map((item, index) => {
                  return (
                    <View style={styles.slide} key={index.toString()}>
                      <FastImage
                        source={{ uri: item?.url }}
                        style={styles.multipleImagePhoto}
                      />
                    </View>
                  );
                })}
            </Swiper>
          </>
        ) : (
          <View style={styles.slide}>
            <FastImage
              source={images.thumbnail}
              style={styles.mainImage}
              resizeMode="cover"
            />
          </View>
        )}
        <Text
          style={[
            styles.largeTextStyle,
            {
              alignSelf: "flex-start",
              padding: 10,
              fontFamily: FONTS.ARCHI_BOLD,
            },
          ]}
        >
          {data?.title}
        </Text>
        <Text
          style={[
            styles.largeTextStyle,
            { marginTop: 0, alignSelf: "flex-start", padding: 10 },
          ]}
        >
          {data?.content}
        </Text>
      </View>
      {Container()}
    </View>
  );
};

export default SwipeImage;
