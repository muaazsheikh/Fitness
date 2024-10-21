import React from "react";
import { View } from "react-native";
import { useState } from "react";
import WorkOutTab from "./WorkOutTab";
import styles from "./Style";

const WorkOutContainer = ({ navigation }) => {
  const [result, setResult] = useState("");

  return (
    <View style={styles.container}>
      <WorkOutTab navigation={navigation} />
    </View>
  );
};

export default WorkOutContainer;
