import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../modules/home/view/HomeScreen";
import { icons } from "../modules/home/constant";
import { TabIcon } from "../modules/home/component";
import styles from "./Style";
import CalenderScreen from "../modules/home/view/CalenderScreen";
import { NavigationStrings } from "../constants";
import DietScreen from "../modules/memberDiet/view/DietScreen";
import DietUpdateScreen from "../modules/memberDiet/view/DietUpdateScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MemberTab from "../modules/memberDiet/view/MemberTab";
import DietEditScreen from "../modules/memberDiet/view/DietEditScreen";
import DietChange from "../modules/memberDiet/view/DietChange";
import ChatScreen from "../modules/chat/view/ChatScreen";
import DietCreateScreen from "../modules/memberDiet/view/DietCreateScreen";
import MemberExercise from "../modules/member-exercise/view/MemberExercise";
import MemberWrite from "../modules/member-exercise/view/MemberWrite";
import MemberExerciseList from "../modules/member-exercise/view/MemberExerciseList";

import DrawerMember from "./DrawerMember";

import SettingDrawer from "./SettingDrawer";

import WorkOutTab from "../modules/workout-member/view/WorkOutTab";
import WriteLogContainer from "../modules/workout-member/component/exerciseContainer";
import WriteLogExercise from "../modules/workout-member/view/WriteLogExercise";
import WorkoutLogCompleted from "../modules/workout-member/view/WorkoutLogCompleted";
import WriteWorkoutLog from "../modules/workout-member/view/WriteWorkoutLog";
import WorkoutLogSignature from "../modules/workout-member/view/WorkoutLogSignature";
import WorkoutLogCompletedDetail from "../modules/workout-member/view/WorkoutLogCompletedDetail";
import MemberInbodyStatistics from "../modules/member-exercise/view/MemberInbodyStatistics";
import WriteLogEdit from "../modules/workout-member/view/WriteLogEdit";
import WorkOutTabCreate from "../modules/workout-member/view/WorkOutTabCreate";
import WriteLogExerciseSession from "../modules/workout-member/view/WriteLogExerciseSession";
import { setSelectedExercise } from "../redux/workoutSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showDiscardModal } from "../redux/showDiscardModalSlice";
import { triggerRefresh } from "../redux/refreshSlice";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MemberTabs = () => {
  const dispatch = useDispatch();
  return (
    <Tab.Navigator
      initialRouteName={NavigationStrings.MEMBER_TAB}
      screenOptions={styles.container}
      screenListeners={({ navigation, route }) => ({
        tabPress: (e) => {
          if (route.name === NavigationStrings.WORKOUT_Tab_MEMBER_STACK) {
            const state = navigation.getState();
            const index = state?.routes[1]?.state?.index;
            if (index === 0) {
              const topScreen = state.routes[1].state.routes[0];
              if (
                topScreen.name === NavigationStrings.WORKOUT_COMPLETED_MEMBER
              ) {
                dispatch(triggerRefresh());
              }
            }
          } else if (route.name === NavigationStrings.MEMBER_TAB) {
            const state = navigation.getState();
            const index = state?.routes[0]?.state?.index;
            if (index === 1) {
              navigation.goBack();
            }
          }
        },
      })}
    >
      <Tab.Screen
        name={NavigationStrings.MEMBER_TAB}
        component={DrawerMember}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.member_calendar} width={32} height={32}/>
          ),
        }}
      />
      <Tab.Screen
        name={NavigationStrings.WORKOUT_Tab_MEMBER_STACK}
        component={MemberWorkOutStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.member_log} width={34} height={35}/>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: async(e) => {
            try {
              const sessionID = await AsyncStorage.getItem("@sessionIDMember");
              if (!!sessionID) {
              }
            } catch (e) {
              console.error("Failed to load form data", e);
              return null;
            }
          },  
        })}
      />
      <Tab.Screen
        name={NavigationStrings.DIET_SCREEN}
        component={DietStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.member_diet}  width={34} height={35}/>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            dispatch(triggerRefresh());
          },
        })}
      />
      <Tab.Screen
        name="Graph"
        component={ExerciseStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.member_graph} width={34} height={29} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            dispatch(triggerRefresh());
          },
        })}
      />
      <Tab.Screen
        name={NavigationStrings.SETTING_DRAWER}
        component={SettingDrawer}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_profile} width={35} height={36}/>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            dispatch(triggerRefresh());
          },
        })}
      />
    </Tab.Navigator>
  );
};

export const DietStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationStrings.DIET_UPDATE}
        component={DietUpdateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_TAB}
        component={MemberTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationStrings.DIET_SCREEN}
        component={DietScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.DIET_CREATE_SCREEN}
        component={DietCreateScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={NavigationStrings.DIET_EDIT}
        component={DietEditScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationStrings.DIET_CHANGE}
        component={DietChange}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export const ExerciseStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationStrings.MEMBER_EXERCISE}
        component={MemberExercise}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_BODY}
        component={MemberWrite}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_EXER_LIST}
        component={MemberExerciseList}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tab_calendar} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationStrings.MEMBER_INBODY_STATISTICS}
        component={MemberInbodyStatistics}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MemberWorkOutStack = () => {
  return (
    <>
       <Stack.Navigator initialRouteName={NavigationStrings.WORKOUT_COMPLETED_MEMBER}>
          <Stack.Screen
            name={NavigationStrings.WORKOUT_COMPLETED_MEMBER}
            component={WorkoutLogCompleted}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={NavigationStrings.WORKOUT_Tab_MEMBER_STACK}
            component={WorkOutTab}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} icon={icons.tab_calendar} />
              ),
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={NavigationStrings.WRITE_WORKOUT_LOG_MEMBER}
            component={WriteWorkoutLog}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={NavigationStrings.WORKOUT_CREATE}
            component={WorkOutTabCreate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={NavigationStrings.WORKOUT_EDIT}
            component={WriteLogEdit}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={NavigationStrings.WRITE_LOG_EXERCISE_MEMBER}
            component={WriteLogExercise}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={NavigationStrings.WRITE_LOG_EXERCISE_SESSION_MEMBER}
            component={WriteLogExerciseSession}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={NavigationStrings.WORKOUT_MEMBER_DETAIL}
            component={WorkoutLogCompletedDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={NavigationStrings.WORKOUT_SIGNATURE}
            component={WorkoutLogSignature}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={NavigationStrings.SETTING_DRAWER}
            component={SettingDrawer}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
    </>
  );
};

export default MemberTabs;
