import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import CalenderScreen from "../modules/home-member/view/CalenderScreen";
import { NavigationStrings } from "../constants";
import { COLORS, images } from "../modules/home-member/constant";
import { scale } from "react-native-size-matters";
import Bookedscreen from "../modules/home-member/view/Bookedscreen";
import TodayScreen from "../modules/home-member/view/TodayScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationStatusScreen from "../modules/home-member/view/NotificationStatusScreen";
import ChatListScreen from "../modules/chat/view/ChatListScreen";
import ChatScreen from "../modules/chat/view/ChatScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const CustomDrawerContent = ({ navigation, setSelected }) => (
  <DrawerContentScrollView>
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.white }}>
        Calendar
      </Text>
    </View>

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
          routes: [{ name: NavigationStrings.WELCOME_SCREEN }],
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

export default function DrawerMember() {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (selected) {
      navigation.navigate(selected);
    }
  }, [selected, navigation]);

  return (
    <Drawer.Navigator
      initialRouteName={NavigationStrings.CALENDER_SCREEN}
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
        name={NavigationStrings.CALENDER_SCREEN}
        component={CalenderScreen}
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
      <Drawer.Screen
        name={NavigationStrings.NOTIFICATION_STATUS_SCREEN}
        component={NotificationStatusScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={NavigationStrings.CHAT_LIST}
        component={ChatStack}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
export const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationStrings.CHAT_LIST}
        component={ChatListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

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
