import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import FastImage from "react-native-fast-image";
import { icons } from "../../../../workout/constant";
import styles from "./Style";
import { COLORS } from "../../../../home/constant";
import { PrimaryButton } from "../../../../../components";
import { NavigationStrings } from "../../../../../constants";

const RatingContainer = ({
  navigation,
  proteinRating,
  setProteinRating,
  carbRating,
  setCarbRating,
  fatRating,
  setFatRating,
  fiberRating,
  setFiberRating,
  notes,
  setNotes,
}) => {
  const maxRating = [1, 2, 3, 4, 5];

  const renderNutrientRow = (icon, nutrientText, rating, setRating) => (
    <View style={styles.ratingRow}>
      <View style={styles.nutrientInfo}>
        <FastImage source={icon} style={styles.nutrientIcon} />
        <Text style={styles.nutrientText}>{nutrientText}</Text>
      </View>
      <View style={styles.starContainer}>
        {maxRating.map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.star}
            onPress={() => setRating(item)}
          >
            <FastImage
              style={styles.star}
              source={item <= rating ? icons.review : icons.review_place}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textHeader}>The member will wait for your proffesional feedback</Text>
        <Text style={styles.textSubheader}>
          Trainer will respond to your ratings once shared
        </Text>

        {renderNutrientRow(
          icons.protien_icon,
          "Protein",
          proteinRating,
          setProteinRating
        )}
        {renderNutrientRow(icons.carb_icon, "Carb", carbRating, setCarbRating)}
        {renderNutrientRow(icons.fat_icon, "Fat", fatRating, setFatRating)}
        {renderNutrientRow(
          icons.fiber_icon,
          "Fiber",
          fiberRating,
          setFiberRating
        )}

        <View style={styles.textContainer}>
          <FastImage style={styles.edit_icon} source={icons.noteIcon} />
          <TextInput
            style={styles.textStyle}
            multiline={true}
            placeholder="Add notes"
            cursorColor={COLORS.themGreen}
            placeholderTextColor={COLORS.placeholderColor}
            value={notes}
            onChangeText={(text) => setNotes(text)}
            autoFocus={true}
          />
        </View>
      </View>
    </View>
  );
};

export default RatingContainer;
