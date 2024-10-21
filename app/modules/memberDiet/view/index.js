import React from "react";
import { View } from "react-native";
import { useState } from "react";
import DietScreen from "./DietScreen";
import styles from "./Style";

const DietContainer = ({ navigation }) => {
  const [result, setResult] = useState("");

  return (
    <View style={styles.container}>
      <DietScreen
        handleKakaoLogin={signInWithKakao}
        handleAppleLogIn={onAppleButtonPress()}
        navigation={navigation}
      />
    </View>
  );
};

export default DietContainer;
