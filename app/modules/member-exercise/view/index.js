import React from "react";
import { View } from "react-native";
import { useState } from "react";
import MemberExercise from "./MemberExercise";
import styles from "./Style";

const MemberContainer = ({ navigation }) => {
  const [result, setResult] = useState("");

  return (
    <View style={styles.container}>
      <MemberExercise
        handleKakaoLogin={signInWithKakao}
        handleAppleLogIn={onAppleButtonPress()}
        navigation={navigation}
      />
    </View>
  );
};

export default MemberContainer;
