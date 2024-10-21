import React from "react";
import { View } from "react-native";
import { useState } from "react";
import ChatScreen from "./ChatScreen";
import styles from "./Style";

const ChatContainer = ({ navigation }) => {
  const [result, setResult] = useState("");

  return (
    <View style={styles.container}>
      <ChatScreen
        handleKakaoLogin={signInWithKakao}
        handleAppleLogIn={onAppleButtonPress()}
        navigation={navigation}
      />
    </View>
  );
};

export default ChatContainer;
