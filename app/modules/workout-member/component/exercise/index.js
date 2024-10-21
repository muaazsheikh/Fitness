import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Style";
import { COLORS, icons } from "../../constant";
import DietHeader from "../header";

const ExerciseType = ({
  data,
  onItemClick,
  type,
  trainer,
  date,
  selectedItem,
  onItemMeal,
  color,
  lengthData,
  textColor,
}) => {
  const renderItem = ({ item }) => {
    const isSelected = selectedItem === item.text;

    return (
      <TouchableOpacity
        onPress={() => {
          onItemClick(item);
        }}
      >
        {isSelected && lengthData > 0 && (
          <View style={styles.lengthView}>
            <Text
              style={[styles.itemText, { fontSize: 10, marginHorizontal: 0 }]}
            >
              {lengthData}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.horizontalListItem,
            isSelected
              ? { backgroundColor: color ? color : COLORS.gray }
              : null,
          ]}
        >
          {item.image ? (
            <Image
              source={isSelected ? item.image.star_gray : item.image.star_icon}
              style={styles.itemImage}
            />
          ) : null}
          {item.icon ? (
            <Image
              source={item.icon}
              // tintColor={isSelected ? COLORS.themGreen :COLORS.black }
              style={[
                styles.itemIcon,
                { tintColor: isSelected ? COLORS.black : COLORS.themGreen,resizeMode:'contain' },
              ]}
            />
          ) : null}
          {item.text?.length > 0 ? (
            <Text
              style={[styles.itemText, isSelected ? styles.selectedText : null]}
            >
              {item.text}
            </Text>
          ) : (
            <Text
              style={[styles.itemText, isSelected ? styles.selectedText : null]}
            >
              {item.text}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderDietHeader = () => {
    const handleValueChange = (value) => {
      onItemMeal(value);
    };

    return (
      <View style={{ flex: 1, zIndex: 6, position: "relative" }}>
        {trainer && (
          <DietHeader onValueChange={handleValueChange} visible={true} />
        )}
      </View>
    );
  };

  return (
    <View style={{ flexDirection: "row", zIndex: 5 }}>
      <FlatList
        data={[...data, { text: "Diet Header", isHeader: true }]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          item.isHeader ? renderDietHeader() : renderItem({ item })
        }
        contentContainerStyle={styles.horizontalListContainer}
      />
    </View>
  );
};

export default ExerciseType;
