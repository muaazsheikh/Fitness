import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { NavigationStrings } from "../../../../constants";
import styles from "./Style";
import { CONTEXT } from "../../../home/constant/theme";
import LogoComp from "../../component/logo";
import TextInputWithIcon from "../../component/input";
import CustomButton from "../../component/button";
import { images } from "../../../home/constant";
import BackButton from "../../component/back";
import forgetAccountApi from "../../../../api/auth/forgetAccount";
import Spinner from "react-native-loading-spinner-overlay";
import CustomModal from "../../component/modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLORS } from "../../../workout/constant";

const ForgotScreen = ({
  navigation,
  enableForgotPassword = true,
  handleForgotPassword,
}) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const navigationHandle = () => {
    navigation.navigate(NavigationStrings.OTP_SCREEN, {
      id: email,
    });
    setModalVisible(false);
  };

  const isPhoneValid = (phone) => {
    // Regular expression for mobile number validation
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSendButtonPress = async () => {
    if (!isEmailValid(email)) {
      alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    if (!isPhoneValid(phone)) {
      alert(
        "Invalid Phone Number",
        "Please enter a valid 10-digit phone number"
      );
      return;
    }

    try {
      const response = await forgetAccountApi(email, phone);
      console.log(JSON.stringify(response));

      setLoading(false);
      setModalVisible(true);
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
          <LogoComp title={CONTEXT.forgetTitle} />
          <View style={styles.textInputContainer}>
            <TextInputWithIcon
              name={true}
              iconSource={images.email_icon}
              placeholder={CONTEXT.email}
              onChangeText={(text) => setEmail(text)}
              value={email}
              completed={true}
            />
            <TextInputWithIcon
              iconSource={images.cell_phone}
              placeholder={"Cell Phone No:"}
              onChangeText={(text) => setPhone(text)}
              value={phone}
              keyboardType="numeric"
              completed={true}
            />
            {enableForgotPassword ? (
              <TouchableOpacity
                style={styles.forgotButtonStyle}
                onPress={handleForgotPassword}
              ></TouchableOpacity>
            ) : null}
            <CustomButton
              title={CONTEXT.send}
              onPress={handleSendButtonPress}
            />
            <Spinner
              visible={loading}
              textContent={"Loading..."}
              textStyle={{ color: "#FFF" }}
            />
            <CustomModal
              onClose={() => {
                setModalCancel(false),
                  navigation.navigate(NavigationStrings.LOGIN_SCREEN);
              }}
              visible={modalCancel}
              imageUrl={images.alert}
              button={"Retry"}
              cross={() => setModalCancel(false)}
              text={"No matching member information found. Please try again!"}
            />
            <CustomModal
              onClose={() => navigationHandle()}
              upperText={"Verification code was sent successfully"}
              visible={modalVisible}
              imageUrl={images.success}
              button={"Confirm"}
              cross={() => setModalVisible(false)}
              text={
                "We have sent you code on your email  kers*****@gmail.com and SMS on phone no.******9788"
              }
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
    </KeyboardAwareScrollView>

  );
};

export default ForgotScreen;
