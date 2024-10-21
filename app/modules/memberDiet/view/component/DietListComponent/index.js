import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import Slider from "react-native-slider";
import { COLORS, FONTS, images } from "../../../../home/constant";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import styles from "./Style";
import { icons } from "../../../../workout/constant";
import { PrimaryButton } from "../../../../../components";
import { NavigationStrings } from "../../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import getDietApi from "../../../../../api/member-diet/getDiet";
import { dietRequest } from "../../../../../redux/dietCreateSlice";
import { dietFailure, dietSuccess } from "../../../../../redux/getDietIdSlice";
import {
  shareDietFailure,
  shareDietRequest,
  shareDietSuccess,
} from "../../../../../redux/shareDietSlice";
import shareDietApi from "../../../../../api/member-diet/shareDiet";
import Spinner from "react-native-loading-spinner-overlay";

const MAX_DISPLAY_LENGTH = 120;

const DietList = ({
  dietLogDate,
  meal,
  sharedToTrainer,
  dietLogs,
  contentNote,
  navigation,
  id,
  onUpdate,
  imgUrl,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.shareDiet.loading);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}.${day}`;
  };

  const handleNavigation = async (shareStatus, id) => {
    if (shareStatus === "Edit") {
      try {
        dispatch(dietRequest());
        const response = await getDietApi(id);
        dispatch(dietSuccess(response));
        console.log("response", response);
        onUpdate("");
      } catch (error) {
        console.log("error", error);
        dispatch(dietFailure(error.message));
      }
      navigation.navigate(NavigationStrings.DIET_CHANGE);
    } else {
      try {
        dispatch(shareDietRequest());
        const response = await shareDietApi(id);
        dispatch(shareDietSuccess(response));
        console.log("response", response);
        onUpdate("");
        navigation.navigate(NavigationStrings.DIET_UPDATE);
      } catch (error) {
        console.log(JSON.stringify(error));
        dispatch(shareDietFailure(error.message));
      }
    }
  };

  const ButtonContainer = () => (
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
        title={"Edit"}
        style={100}
        edit={true}
        color={true}
        imgUrl={icons.edit_white}
        onPress={() => handleNavigation("Edit", id)}
      />
      {
        <PrimaryButton
          title={"Share to trainer"}
          style={130}
          onPress={() => handleNavigation("", id)}
        />
      }
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
          <View style={styles.headerClick}>
            <FastImage
              source={images.calendar_color}
              style={styles.smallIcon}
            />
            <Text style={styles.textCalendar}>
              {formattedDate(dietLogDate)}
            </Text>
          </View>
          <View>
            <View
              onPress={() => setShow(true)}
              style={[
                styles.headerClick,
                { width: scale(110), marginLeft: 10 },
              ]}
            >
              <FastImage
                source={images.breakfast_color}
                style={styles.breakIcon}
              />
              <Text style={styles.trainerText}>{meal}</Text>
            </View>
          </View>
          {sharedToTrainer && (
            <View style={styles.trainerView}>
              <Text style={[styles.trainerText]}>Shared</Text>
              <TouchableOpacity
                // onPress={() => handleSharePress()}
                style={styles.shareView}
              >
                <FastImage
                  source={images.share_color}
                  style={styles.shareIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {imgUrl ? (
          <FastImage
            source={{ uri: imgUrl?.original }}
            style={styles.dietImg}
          />
        ) : (
          <FastImage source={images.diet_img} style={styles.dietImg} />
        )}

        {/* Review things */}
        <View
          style={{
            flexDirection: "row",
            width: scale(325),
            justifyContent: "space-around",
          }}
        >
          {Object.entries(dietLogs?.memberLogs).map(([nutrient, data]) => {
            const imageStyles = [
              {
                width: 15,
                height: 14,
                alignSelf: "center",
                resizeMode: "contain",
              },
              {
                width: 15,
                height: 15,
                alignSelf: "center",
                resizeMode: "contain",
              },
              {
                width: 14,
                height: 14,
                alignSelf: "center",
                resizeMode: "contain",
              },
              {
                width: 14,
                height: 14,
                alignSelf: "center",
                resizeMode: "contain",
              },
            ];

            const nutrientStyle = imageStyles[nutrient] || styles.nutrientIcon;

            return (
              <View style={styles.nutrientContainer} key={nutrient}>
                <View style={styles.gap}>
                  <Image
                    source={icons[data?.nutrient?.toLowerCase() + "_icon"]}
                    style={nutrientStyle}
                  />
                  <Text style={styles.nutrientText}>{data?.nutrient}</Text>
                </View>
                <View style={styles.gap}>
                  <FastImage
                    source={icons.white_star}
                    style={styles.starIcon}
                  />
                  <Text style={styles.reviewText}>{data?.rating}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ padding: 10, alignSelf: "flex-start" }}>
          {contentNote ? (
            <Text
              style={[
                styles.nutrientText,
                { flexDirection: "row", alignSelf: "flex-start" },
              ]}
            >
              {contentNote}
            </Text>
          ) : null}
          {contentNote?.length > MAX_DISPLAY_LENGTH && (
            <TouchableOpacity
              style={{ justifyContent: "flex-end" }}
              onPress={handleReadMore}
            >
              <Text style={{ color: COLORS.themGreen }}>
                {showFullContent ? "less" : "more"}
              </Text>
            </TouchableOpacity>
          )}
          {!sharedToTrainer && ButtonContainer()}
        </View>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      </View>
    </View>
  );
};

export default DietList;
