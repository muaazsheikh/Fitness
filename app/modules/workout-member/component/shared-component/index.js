import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { COLORS, FONTS, icons, images } from "../../constant";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import styles from "./Style";
import { PrimaryButton } from "../../../../components";
import { CONTEXT } from "../../../home/constant/theme";
const data = [
  {
    image: images.body_builder,
    textHeader: "Long Pull down",
    iconReview: icons.review,
    rating: 4.5,
    images: [images.thumbnail, images.thumbnail],
    rows: [
      ["1 ", "10 ", "10 "],
      ["2 ", "10 ", "10 "],
      ["3 ", "10 ", "10 "],
    ],
    textLength:
      "For the next back workout, focus on opening the scapulae more and observe shoulder movements closely.",
  },
  {
    image: images.body_builder,
    textHeader: "Long Pull down",
    iconReview: icons.review,
    rating: 4.5,
    images: [images.thumbnail, images.thumbnail],
    rows: [
      ["1 ", "10 ", "10 "],
      ["2 ", "10 ", "10 "],
      ["3 ", "10 ", "10 "],
    ],
    textLength:
      "For the next back workout, focus on opening the scapulae more and observe shoulder movements closely.",
  },
];

const ButtonContainer = () => (
  <View
    style={{
      flexDirection: "row",
      marginTop: 20,
      marginLeft: 30,
      alignSelf: "flex-end",
    }}
  >
    {false ? (
      <PrimaryButton
        title={"Edit"}
        style={100}
        edit={true}
        color={true}
        imgUrl={icons.edit_white}
        // onPress={() => alert("under development")}
      />
    ) : (
      <PrimaryButton
        title={"Shared"}
        style={100}
        // onPress={() => alert("under development")}
      />
    )}
  </View>
);

const Card = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: COLORS.gray1, marginHorizontal: 10 }}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <FastImage
            source={images.body_builder}
            style={{ width: 38, height: 37, margin: 10 }}
          />
          <View style={{ padding: 16, flexDirection: "row" }}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 18,
                fontFamily: FONTS.ARCHI_SEMBOLD,
              }}
            >
              {item.textHeader}
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "50%",
                alignSelf: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <FastImage
                source={item.iconReview}
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
                {item.rating}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.centerImg}>
          {item.images &&
            item.images.map((image, index) => (
              <FastImage
                key={index}
                source={image}
                style={{ width: scale(155), height: scale(110) }}
              />
            ))}
        </View>

        <View>
          {item.rows &&
            item.rows.map((row, rowIndex) => (
              <View key={rowIndex} style={{ flexDirection: "row" }}>
                {row.map((text, colIndex) => (
                  <View key={colIndex} style={{ flex: 1, padding: 8 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      {colIndex === 0 && (
                        <Text style={styles.setText}>
                          {text}
                          <Text style={styles.smallText}>set</Text>
                        </Text>
                      )}
                      {colIndex === 1 && (
                        <Text style={styles.setText}>
                          {text}
                          <Text style={styles.smallText}>{CONTEXT.kg}</Text>
                        </Text>
                      )}
                      {colIndex === 2 && (
                        <Text style={styles.setText}>
                          {text}
                          <Text style={styles.smallText}>{CONTEXT.reps}</Text>
                        </Text>
                      )}
                      {colIndex === 0 || colIndex === 1 ? (
                        <View style={styles.verticalLine} />
                      ) : null}
                    </View>
                  </View>
                ))}
              </View>
            ))}
        </View>

        <View style={styles.bottomCard}>
          <FastImage source={icons.noteIcon} style={styles.noteImg} />
          <Text style={{ color: COLORS.white, fontSize: 12 }}>
            {item.textLength}
          </Text>
        </View>

        {ButtonContainer()}
      </View>
    </View>
  );
};

const WorkoutSharedComponent = () => {
  return (
    <View style={styles.setList}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 5 }}>
            <Card item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default WorkoutSharedComponent;
