import React, { useState, useMemo } from "react";
import { View, FlatList } from "react-native";
import styles from "./Style";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseType from "../component/exercise";
import SearchBar from "../../../components/search";
import ExerciseList from "../component/exerciseList";
import { icons, images } from "../constant";
import _ from "lodash";
import { CONTEXT } from "../constant/theme";
import { PrimaryButton } from "../../../components";
import { NavigationStrings } from "../../../constants";

const TrainerDietLog = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchHistory, setSearchHistory] = React.useState([]);

  const dataList = [
    {
      id: "1",
      imageUrl: images.default_img,
      text: "Lat pull down",
      type: "Back",
    },
    {
      id: "2",
      imageUrl: images.default_img,
      text: "Close grip lat pull down",
      type: "Favorites",
    },
    { id: "3", imageUrl: images.default_img, text: "Seated row", type: "Back" },
    {
      id: "4",
      imageUrl: images.default_img,
      text: "Lat pull down",
      type: "Chest",
    },
    {
      id: "5",
      imageUrl: images.default_img,
      text: "Close grip lat pull down",
      type: "Chest",
    },
    {
      id: "6",
      imageUrl: images.default_img,
      text: "Seated row",
      type: "Biceps",
    },
    {
      id: "7",
      imageUrl: images.default_img,
      text: "Lat pull down",
      type: "Legs",
    },
    {
      id: "8",
      imageUrl: images.default_img,
      text: "Close grip lat pull down",
      type: "Legs",
    },
    {
      id: "9",
      imageUrl: images.default_img,
      text: "Seated row",
      type: "Favorites",
    },
  ];
  const data = [
    { text: "Favorites", image: icons, type: "Favorites" },
    { text: "All", type: "All" },
    { text: "Back", type: "Back" },
    { text: "Back", type: "Back" },
    { text: "Biceps", type: "Biceps" },
    { text: "Legs", type: "Legs" },
    { text: "Shoulder", type: "Shoulder" },
    { text: "Triceps", type: "Triceps" },
  ];

  const filteredDataList = useMemo(() => {
    if (selectedType === "All" && !searchQuery) {
      return dataList;
    }

    const filteredByType =
      selectedType !== "All"
        ? dataList.filter((item) => item.type === selectedType)
        : dataList;
    const filteredBySearch = searchQuery
      ? filteredByType.filter((item) =>
          item.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : filteredByType;

    return filteredBySearch;
  }, [dataList, selectedType, searchQuery]);

  const handleItemClick = (item) => {
    setSelectedType(item.type);
  };
  const handleButton = () => {
    if (selectedItems.length > 0) {
      navigation.navigate(NavigationStrings.WRITE_LOG_EXERCISE);
    } else {
      alert("Please select item");
    }
  };

  const handleItemPress = (item) => {
    const index = selectedItems.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );
    if (index === -1) {
      setSelectedItems([...selectedItems, item]);
    } else {
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems.splice(index, 1);
      setSelectedItems(updatedSelectedItems);
    }
  };

  const handleInputChange = _.debounce((text) => {
    setSearchQuery(text);
    setSearchHistory((prevHistory) => [text, ...prevHistory]);
  }, 500);

  const Search = () => (
    <View style={styles.searchView}>
      <SearchBar
        placeHolder={CONTEXT.name}
        handleInputChange={handleInputChange}
      />
    </View>
  );

  const HeaderList = () => (
    <ExerciseType data={data} type={"list"} onItemClick={handleItemClick} />
  );

  const Container = () => (
    <FlatList
      data={filteredDataList}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.horizontalListContainer}
      renderItem={({ item }) => (
        <ExerciseList
          key={item.id}
          imageUrl={item.imageUrl}
          text={item.text}
          type={item.type}
          isSelected={selectedItems.some(
            (selectedItem) => selectedItem.id === item.id
          )}
          onPress={() => handleItemPress(item)}
        />
      )}
      numColumns={1} // Set the number of columns to 1 (single column)
    />
  );
  const selectedItemsLength = selectedItems.length;

  const button = () => (
    <View
      style={{
        position: "absolute",
        bottom: 120,
        zIndex: 1,
        alignSelf: "center",
      }}
    >
      <PrimaryButton
        title={`Add Log ${selectedItemsLength} exercises`}
        style={180}
        onPress={() => handleButton()}
      />
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Search()}
        {HeaderList()}
        {Container()}
        {button()}
      </SafeAreaView>
    </View>
  );
};

export default TrainerDietLog;
