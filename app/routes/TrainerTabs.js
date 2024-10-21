import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { icons } from "../modules/home/constant";
import { TabIcon } from "../modules/home/component";
import styles from "./Style";
import { NavigationStrings } from "../constants";
import DrawerNavigator from "./DrawerNavigator";
import HomeScreen from "../modules/home/view/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthTab from "./AuthTab";
import ChatScreen from "../modules/chat/view/ChatScreen";
import WorkOutTab from "../modules/workout/view/WorkOutTab";
import WriteWorkoutLog from "../modules/workout/view/WriteWorkoutLog";
import WriteLogExercise from "../modules/workout/view/WriteLogExercise";
import WorkoutLogCompleted from "../modules/workout/view/WorkoutLogCompleted";
import TrainerDietCompleted from "../modules/workout/view/TrainerDietCompleted";
import TrainerDietExercise from "../modules/workout/view/TrainerDietExercise";
import TrainerDietLog from "../modules/workout/view/TrainerDietLog";
import MemberManagement from "../modules/trainer-member/view/MemberManagement";
import MemberDetailScreen from "../modules/trainer-member/view/MemberDetailScreen";
import TrainerInformation from "../modules/tariner-information/view/TrainerInformation";
import AddInformationScreen from "../modules/tariner-information/view/AddInformationScreen";
import AvailableSessionScreen from "../modules/tariner-information/view/AvailableSessionScreen";
import SessionEditScreen from "../modules/tariner-information/view/SessionEditScreen";
import SeassionScreen from "../modules/tariner-information/view/SeassionScreen";
import TrainerInformationEdit from "../modules/tariner-information/view/TrainerInformationEdit";
import ChatListScreen from "../modules/chat/view/ChatListScreen";
import SelectMember from "../modules/workout/view/SelectMember";
import WorkoutLogCompletedDetail from "../modules/workout/view/WorkoutLogCompletedDetail";
import WriteLogEdit from "../modules/workout/view/WriteLogEdit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setSelectedExercise } from "../redux/workoutSlice";
import { View } from "react-native";
import { toggleChoiceWindow } from "../redux/choiceWindowSlice";
import { showDiscardModal } from "../redux/showDiscardModalSlice";
import { triggerRefresh } from "../redux/refreshSlice";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TrainerTab = ({ navigation }) => {
  const dispatch = useDispatch();
  const [timeoutId, setTimeoutId] = useState(null);
  return (
    <Tab.Navigator
      initialRouteName={NavigationStrings.CALENDER_SCREEN}
      screenOptions={styles.container}
      screenListeners={({ route }) => ({
        tabPress: (e) => {
          dispatch(triggerRefresh());
          if (route.name === NavigationStrings.CALENDER_SCREEN) {
            const state = navigation.getState();
            const index =
              state?.routes[0]?.state?.routes[0]?.state?.routes[0]?.state
                ?.index;
            if (!!index) {
              navigation.goBack();
            }
          }
        },
      })}
    >
      <Tab.Screen
        name={NavigationStrings.CALENDER_SCREEN}
        component={CalendarStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.member_calendar}
              width={32}
              height={32}
            />
          ),
        }}
      />

      <Tab.Screen
        name={"home"}
        component={WorkOutStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.tab_workout}
              width={33}
              height={35}
            />
          ),
        }}
        listeners={{
          tabPress: async (e) => {
            try {
              dispatch(
                toggleChoiceWindow({
                  show: true,
                })
              );
            } catch (e) {
              console.error("Failed to load form data", e);
              return null;
            }
          },
        }}
      />
      <Tab.Screen
        name={NavigationStrings.CHAT_LIST}
        component={ChatStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.tab_chat}
              width={36}
              height={33}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Member"
        component={MemberStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.tab_member}
              width={35}
              height={35}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NavigationStrings.TRAINER_INFO_STACK}
        component={TrainerInfoStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.tab_profile}
              width={35}
              height={35}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationStrings.CALENDER_SCREEN}
        component={DrawerNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.HOME_SCREEN}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationStrings.AUTH}
        component={AuthTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export const TrainerInfoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationStrings.TRAINER_INFO}
        component={TrainerInformation}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.TRAINER_ADD_INFO}
        component={AddInformationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationStrings.TRAINER_TIMES}
        component={AvailableSessionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationStrings.TRAINER_TIME_EDIT}
        component={SessionEditScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationStrings.TRAINER_SESSION}
        component={SeassionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationStrings.TRAINER_INFO_EDIT}
        component={TrainerInformationEdit}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_profile} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
export const MemberStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationStrings.MEMBER_MANAGEMENT}
        component={MemberManagement}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_DETAIL}
        component={MemberDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationStrings.WORKOUT_Tab}
        component={WorkOutTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.WRITE_WORKOUT_LOG}
        component={WriteWorkoutLog}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationStrings.WRITE_LOG_EXERCISE}
        component={WriteLogExercise}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationStrings.WORKOUT_MEMBER_DETAIL}
        component={WorkoutLogCompletedDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationStrings.WORKOUT_EDIT}
        component={WriteLogEdit}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

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

const WorkOutStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={NavigationStrings.WORKOUT_COMPLETED}>
        <Stack.Screen
          name={NavigationStrings.WORKOUT_COMPLETED}
          component={WorkoutLogCompleted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationStrings.WORKOUT_Tab}
          component={WorkOutTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.tab_calendar} />
            ),
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationStrings.WRITE_WORKOUT_LOG}
          component={WriteWorkoutLog}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationStrings.SELECT_MEMBER}
          component={SelectMember}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationStrings.WRITE_LOG_EXERCISE}
          component={WriteLogExercise}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={NavigationStrings.WORKOUT_MEMBER_DETAIL}
          component={WorkoutLogCompletedDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationStrings.TRAINER_DIET_COMPLETED}
          component={TrainerDietCompleted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationStrings.WORKOUT_EDIT}
          component={WriteLogEdit}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationStrings.TRAINER_DIET_EXERCISE}
          component={TrainerDietExercise}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationStrings.TRAINER_DIET_LOG}
          component={TrainerDietLog}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};
export default TrainerTab;
