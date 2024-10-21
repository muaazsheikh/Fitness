import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { NavigationStrings } from "../../../../constants";
import FastImage from "react-native-fast-image";
import styles from "./Style";
import SocialLogin from "../../component/social";
import TextInputWithIcon from "../../component/input";
import Seperator from "../../component/seperator";
import LogoComp from "../../component/logo";
import CustomButton from "../../component/button";
import { CONTEXT } from "../../../home/constant/theme";
import { images } from "../../../home/constant";
import BackButton from "../../component/back";
const SignUpScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const renderHeaderTextContainer = () => (
    <LogoComp title={CONTEXT.signUpTitle} />
  );

  const renderInputContainer = () => (
    <View style={styles.textInputContainer}>
      <TextInputWithIcon
        iconSource={images.user_name}
        placeholder={CONTEXT.name}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="grey"
        name={true}
      />

      <TextInputWithIcon
        iconSource={images.email_icon}
        placeholder={CONTEXT.email}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="grey"
      />
      <TextInputWithIcon
        iconSource={images.password_icon}
        placeholder={CONTEXT.password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!showPassword}
        showPassword={showPassword}
        togglePasswordVisibility={() => setShowPassword(!showPassword)}
      />
      <TextInputWithIcon
        iconSource={images.password_icon}
        placeholder={CONTEXT.cpassword}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!showPassword}
        showPassword={showPassword}
        togglePasswordVisibility={() => setShowPassword(!showPassword)}
      />
      <View style={{ marginTop: 30 }}>
        <CustomButton
          title={CONTEXT.signup}
          onPress={() => navigation.navigate(NavigationStrings.SIGNUP_SCREEN)}
        />
      </View>
    </View>
  );

  const SeperatorContainer = () => <Seperator title={CONTEXT.continue} />;

  const renderLoginButtonsContainer = () => {
    return <SocialLogin />;
  };

  const renderSignUpButtonContainer = () => (
    <View style={styles.signUpButtonContainer}>
      <Text style={[styles.signUpTextStyle]}>Already{CONTEXT.haveAccount}</Text>

      <TouchableOpacity
        style={styles.signUpButtonStyle}
        onPress={() => {
          navigation.navigate(NavigationStrings.LOGIN_SCREEN);
        }}
      >
        <Text style={[styles.signUpButtonTextStyle]}>{CONTEXT.login}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <ScrollView
        enabled={false}
        behavior="padding"
        style={{ flex: 1 }}
        contentContainerStyle={styles.keyboardAvoidingViewStyle}
        
      >
        <SafeAreaView style={{ alignItems: "center" }}>
          <BackButton/>
          {renderHeaderTextContainer()}
          {renderInputContainer()}
          {renderSignUpButtonContainer()}
          {SeperatorContainer()}
          {renderLoginButtonsContainer()}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
