import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TextInput } from "react-native";
import { COLORS } from "../../../workout/constant";
import DropDownPicker from "react-native-dropdown-picker";
import TextInputWithIcon from "../../component/input";
import CustomButton from "../../component/button";
import CustomModal from "../../component/modal";
import BackButton from "../../component/back";
import { images } from "../../../home/constant";
import { NavigationStrings } from "../../../../constants";
import styles from "./Style";
import Spinner from "react-native-loading-spinner-overlay";
import inquirySubmitApi from "../../../../api/auth/inquirySubmit";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [inquiryTypeCompleted, setInquiryTypeCompleted] = useState(false);
  const [subject, setSubject] = useState("");
  const [subjectCompleted, setSubjectCompleted] = useState(false);
  const [cellphone, setCellphone] = useState("");
  const [cellphoneCompleted, setCellphoneCompleted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailCompleted, setEmailCompleted] = useState(false);
  const [content, setContent] = useState("");
  const [contentCompleted, setContentCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    { label: "Account issues", value: "Account issues" },
    { label: "Unable to login", value: "Unable to login" },
    { label: "Unable to find account", value: "Unable to find account" },
    { label: "Other related issues", value: "Other related issues" },
  ]);

  const handleModal = async () => {
    console.log("jssssss", subject, cellphone, email, value, content);
    // Check if all fields are completed
    if (
      inquiryTypeCompleted &&
      subjectCompleted &&
      cellphoneCompleted &&
      emailCompleted
    ) {
      try {
        const response = await inquirySubmitApi(
          subject,
          cellphone,
          email,
          value,
          content
        );
        console.log(JSON.stringify(response));

        setLoading(false);
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
        // setEmail("");
      } catch (error) {
        setLoading(false);
        console.log("error:::", error.response.data);
      }
    } else {
      // Show error message or handle incomplete fields
      alert("Please fill out all required fields.");
    }
  };

  return (
    <KeyboardAwareScrollView style={{flex:1,backgroundColor:COLORS.themeGray}}>

    <View style={styles.newAccountContainer}>
      <ScrollView
        enabled={false}
        behavior="padding"
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        contentContainerStyle={styles.keyboardAvoidingViewStyle}
      >
        <SafeAreaView>
          <View style={{ marginLeft: 30, marginBottom: 30 }}>
            <BackButton />
          </View>
          <View>
            <Text style={[styles.titleTextStyle]}>
              The following information must be filled out. Please enter the
              required details below.
            </Text>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInput}>Inquiry Type*</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder={"Please fill out this field"}
              placeholderStyle={{
                marginLeft: 30,
                color: COLORS.placeholderColor,
              }}
              style={{
                borderWidth: 1,
                borderColor: inquiryTypeCompleted ? COLORS.themeGray : "red",
                borderRadius: 40,
                paddingHorizontal: 10,
                backgroundColor: COLORS.white,
                marginTop: 10,
                backgroundColor: COLORS.lightBlack,
              }}
              labelStyle={{
                fontWeight: "bold",
                marginLeft: 30,
                color: COLORS.placeholderColor,
              }}
              dropDownContainerStyle={{
                backgroundColor: COLORS.lightBlack,
                zIndex: 1000,
                elevation: 1000,
              }}
              listItemLabelStyle={{
                color: COLORS.placeholderColor,
              }}
              zIndex={1000}
              onChangeValue={(value) => {
                if (value) {
                  setInquiryTypeCompleted(true);
                } else {
                  setInquiryTypeCompleted(false);
                }
              }}
            />
            <Text style={styles.textInput}>Subject*</Text>
            <TextInputWithIcon
              placeholder={"Please fill out this field"}
              onChangeText={(text) => {
                setUsername(text);
                setSubject(text);
                setSubjectCompleted(text.trim().length > 0);
              }}
              completed={subjectCompleted}
            />
            <Text style={styles.textInput}>Cell phone*</Text>
            <TextInputWithIcon
              placeholder={"Please fill out this field"}
              onChangeText={(text) => {
                setUsername(text);
                setCellphone(text);
                setCellphoneCompleted(text.trim().length > 9);
              }}
              completed={cellphoneCompleted}
            />
            <Text style={styles.textInput}>Email*</Text>
            <TextInputWithIcon
              placeholder={"Please fill out this field"}
              onChangeText={(text) => {
                setUsername(text);
                setEmail(text);
                setEmailCompleted(
                  text.trim().length > 0 && validateEmail(text)
                );
              }}
              completed={emailCompleted}
            />

            <Text style={styles.textInput}>Content*</Text>
            <View
              style={{
                height: 100,
                backgroundColor: COLORS.lightBlack,
                borderWidth: 1,
                borderRadius: 20,
                marginTop: 10,
              }}
            >
              <TextInput
                placeholder={"Please fill out this field"}
                onChangeText={(text) => {
                  setUsername(text);
                  setContent(text);
                  setContentCompleted(text.trim().length > 0);
                }}
                placeholderTextColor={COLORS.placeholderColor}
                style={{
                  color: COLORS.white,
                  paddingHorizontal: 10,
                  marginTop: 10,
                }}
                multiline={true}
                completed={contentCompleted}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomButton title={"Send"} onPress={handleModal} />
            </View>
          </View>
          <CustomModal
            visible={modalVisible}
            imageUrl={images.success}
            text={"Congratulations, you have successfully Logged in!"}
          />
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

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(String(email).toLowerCase());
};

export default LoginScreen;
