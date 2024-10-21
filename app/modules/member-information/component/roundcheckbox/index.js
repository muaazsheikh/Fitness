import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { icons } from "../../../home/constant";

const RoundCheckbox = ({ isChecked, onToggle, labelinfo }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
       <FastImage
          source={isChecked ? icons.RadioOn : icons.RadioOff}
          style={{ width: 15, height: 15 }}
        />
      {labelinfo && <Text style={styles.label}>{labelinfo}</Text>}
    </TouchableOpacity>
  );
};

export default RoundCheckbox;
