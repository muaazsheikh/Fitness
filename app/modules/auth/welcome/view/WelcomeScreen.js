import FastImage from "react-native-fast-image";
import styles from "./Style";
import CustomButton from "../../component/button";
import LogoComp from "../../component/logo";
import Seperator from "../../component/seperator";
import { CONTEXT } from "../../../home/constant/theme";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { images } from "../../../home/constant";
import {
  login,
  // loginWithKakaoAccount,
  getProfile,
  Kakao,
  loginWithKakaoAccount,
} from "@react-native-seoul/kakao-login";
import { verticalScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "../../component/back";
import CustomModal from "../../component/modal";
import { NavigationStrings } from "../../../../constants";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../../../../redux/authSlice";
import { loginApi } from "../../../../api/auth";
import StorageService from "../../../../services/storage";
import Spinner from "react-native-loading-spinner-overlay";
import { COLORS, FONTS } from "../../../workout/constant";
import NaverLogin, {
  NaverLoginResponse,
  GetProfileResponse,
} from "@react-native-seoul/naver-login";
import FlashMessage from "../../../../components/flash";
import { useFocusEffect } from "@react-navigation/native";

const consumerKey = "gu9IjE4jKCl09D8CmNwU";
const consumerSecret = "CBNb08cETH";
const appName = "thejalFitnessApp";
const serviceUrlScheme = "thejalFitness";

const WelcomeScreen = ({
  navigation,
  naverButtonStyle,
  naverButtonTextStyle,
  kakaoButtonStyle,
  kakaoButtonTextStyle,
  enableNaverLogin = true,
  enableKakaoLogin = true,
  enableAppleLogin = true,
  appleButtonStyle,
  appleButtonTextStyle,
  route,
}) => {
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccessResponse] = useState(["successResponse"]);
  const [failure, setFailureResponse] = useState(["failureResponse"]);
  const [getProfileRes, setGetProfileRes] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState(false);

  const showMessage = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide the message after 3 seconds
  };

  useEffect(() => {
    const clear = async () => {
      await NaverLogin.deleteToken();
      await NaverLogin.logout();
    };
    clear();
  }, [message, isVisible]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     async function fetchMyAPI() {
  //       await NaverLogin.deleteToken();
  //       await NaverLogin.logout();
  //     }
  //     fetchMyAPI();
  //     return () => {};
  //   }, [message])
  // );

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const loginbutton = async (email, provider, token) => {
    try {
      dispatch(loginRequest());
      const response = await loginApi(email, provider, token);
      setLoader(false);
      console.log(JSON.stringify(response));
      if (provider == "naver") {
        await NaverLogin.deleteToken();
        await NaverLogin.logout();
      }
      StorageService.setUser(response.data || null);
      dispatch(loginSuccess(response));

      handleModal();
    } catch (error) {
      if (error?.response?.data?.statusCode === 401) {
        setMessage("User not found");
        showMessage();
      }
      if (error?.response?.data?.statusCode === 422) {
        setMessage("Please Agree Terms Email is required");
        showMessage();
      }
      setLoader(false);
      console.log(JSON.stringify(error.response.data));
      dispatch(loginFailure(error.message));
    }
  };

  const handleModal = async () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      setLoader(false);
      navigation.replace(NavigationStrings.SELECT_GYM);
    }, 1000);
  };

  const signInWithKakao = async () => {
    try {
      setLoader(true);
      const token = await loginWithKakaoAccount();
      const profile = await getProfile();
      console.log(profile);
      let email = profile.email;
      let provider = "kakao";
      await loginbutton(email, provider, token.idToken);
    } catch (err) {
      setLoader(false);
      // console.error("login err", err);
    }
  };

  const loginNaver = async () => {
    // setLoader(true);
    // Log out to ensure the next login prompts for credentials
    // await NaverLogin.logout();

    const { failureResponse, successResponse } = await NaverLogin.login({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlScheme,
      disableNaverAppAuth: false,
    });
    setLoader(true);

    if (successResponse) {
      // const profileResult = await NaverLogin.getProfile(
      //   successResponse?.accessToken
      // );
      let token = successResponse?.accessToken;
      console.log("token::", token);

      let email = "";
      let provider = "naver";
      console.log("successResponse", JSON.stringify(successResponse));
      await loginbutton(email, provider, token);
    } else {
      setLoader(false);
      console.log("Failure Response:", failureResponse);
    }
    setLoader(false);
  };

  const renderHeaderTextContainer = () => (
    <LogoComp title={CONTEXT.welcomeTitle} />
  );

  const onAppleButtonPress = async () => {
    try {
      setLoader(true);
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      console.log("apppleeeeee", appleAuthRequestResponse);
      let email = appleAuthRequestResponse?.email;

      let provider = "apple";
      await loginbutton(email, provider);

      handleModal();
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  const renderLoginButtonsContainer = () => {
    let numberOfButton = 1;

    if (enableNaverLogin) numberOfButton += 1;
    if (enableKakaoLogin) numberOfButton += 1;
    if (enableAppleLogin) numberOfButton += 1;

    return (
      <View>
        {enableKakaoLogin ? (
          <TouchableOpacity
            style={[styles.kakaoButtonStyle, kakaoButtonStyle]}
            onPress={signInWithKakao}
          >
            <Text style={[styles.kakaoButtonTextStyle, kakaoButtonTextStyle]}>
              {CONTEXT.socialText}
            </Text>
            <FastImage source={images.kakao} style={styles.kakaoImageStyle} />
          </TouchableOpacity>
        ) : null}
        {enableNaverLogin ? (
          <TouchableOpacity
            style={[styles.naverButtonStyle, naverButtonStyle]}
            onPress={() => loginNaver()}
          >
            <Text style={[styles.naverButtonTextStyle, naverButtonTextStyle]}>
              {CONTEXT.socialText}
            </Text>
            <FastImage source={images.naver} style={styles.logoImageStyle} />
          </TouchableOpacity>
        ) : null}

        {enableAppleLogin && Platform.OS == "ios" ? (
          <TouchableOpacity
            style={[styles.appleButtonStyle, appleButtonStyle]}
            onPress={onAppleButtonPress}
          >
            <Text style={[styles.appleButtonTextStyle, appleButtonTextStyle]}>
              {CONTEXT.socialText}
            </Text>
            <FastImage source={images.apple} style={styles.appleImageStyle} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.newAccountContainer}>
      <ScrollView
        enabled={false}
        behavior="padding"
        style={{ flex: 1 }}
        contentContainerStyle={styles.keyboardAvoidingViewStyle}
      >
        <SafeAreaView style={{ alignItems: "center" }}>
          {renderHeaderTextContainer()}
          {renderLoginButtonsContainer()}
          <TouchableOpacity
            style={styles.forgetStyle}
            onPress={() => navigation.navigate(NavigationStrings.FORGOT_SCREEN)}
          >
            <Text style={styles.forgetText}>{"Forgot account?"}</Text>
          </TouchableOpacity>
          <CustomModal
            visible={modalVisible}
            imageUrl={images.success}
            text={"Congratulations, you have successfully Logged in!"}
          />
          <Spinner
            visible={loading || loader}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
          {isVisible && <FlashMessage top={true} message={message} />}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default WelcomeScreen;
