import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationStrings } from "../constants";
import { COLORS, images } from "../modules/home-member/constant";
import { scale } from "react-native-size-matters";
import MemberProfile from "../modules/member-information/view";
import { icons } from "../modules/home/constant";
import MemberMyInformation from "../modules/member-information/view/MemberMyInformation";
import MemberProfileMyInfo from "../modules/member-information/view/MemberProfileMyInfo";
import MemberInfoUpdate from "../modules/member-information/view/MemberInfoUpdate";
import MemberPreferred from "../modules/member-information/view/MemberPreferred";
import MemberGoals from "../modules/member-information/view/MemberGoals";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MemberGymInfo from "../modules/member-information/view/MemberGymInfo";
import MemberThejalInfo from "../modules/member-information/view/MemberThejalInfo";
import MemberCenterIntro from "../modules/member-information/view/MemberCenterIntro";
import MemberPTIntro from "../modules/member-information/view/MemberPTIntro";
import MemberCenterBulletin from "../modules/member-information/view/MemberCenterBulletin";
import MemberCenterEvents from "../modules/member-information/view/MemberCenterEvents";
import MemberNoticeBoard from "../modules/member-information/view/MemberNoticeBoard";
import MemberPTList from "../modules/member-information/view/MemberPTList";
import EquipmentDetails from "../modules/member-information/view/EquipmentDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContactMoreThejal from "../modules/member-information/view/ContactMoreThejal";
import ServiceIntroduction from "../modules/member-information/view/ServiceIntroduction";
import ThejalNews from "../modules/member-information/view/ThejalNews";
import AppVersion from "../modules/member-information/view/AppVersion";
import ThejalContactScreen from "../modules/member-information/view/contactToThejal/ThejalContactScreen";
import ThejalContactDetailScreen from "../modules/member-information/view/contactToThejal/ThejalContactDetailScreen";
import FeedbackToCenter from "../modules/member-information/view/CenterFeedback/FeedbackToCenter";
import FeedbackCenterDetailScreen from "../modules/member-information/view/CenterFeedback/FeedbackCenterDetailScreen";

const CustomDrawerContent = ({ navigation, setSelected }) => (
  <DrawerContentScrollView>
    <View style={{ padding: 16, flexDirection: "row", alignItems: "center" }}>
      <View style={styles.IconView}>
        <Image
          source={icons.setting}
          style={[styles.iconStyle, { tintColor: COLORS.black }]}
          resizeMode="contain"
        />
      </View>

      <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.white }}>
        Configuration
      </Text>
    </View>

    <DrawerItem
      label="Message Notification Settings"
      labelStyle={styles.labelStyle}
      onPress={() => {
        setSelected("Message");
        navigation.navigate(NavigationStrings.MESSAGE_NOTIFICATION);
        navigation.closeDrawer();
      }}
      icon={() => (
        <View style={styles.iconOptionView}>
          <Image
            source={icons.notification_bell}
            style={styles.iconStyle}
            resizeMode="contain"
          />
        </View>
      )}
    />

    <View style={styles.VerticalLineStyle} />

    <DrawerItem
      label="PT Class Notification Settings"
      labelStyle={styles.labelStyle}
      onPress={() => {
        setSelected("Setting");
        navigation.navigate(NavigationStrings.PT_CLASSNOTIFY);
      }}
      icon={() => (
        <View style={styles.iconOptionView}>
          <Image
            source={icons.Session_icon}
            style={styles.iconStyle}
            resizeMode="contain"
          />
        </View>
      )}
    />
    <View style={styles.VerticalLineStyle} />
    <DrawerItem
      label="Logout"
      labelStyle={styles.labelStyle}
      activeBackgroundColor={{ backgroundColor: COLORS.themeGray }}
      inactiveBackgroundColor={{ backgroundColor: COLORS.gray1 }}
      onPress={() => {
        AsyncStorage.clear();
        navigation.reset({
          index: 0,
          routes: [{ name: NavigationStrings.WELCOME_SCREEN }],
        });
      }}
      icon={() => (
        <View style={styles.iconOptionView}>
          <Image
            source={icons.logout_icon}
            style={styles.iconStyle}
            resizeMode="contain"
          />
        </View>
      )}
    />
    <View style={styles.VerticalLineStyle} />
    <DrawerItem
      label="Close account"
      labelStyle={styles.labelStyle}
      onPress={() => {
        setSelected("account");
        navigation.navigate(NavigationStrings.CALENDER_SCREEN);
      }}
      icon={() => (
        <View style={styles.iconOptionView}>
          <Image
            source={icons.close_account}
            style={styles.iconStyle}
            resizeMode="contain"
          />
        </View>
      )}
    />
  </DrawerContentScrollView>
);

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export const MemberInformation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationStrings.MEMBER_PROFILE}
        component={MemberProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={NavigationStrings.MEMBER_MY_INFORMATION}
        component={MemberMyInformation}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"setting"}
        component={SettingDrawer}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_PROFILE_MYINFO}
        component={MemberProfileMyInfo}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_CENTER_INFO}
        component={MemberCenterIntro}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_CENTER_BULLETIN}
        component={MemberCenterBulletin}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_CENTER_EVENT}
        component={MemberCenterEvents}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_NOTICE_BOARD}
        component={MemberNoticeBoard}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_PT_INFO}
        component={MemberPTIntro}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_PT_LIST}
        component={MemberPTList}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_INFOUPDATE}
        component={MemberInfoUpdate}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_GOAL}
        component={MemberGoals}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_PREFERRED}
        component={MemberPreferred}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_GYM_INFO}
        component={MemberGymInfo}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_THEJAL_INFO}
        component={MemberThejalInfo}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.CONTACT_THEJAL}
        component={ContactMoreThejal}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.SERVICE_INTRO}
        component={ServiceIntroduction}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.THEJAL_NEWS}
        component={ThejalNews}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.THEJAL_CONTACT}
        component={ThejalContactScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.THEJAL_CONTACT_DETAIL}
        component={ThejalContactDetailScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.FEEDBACK_TO_CENTER}
        component={FeedbackToCenter}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.FEEDBACK_TO_CENTER_DETAIL}
        component={FeedbackCenterDetailScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.APP_VERSION}
        component={AppVersion}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.EQUIPMENT_DETAILS}
        component={EquipmentDetails}
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

export default function SettingDrawer() {
  const [selected, setSelected] = useState(null);

  return (
    <Drawer.Navigator
      initialRouteName={NavigationStrings.MEMBER_PROFILE}
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLORS.gray1,
          width: scale(280),
        },
        drawerPosition: "right",
      }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} setSelected={setSelected} />
      )}
    >
      <Drawer.Screen
        name={NavigationStrings.MEMBER_INFORMATION}
        component={MemberInformation}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name={NavigationStrings.MEMBER_MY_INFORMATION}
        component={MemberMyInformation}
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
  IconView: {
    width: scale(50),
    height: scale(50),
    backgroundColor: COLORS.themGreen,
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
    borderRadius: 50,
  },
  iconOptionView: {
    width: scale(40),
    height: scale(40),
    backgroundColor: COLORS.themeGray,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  VerticalLineStyle: {
    width: scale(240),
    borderWidth: 0.4,
    borderColor: COLORS.lightGray,
    alignSelf: "center",
  },
});
