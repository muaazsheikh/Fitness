import React from "react";
import { View } from "react-native";
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import { login } from "@react-native-seoul/kakao-login";
import styles from "./Style";
import { NavigationStrings } from "../../../../constants";

const LoginContainer = ({ navigation }) => {
  const [result, setResult] = useState("");

  const signInWithKakao = async () => {
    try {
      const token = await login();
      setResult(JSON.stringify(token));
      console.log(result);
    } catch (err) {
      console.error("login err", err);
    }
  };

  const forgot = async () => {
    navigation.navigate(NavigationStrings.FORGOT_SCREEN);
  };
  return (
    <View style={styles.container}>
      <LoginScreen
        handleForgotPassword={forgot}
        handleKakaoLogin={signInWithKakao}
        navigation={navigation}
      />
    </View>
  );
};

export default LoginContainer;
