import { useEffect,useState } from "react";
import { View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./Style";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { images } from "../../../home/constant";
const SocialLogin = () => {
  const [result,setResult]=useState('')
  const onAppleButtonPress = async () => {
    // Start the Apple Sign In process
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Handle the response, authenticate the user with your backend, etc.
      console.log(appleAuthRequestResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithKakao = async () => {
    try {
      const token = await login();
      setResult(JSON.stringify(token));
      console.log(result);
    } catch (err) {
      console.error("login err", err);
    }
  };

  return (
    <View style={styles.rowContainer}>
      <TouchableOpacity onPress={() => signInWithKakao()}>
        <FastImage source={images.kakao} style={styles.kakaoImageStyle} />
      </TouchableOpacity>
      <TouchableOpacity>
        <FastImage source={images.naver} style={styles.loginImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onAppleButtonPress()}>
        <FastImage source={images.apple} style={styles.appleImageStyle} />
      </TouchableOpacity>
    </View>
  );
};

export default SocialLogin;
