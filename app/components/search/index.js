import React from "react";
import { View, Text, TextInput, Image } from "react-native";
import { icons, COLORS } from "../../modules/home/constant";
import styles from "./Style";

const SearchBar = ({ handleInputChange, title, placeHolder }) => {
  return (
    <View style={styles.traineView}>
      {title && <Text style={styles.searchHeading}>{title}</Text>}
      <View style={styles.searchView}>
        <Image source={icons.searchwhiteicon} style={styles.imageSmall} />
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor={COLORS.lightWhite}
          keyboardType="default"
          style={styles.renderTextInput}
          onChangeText={handleInputChange}
        />
      </View>
    </View>
  );
};

export default SearchBar;
