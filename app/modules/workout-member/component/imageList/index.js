import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../constant";
import { scale } from "react-native-size-matters";

const ExerciseMediaList = ({ headerText, data ,onRemove}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{headerText}</Text>
      {data && (
        <FlatList
          horizontal
          data={data[0]}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item,index }) => (
            <View style={styles.itemContainer}>
              {
              <Image source={{ uri: item?.compressed }} style={styles.image} />}
               <TouchableOpacity onPress={() => onRemove(index)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ height: 60 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    marginLeft: 5,
  },
  header: {
    fontSize: 14,
    fontFamily: FONTS.ARCHI_MEDIUM,
    marginBottom: 8,
    alignSelf: "flex-start",
    color: COLORS.lightWhite,
    marginLeft: 10,
    marginTop: 1,
  },
  itemContainer: {
    marginRight: 0,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginLeft: 10,
  },
  mediaItemContainer: {
    position: "relative",
    marginRight: scale(10),
  },
  mediaImage: {
    width: scale(100),
    height: scale(100),
  },
  removeButton: {
    position: "absolute",
    top: scale(0),
    right: scale(0),
    backgroundColor: "red",
    borderRadius: scale(100),
    padding: scale(3),
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize:12
  },
});

export default ExerciseMediaList;
