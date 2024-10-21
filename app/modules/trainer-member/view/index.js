import React from "react";
import { View } from "react-native";
import { useState } from "react";
import MemberManagement from "./MemberManagement";
import styles from "./Style";

const MemberContainer = ({ navigation }) => {
  const [result, setResult] = useState("");

  return (
    <View style={styles.container}>
      <MemberManagement
        handleKakaoLogin={signInWithKakao}
        handleAppleLogIn={onAppleButtonPress()}
        navigation={navigation}
      />
    </View>
  );
};

export default MemberContainer;
