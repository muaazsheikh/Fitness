import React from "react";
import { View } from "react-native";
import { useState } from "react";
import TrainerInformation from "./TrainerInformation";
import styles from "./Style";

const TrainerContainer = ({ navigation }) => {
  const [result, setResult] = useState("");

  return (
    <View style={styles.container}>
      <TrainerInformation
        handleKakaoLogin={signInWithKakao}
        handleAppleLogIn={onAppleButtonPress()}
        navigation={navigation}
      />
    </View>
  );
};

export default TrainerContainer;
