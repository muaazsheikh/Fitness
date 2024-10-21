import React, { useState } from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";
import CustomSeekBar from "../bar";
import { PrimaryButton } from "../../../../components";
import styles from "./Style";
import { images, icons } from "../../constant";
import FastImage from "react-native-fast-image";
import { CONTEXT } from "../../constant/theme";
import * as ImagePicker from "react-native-image-picker";
import ExerciseMediaList from "../imageList";

const WriteLogEditContainer = ({
  progress,
  repsProgress,
  handleValueChange,
  handleReps,
  handleAddSet,
  onCrossButtonPress,
  onUpdate,
}) => {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const dataForListVideos = [
    { id: 1, imageUri: images.thumbnail },
    { id: 2, imageUri: images.thumbnail },
    { id: 3, imageUri: images.thumbnail },
    // Add more items as needed
  ];

  const dataForListImage = [
    { id: 1, imageUri: images.thumbnail },
    { id: 2, imageUri: images.thumbnail },
    // Add more items as needed
  ];

  const handleUpdate = () => {
    const updatedData = {
      weight: progress,
      reps: repsProgress,
    };
    onUpdate(updatedData);
  };

  const launchCamera = () => {
    const options = {
      title: "Select Photo",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        // Handle the selected image
        console.log("Selected Image:", response.assets[0].uri);
      }
    });
  };
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
          <Text style={styles.setText}>1</Text>
          <Text style={styles.setSmallText}>Set</Text>
        </View>
        <View style={styles.kgView}>
          <Text style={styles.kgText}>{progress}</Text>
          <Text style={styles.kgSmallText}>{CONTEXT.kg}</Text>
        </View>
        <View style={styles.kgView}>
          <Text style={styles.kgText}>{repsProgress}</Text>
          <Text style={styles.kgSmallText}>{CONTEXT.reps}</Text>
        </View>
      </View>
      <CustomSeekBar
        imgUrl={images.dumbbell_icon}
        type={"KG"}
        value={progress}
        onValueChange={handleValueChange}
      />
      <CustomSeekBar
        imgUrl={images.timer_img}
        type={"Reps"}
        value={repsProgress}
        onValueChange={handleReps}
      />

      <View style={styles.buttonView}>
        <PrimaryButton
          title="Cancel"
          style={90}
          onPress={onCrossButtonPress}
          color={"transparent"}
        />
        <PrimaryButton
          title={"Next  >"}
          style={90}
          onPress={handleUpdate}
          color={"transparent"}
        />
      </View>
    </View>
  );
};

export default WriteLogEditContainer;
