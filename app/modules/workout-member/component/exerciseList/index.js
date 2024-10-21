import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { COLORS, icons, images } from "../../constant";
import { workoutListCountSaveApi, workoutListCountUnsaveApi } from "../../../../api/member-workout/workoutListCountSave";

const ExerciseList = ({ imageUrl, text, type, onPress, id, isPrefer, refreshData }) => {
  const [isSelected, setIsSelected] = useState(isPrefer);
  const [localSelected, setLocalSelected] = useState(false);

  const handlePress = () => {
    setLocalSelected(!localSelected);
    onPress(text, !localSelected);
  };

  const handleFav = async () => {
    try {
      if (isSelected) {
        const response = await workoutListCountUnsaveApi([id]);
        console.log('Unsave response:', JSON.stringify(response));
      } else {
        const response = await workoutListCountSaveApi([id]);
        console.log('Save response:', JSON.stringify(response));
      }
      setIsSelected(!isSelected);
      refreshData(); // Refresh the data after API call
    } catch (error) {
      console.log('Error', 'Something went wrong', error);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        localSelected ? styles.selectedContainer : null,
      ]}
      onPress={handlePress}
    >
      <ImageBackground source={imageUrl} style={styles.image}>
        <TouchableOpacity
          onPress={handleFav}
          style={styles.smallImg}
        >
          <FastImage
            source={isSelected ? icons.star_icon : icons.star_gray}
            style={styles.ImageView}
          />
        </TouchableOpacity>
      </ImageBackground>
      <Text style={styles.text}>{text}</Text>
      <View
        style={[
          styles.imgView,
          {
            backgroundColor: localSelected
              ? COLORS.themGreen
              : COLORS.themeGray,
          },
        ]}
      >
        {localSelected && (
          <FastImage source={images.check_icon} style={styles.flexedImage} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseList;
