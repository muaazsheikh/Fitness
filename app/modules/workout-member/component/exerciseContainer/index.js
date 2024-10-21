import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
} from "react-native";
import CustomSeekBar from "../bar";
import { PrimaryButton } from "../../../../components";
import styles from "./Style";
import { images, icons } from "../../constant";
import FastImage from "react-native-fast-image";
import ExerciseMediaList from "../imageList";
import { CONTEXT } from "../../../home/constant/theme";

const WriteLogContainer = ({
  progress,
  repsProgress,
  handleValueChange,
  handleReps,
  handleAddSet,
  onCrossButtonPress,
  openPhoto,
  dataForListImage,
  isHide,
  dataForListVideos,
  removeImage,
  removeVideo,
  maximumWeight,
  setMaximumWeight,
  maximumReps,
  setMaximumReps,
  sets,
}) => {
  const [reps, setReps] = React.useState(progress);
  const [weight, setWeight] = React.useState(repsProgress);

  return (
    <View style={styles.setContainer}>
      <TouchableOpacity
        onPress={onCrossButtonPress}
        style={styles.crossIconView}
      >
        <FastImage source={icons.CrossButton} style={styles.crossImage} />
      </TouchableOpacity>
      <View style={styles.setView}>
        <View style={styles.setTextView}>
          <Text style={styles.setText}>{sets?.length + 1}</Text>
          <Text style={styles.setSmallText}>Set</Text>
        </View>
        <View style={styles.kgView}>
          <Text style={styles.kgText}>{reps}</Text>
          <Text style={styles.kgSmallText}>{CONTEXT.kg}</Text>
        </View>
        <View style={styles.kgView}>
          <Text style={styles.kgText}>{weight}</Text>
          <Text style={styles.kgSmallText}>{CONTEXT.reps}</Text>
        </View>
      </View>
      <CustomSeekBar
        imgUrl={images.dumbbell_icon}
        type={"KG"}
        value={progress}
        onValueChange={(val) => {
          setReps(val)
          handleValueChange(val);
        }}
        maximumValue={maximumWeight}
        onChangeMaximumValue={(val) => {
          setMaximumWeight(val);
        }}
      />
      <CustomSeekBar
        imgUrl={images.timer_img}
        type={"Reps"}
        value={repsProgress}
        onValueChange={(val) => {
          setWeight(val)
          handleReps(val);
        }}
        maximumValue={maximumReps}
        onChangeMaximumValue={(val) => {
          setMaximumReps(val);
        }}
      />
      <View style={styles.buttonView}>
        <PrimaryButton
          title={"Add Set  +"}
          onPress={() => handleAddSet()}
          style={90}
        />
        <PrimaryButton
          title={"Next  >"}
          style={90}
          onPress={() => {
            onCrossButtonPress(), handleAddSet();
          }}
          color={"transparent"}
        />
      </View>

      {isHide && (
        <TouchableOpacity onPress={() => openPhoto()} style={styles.uploadView}>
          <FastImage source={images.camera} style={styles.upload} />
        </TouchableOpacity>
      )}

      {isHide && (
        <View style={{ alignSelf: "flex-start" }}>
          <View style={{ position: "relative" }}>
            {dataForListVideos?.length > 0 && (
              <ExerciseMediaList
                headerText={"Videos"}
                data={dataForListVideos}
                onRemove={removeVideo}
              />
            )}
            {dataForListImage?.length > 0 && (
              <ExerciseMediaList
                headerText={"Images"}
                data={dataForListImage}
                onRemove={removeImage}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default WriteLogContainer;
