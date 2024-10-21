import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import CalenderScreen from "../modules/home/view/CalenderScreen";
import { NavigationStrings } from "../constants";
import { COLORS, images } from "../modules/home/constant";
import { scale } from "react-native-size-matters";
import Bookedscreen from "../modules/home/view/Bookedscreen";
import TodayScreen from "../modules/home/view/TodayScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatScreen from "../modules/chat/view/ChatScreen";
import AuthTab from "./AuthTab";
import WelcomeScreen from "../modules/auth/welcome/view/WelcomeScreen";
import AcccountSelect from "../modules/auth/account/view/AcccountSelect";

const CustomDrawerContent = ({ navigation, setSelected }) => (
  <DrawerContentScrollView>
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.white }}>
        Calendar
      </Text>
    </View>

    <DrawerItem
      label="Schedule"
      labelStyle={styles.labelStyle}
      onPress={() => {
        setSelected("Schedule");
        navigation.navigate(NavigationStrings.HOME_SCREEN);
      }}
      icon={() => (
        <Image
          source={images.Schedule}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      )}
    />
    <DrawerItem
      label="Day"
      labelStyle={styles.labelStyle}
      onPress={() => {
        setSelected("Day");
        navigation.navigate(NavigationStrings.TODAY_SCREEN);
      }}
      icon={() => (
        <Image
          source={images.Day}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      )}
    />
    <DrawerItem
      label="Week"
      labelStyle={styles.labelStyle}
      activeBackgroundColor={{ backgroundColor: COLORS.themeGray }}
      inactiveBackgroundColor={{ backgroundColor: COLORS.gray1 }}
      onPress={() => {
        setSelected("Week");
        navigation.navigate(NavigationStrings.BOOK_SCREEN);
      }}
      icon={() => (
        <Image
          source={images.Week}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      )}
    />
    <DrawerItem
      label="Month"
      labelStyle={styles.labelStyle}
      onPress={() => {
        setSelected("Month");
        navigation.navigate(NavigationStrings.CALENDER_SCREEN);
      }}
      icon={() => (
        <Image
          source={images.Month}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      )}
    />
    <DrawerItem
      label="Logout"
      labelStyle={styles.labelStyle}
      onPress={() => {
        AsyncStorage.clear();
        navigation.reset({
          index: 0,
          routes: [{ name: NavigationStrings.ACCOUNT_SELECT }],
        });
      }}
      icon={() => (
        <Image
          source={images.user_name}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      )}
    />
  </DrawerContentScrollView>
);

const Drawer = createDrawerNavigator();

export default function MemberDrawerNavigator() {
  const [selected, setSelected] = useState(null);

  return (
    <Drawer.Navigator
      initialRouteName={NavigationStrings.CHAT_SCREEN}
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLORS.gray1,
          width: scale(300),
        },
      }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} setSelected={setSelected} />
      )}
    >
      <Drawer.Screen
        name={NavigationStrings.CHAT_SCREEN}
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={NavigationStrings.BOOK_SCREEN}
        component={Bookedscreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={NavigationStrings.TODAY_SCREEN}
        component={TodayScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
  labelStyle: {
    color: COLORS.white,
  },
});
