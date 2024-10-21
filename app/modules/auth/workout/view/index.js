import React from "react";
import { View } from "react-native";

import WorkoutScreen from "./WorkoutScreen";

import styles from "./Style";

const WorkoutContainer = () => {
  return (
    <View style={styles.container}>
      <WorkoutScreen />
    </View>
  );
};

export default WorkoutContainer;
