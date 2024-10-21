import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styles from "./Style";
import LogoComp from "../../component/logo";
import { COLORS, CONTEXT } from "../../../home/constant/theme";
import CustomModal from "../../component/modal";
import { images } from "../../../home/constant";

import OTPTextInput from "react-native-otp-textinput";
import CustomButton from "../../component/button";
import BackButton from "../../component/back";
import { FONTS } from "../../../workout/constant";
import { NavigationStrings } from "../../../../constants";
import Spinner from "react-native-loading-spinner-overlay";
import verifyOtpApi from "../../../../api/auth/verifyOtp";
import forgetAccountApi from "../../../../api/auth/forgetAccount";
import { loginSuccess } from "../../../../redux/authSlice";
import StorageService from "../../../../services/storage";
import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const OtpScreen = ({
  navigation,
  enableForgotPassword = true,
  handleForgotPassword,
  route,
}) => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVerify, setModalVerify] = useState(false);
  const [modalSign, setModalSigned] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const id = route.params;

  const input = useRef(null);

  setTimeout(() => {
    setModalVerify(false);
  }, 3000);

  const handleCellTextChange = async (text, i) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };

  const handleVerifyPress = async () => {
    // alert(JSON.stringify(id.id))
    try {
      const response = await verifyOtpApi(id?.id, otpInput);
      console.log(JSON.stringify(response.data));
      StorageService.setUser(response.data || null);
      dispatch(loginSuccess(response));
      setLoading(false);
      setModalSigned(true);
      setTimeout(() => {
        setModalSigned(false);
      }, 1000);

      navigation.replace(NavigationStrings.SELECT_GYM);
      // setEmail("");
    } catch (error) {
      setLoading(false);
      if (
        error?.response?.data?.statusCode === 404 ||
        error?.response?.data?.statusCode === 400
      ) {
        setCount(error?.response?.data?.data?.count);
        setModalCancel(true);
      }
      console.log("error:::", error.response.data);
    }
  };

  const handleReSendButtonPress = async () => {
    try {
      const response = await forgetAccountApi(id.id);
      console.log(JSON.stringify(response));

      setLoading(false);
      setModalVerify(true);
      setTimeout(() => {
        setModalVerify(false);
      }, 1000);
      // setEmail("");
    } catch (error) {
      setLoading(false);
      if (
        error.response.data.statusCode === 404 ||
        error.response.data.statusCode === 400
      ) {
        setModalCancel(true);
      }
      console.log("error:::", error.response.data);
    }
  };

  const navigationHandle = () => {
    navigation.navigate(NavigationStrings.LOGIN_SCREEN);
    setModalCancel(false);
  };

  const renderHeaderTextContainer = () => (
    <View style={styles.headerContainer}>
      <LogoComp title={CONTEXT.verifyTitle} />
      <Text style={styles.verifyAgainStyle}>
        We have sent you email or message.{" "}
      </Text>
      <Text numberOfLines={3} style={[styles.sixDigitText]}>
        Enter the 6- digit code. This code will expire after 2 minutes and can
        only be used three times per day{" "}
      </Text>

      <View style={styles.container}>
        <OTPTextInput
          ref={input}
          containerStyle={styles.otpInputContainer}
          inputCount={6}
          keyboardType="numeric"
          handleTextChange={setOtpInput}
          textInputStyle={{
            borderWidth: 1,
            color: COLORS.white,
            height: 70,
            borderRadius: 15,
          }}
          handleCellTextChange={handleCellTextChange}
          offTintColor={COLORS.gray}
          tintColor={COLORS.gray}
          cellStyle={{ height: 80 }}
        />
      </View>
      <TouchableOpacity onPress={() => handleReSendButtonPress()}>
        <Text style={[styles.verifyAgainStyle]}>
          Didn’t you receive the OTP?
          <Text style={[{ color: COLORS.themGreen }]}>{"Resend OTP"}</Text>
        </Text>
      </TouchableOpacity>

      {count && (
        <Text style={styles.attempts}>{`${count} attempts remaining`}</Text>
      )}
    </View>
  );

  const renderInputContainer = () => (
    <View style={styles.textInputContainer}>
      {otpInput.length === 6 && (
        <CustomButton
          title={CONTEXT.verify}
          // onPress={() => navigation.navigate(NavigationStrings.LOGIN_SCREEN)}
          onPress={() => handleVerifyPress()}
        />
      )}

      <CustomModal
        onClose={() => setModalVisible(false)}
        upperText={"Verification code was sent successfully"}
        visible={modalVisible}
        imageUrl={images.success}
        button={"Confirm"}
        text={
          "We have sent you code on your email  kers*****@gmail.com and SMS on phone no.******9788"
        }
      />

      <CustomModal
        onClose={() => setModalVerify(false)}
        visible={modalVerify}
        imageUrl={images.success}
        text={"Verification code was resent successfully."}
      />
      <CustomModal
        onClose={() => setModalSigned(false)}
        visible={modalSign}
        imageUrl={images.success}
        text={
          "You have signed up with kers*****@gmail.com,using Kakao account."
        }
      />

      <CustomModal
        onClose={() => navigationHandle()}
        visible={modalCancel}
        imageUrl={images.alert}
        button={"Retry"}
        cross={() => setModalCancel(false)}
        text={"No matching member information found. Please try again!"}
      />
    </View>
  );

  return (
    <KeyboardAwareScrollView style={{flex:1,backgroundColor:COLORS.themeGray}}>
    <View style={styles.newAccountContainer}>
      <ScrollView
        enabled={false}
        behavior="padding"
        style={{ flex: 1 }}
        contentContainerStyle={styles.keyboardAvoidingViewStyle}
      >
        <SafeAreaView>
          <View style={{ marginLeft: 20 }}>
            <BackButton />
          </View>
          {renderHeaderTextContainer()}
          {renderInputContainer()}
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
    </KeyboardAwareScrollView>
  );
};

export default OtpScreen;
