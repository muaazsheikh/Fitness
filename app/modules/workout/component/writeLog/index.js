import React, { useEffect, useState } from "react";
import { TouchableOpacity, FlatList, Image } from "react-native";
import { COLORS, images } from "../../constant";
import FastImage from "react-native-fast-image";
import styles from "./Style";
import { useSelector } from "react-redux";

const WriteLogComponent = ({
  numberOfItems,
  itemSize,
  imageUrlGenerator,
  numSets,
  onSelectItem,
  apiCallsStatus,
  selectedItemIndex,
  exerciseImageMap,
}) => {
  const numSetsArray = useSelector((state) => state.numSets);

  const data = numberOfItems.map((exercise, index) => ({
    id: exercise.id, // Use the exercise ID
    imageUrl: exercise.imageUrl, // Use the image URL directly
    exerciseName: exercise.exerciseName, // Include the exercise name if needed
  }));

  const toggleSelection = (index) => {
    onSelectItem(index); // Trigger onSelectItem callback with the selected index
  };

  const renderItem = ({ item, index }) => {
    const isSelectedItemfound =
      (numSetsArray && numSetsArray[index]?.length) || 0;
    const isSelected = selectedItemIndex === index;
    const isApiSuccess = apiCallsStatus && apiCallsStatus[index]?.success;

    const borderColor =
      isSelected || isApiSuccess || isSelectedItemfound
        ? COLORS.themGreen
        : COLORS.gray;
    const opacity = isSelected || isApiSuccess || isSelectedItemfound ? 1 : 0.1;

    const exerciseId = `exercise${item.id}`;
    const imageSource =
      exerciseImageMap[exerciseId] || images.body_builder_gray; // Default gray if no match

    return (
      <TouchableOpacity
        style={[styles.itemContainer, { borderColor: borderColor }]}
        onPress={() => toggleSelection(index)}
      >
        {isApiSuccess && (
          <FastImage source={images.success} style={styles.ImageView} />
        )}
        <Image source={imageSource} style={[styles.image, { opacity }]} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

export default WriteLogComponent;
