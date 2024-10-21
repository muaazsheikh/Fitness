import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Style";

const Checkbox = ({ label, isChecked, onToggle,disabled=false }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer} disabled={disabled}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && (
          <Text style={styles.checkIcon}>{"\u2713"}</Text> // Unicode checkmark
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;