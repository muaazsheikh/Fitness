import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import SettingHeader from "../component/header";
import styles from "./Style";
import { COLORS } from "../../home/constant";
import { scale } from "react-native-size-matters";
import { PrimaryButton } from "../../../components";
import getMessageNotiSetting, {
  setMessageNotiSetting,
} from "../../../api/profile/getMessageNotiSetting";
import { useFocusEffect } from "@react-navigation/native";

const MessageNotification = ({ navigation }) => {
  const [isPushNotification, setIsPushNotification] = useState(false);
  const [isEssentialNotification, setIsEssentialNotification] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          setLoading(true);
          const response = await getMessageNotiSetting();
          setIsPushNotification(!!response?.data.isPushNotification);
          setIsEssentialNotification(!!response?.data.isEssentialNotification);
        } catch (error) {
          console.log(JSON.stringify(error));
        } finally {
          setLoading(false);
        }
      }
      fetchMyAPI();
      return () => {};
    }, [])
  );

  async function postSettingsAPI() {
    try {
      const requestData = {
        isPushNotification,
        isEssentialNotification,
      };
      const response = await setMessageNotiSetting(requestData);
      navigation.goBack();

    } catch (error) {
      console.log(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }

  const toggleSwitch = async (val) => {
    setIsEdited(true)
    !!val
      ? setIsEssentialNotification((previousState) => !previousState)
      : setIsPushNotification((previousState) => !previousState);
  };
  const Header = () => (
    <View style={styles.headerBackView}>
      <SettingHeader text="Message Notification Settings" />
    </View>
  );

  const Container = () => (
    <>
      <View style={[styles.placeholderStyle, { marginTop: scale(15) }]}>
        <>
          <View style={styles.rowDirectionView}>
            <Text style={styles.titleName}>Push notification</Text>
            <Switch
              trackColor={{ false: COLORS.gray1, true: COLORS.themGreen }}
              thumbColor={
                isPushNotification ? COLORS.themeGray : COLORS.lightBlack
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch(0)}
              value={isPushNotification}
            />
          </View>
          <Text style={styles.emailText}>
            Receive event messages via email and push notifications.
          </Text>
          <View
            style={[styles.borderBottomView, { marginVertical: scale(10) }]}
          />
        </>
        <>
          <View style={styles.rowDirectionView}>
            <Text style={styles.titleName}>Essential messages</Text>
            <Switch
              trackColor={{ false: COLORS.gray1, true: COLORS.themGreen }}
              thumbColor={
                isEssentialNotification ? COLORS.themeGray : COLORS.lightBlack
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch(1)}
              value={isEssentialNotification}
            />
          </View>
          <Text style={styles.smallText}>Receive essential messages</Text>
        </>
      </View>

      <View style={styles.buttonViewNew}>
        <PrimaryButton
          title={"< Back"}
          style={80}
          edit={true}
          color={true}
          onPress={() => {
            navigation.goBack("");
          }}
        />
        <PrimaryButton
          title={"Save"}
          style={80}
          edit={true}
          color={!isEdited}
          disabled={!isEdited}
          onPress={() => postSettingsAPI()}
        />
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"light-content"} />
        {Header()}
        <ScrollView>{Container()}</ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MessageNotification;
