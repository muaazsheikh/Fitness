import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
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
  dotColor = "red",
}) => {
  const renderItem = ({ item }) => {
    const isSelected = selectedItem === item.type;
    const isCompleted =
      selectedItem === "Incomplete" || selectedItem === "Complete";

    return (
      <TouchableOpacity
        onPress={() => {
          onItemClick(item);
        }}
      >
        {isSelected && lengthData > 0 && (
          <View style={[styles.lengthView, { backgroundColor: dotColor }]}>
            <Text style={styles.listLenghtText}>{lengthData}</Text>
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
              tintColor={isSelected ? "white" : null}
              style={[styles.itemIcon, { tintColor: "white" }]}
            />
          ) : null}
          {item.text?.length > 0 ? (
            textColor ? (
              <Text
                style={[
                  styles.itemText,
                  { color: isSelected ? textColor : COLORS.white },
                ]}
              >
                {item.text}
              </Text>
            ) : (
              <Text
                style={[
                  styles.itemText,
                  isSelected ? styles.selectedText : null,
                ]}
              >
                {item.text}
              </Text>
            )
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
