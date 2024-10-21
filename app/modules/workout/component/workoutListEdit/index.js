import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import FastImage from "react-native-fast-image";
import { COLORS, FONTS, icons, images } from "../../constant";
import { CONTEXT } from "../../constant/theme";
import ExerciseMediaList from "../imageList";
import styles from "./Style";
import { PrimaryButton } from "../../../../components";

const WorkoutListEditComponent = ({
  progress,
  reps,
  dataForListVideos,
  dataForListImage,
  handleEditButtonClick,
  workoutData,
  handleDeleteItem,
}) => {
  const [showList, setShowList] = useState(false);
  const listShow = (index) => {
    setShowList(showList === index ? null : index);
  };

  return (
    <>
      {workoutData?.map((set, index) => (
        <View key={index} style={styles.mainConatiner}>
          <View style={styles.container}>
            <View style={styles.setTextView}>
              <Text style={styles.setText}>{index + 1}</Text>
              <Text style={styles.setSmallText}>Set</Text>
            </View>
            <View style={styles.kgView}>
              <Text style={styles.kgText}>{set.weight}</Text>
              <Text style={styles.kgSmallText}>{CONTEXT.kg}</Text>
            </View>
            <View style={styles.verticalLine} />

            <View style={styles.kgView}>
              <Text style={styles.kgText}>{set.reps}</Text>
              <Text style={styles.kgSmallText}>{CONTEXT.reps}</Text>
            </View>

            {dataForListVideos?.length > 0 && (
              <View style={[styles.item, styles.imageContainer]}>
                <ImageBackground
                  source={images.video_placeholder}
                  style={styles.image}
                >
                  <TouchableOpacity style={styles.ImageView}>
                    <Text style={styles.countText}>
                      {dataForListVideos?.length}
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            )}

            {dataForListImage?.length > 0 && (
              <View style={[styles.item, styles.imageContainer]}>
                <ImageBackground
                  source={images.image_placeholder}
                  style={styles.image}
                >
                  <TouchableOpacity style={styles.ImageView}>
                    <Text style={styles.countText}>
                      {dataForListImage.length}
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            )}

            <TouchableOpacity
              style={[styles.touchableContainer]}
              onPress={() => listShow(index)}
            >
              <FastImage
                source={showList ? icons.down_white_icon : icons.right_arrow}
                style={showList ? styles.arrowDowIcon : styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>

          {showList === index && (
            <View style={styles.listConatiner}>
              <View style={{ position: "relative" }}>
                {set?.files?.videos?.length > 0 && (
                  <ExerciseMediaList
                    headerText={"Videos"}
                    data={dataForListVideos}
                  />
                )}
                {set?.files?.images?.length > 0 && (
                  <ExerciseMediaList
                    headerText={"Images"}
                    data={dataForListImage}
                  />
                )}
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    marginLeft: 30,
                    alignSelf: "flex-end",
                    gap: 20,
                  }}
                >
                  <PrimaryButton
                    title={"Delete"}
                    style={100}
                    edit={true}
                    color={true}
                    onPress={() => handleDeleteItem(index)}
                  />

                  <PrimaryButton
                    title={"Edit"}
                    style={120}
                    edit={true}
                    color={true}
                    onPress={() => handleEditButtonClick(index)}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      ))}
    </>
  );
};

export default WorkoutListEditComponent;
