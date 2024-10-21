import React from "react";
import { View } from "react-native";
import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import styles from "./Style";

const WelcomeContainer = ({ navigation }) => {
  const [result, setResult] = useState("");

 
  return (
    <View style={styles.container}>
      <WelcomeScreen
        handleKakaoLogin={signInWithKakao}
        handleAppleLogIn={onAppleButtonPress()}
        navigation={navigation}
      />
    </View>
  );
};

export default WelcomeContainer;
