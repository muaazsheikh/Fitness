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
import { COLORS } from "../../../home/constant";
const ExerciseType = ({ data, onItemClick, type, trainer }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const renderItem = ({ item }) => {
    const isSelected = selectedItem === item.memberName;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedItem(item.memberName), onItemClick(item);
        }}
      >
        <View
          style={[
            styles.horizontalListItem,
            isSelected && type === "list"
              ? styles.selectedListItem
              : isSelected && type
              ? { borderWidth: 1, borderColor: COLORS.themGreen }
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
            <Image source={item.icon} style={styles.itemIcon} />
          ) : null}
          {item.memberName ? (
            <Text
              style={[
                styles.itemText,
                isSelected && type === "list" ? styles.selectedText : null,
              ]}
            >
              {item.memberName}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flexDirection: "row", zIndex: 2 }}>
      <FlatList
        data={[...data]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem({ item })}
        contentContainerStyle={styles.horizontalListContainer}
      />
    </View>
  );
};

export default ExerciseType;
