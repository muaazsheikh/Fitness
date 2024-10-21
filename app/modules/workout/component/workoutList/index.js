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

const WorkoutListComponent = ({
  progress,
  reps,
  dataForListVideos,
  dataForListImage,
  index
}) => {
  const [showList, setShowList] = useState(false);

  const listShow = () => {
    setShowList(!showList);
  };

  return (
    <View style={styles.mainConatiner}>
      <View style={styles.container}>
        <View style={styles.setTextView}>
          <Text style={styles.setText}>{index + 1}</Text>
          <Text style={styles.setSmallText}>Set</Text>
        </View>
        <View style={styles.kgView}>
          <Text style={styles.kgText}>{progress}</Text>
          <Text style={styles.kgSmallText}>{CONTEXT.kg}</Text>
        </View>
        <View style={styles.verticalLine} />

        <View style={styles.kgView}>
          <Text style={styles.kgText}>{reps}</Text>
          <Text style={styles.kgSmallText}>{CONTEXT.reps}</Text>
        </View>

        {dataForListVideos.length > 0 && (
          <View style={[styles.item, styles.imageContainer]}>
            <ImageBackground
              source={images.video_placeholder}
              style={styles.image}
            >
              <TouchableOpacity style={styles.ImageView}>
                <Text style={styles.countText}>
                  {dataForListVideos[0].length}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}

        {dataForListImage.length > 0 && (
          <View style={[styles.item, styles.imageContainer]}>
            <ImageBackground
              source={images.image_placeholder}
              style={styles.image}
            >
              <TouchableOpacity style={styles.ImageView}>
                <Text style={styles.countText}>
                  {dataForListImage[0]?.length}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}

        <TouchableOpacity
          style={[styles.touchableContainer]}
          onPress={() => listShow()}
        >
          <FastImage
            source={showList ? icons.down_white_icon : icons.right_arrow}
            style={showList ? styles.arrowDowIcon : styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      {showList && (
        <View style={styles.listConatiner}>
          <View style={{ position: "relative" }}>
            {dataForListVideos.length > 0 && (
              <ExerciseMediaList
                headerText={"Videos"}
                data={dataForListVideos}
              />
            )}
            {dataForListImage.length > 0 && (
              <ExerciseMediaList
                headerText={"Images"}
                data={dataForListImage}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default WorkoutListComponent;
