import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationStrings } from "../constants";
import LoginScreen from "../modules/auth/login/view";
import SignUpScreen from "../modules/auth/signup/view/SignUpScreen";
import WelcomeScreen from "../modules/auth/welcome/view/WelcomeScreen";
import ForgotScreen from "../modules/auth/forget/view/ForgotScreen";
import OtpScreen from "../modules/auth/otp/view/OtpScreen";
import AcccountSelect from "../modules/auth/account/view/AcccountSelect";
import WorkoutScreen from "../modules/auth/workout/view/WorkoutScreen";
import GymScreen from "../modules/auth/gym/view/GymScreen";
import SelectGym from "../modules/auth/account/SelectGym";

const Stack = createNativeStackNavigator();

const AuthTab = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavigationStrings.WELCOME_SCREEN}
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        orientation: "portrait",
      }}
    >
      <Stack.Screen component={SelectGym} name={NavigationStrings.SELECT_GYM} />
      <Stack.Screen
        component={WelcomeScreen}
        name={NavigationStrings.WELCOME_SCREEN}
      />

      <Stack.Screen
        component={LoginScreen}
        name={NavigationStrings.LOGIN_SCREEN}
      />
      <Stack.Screen
        component={SignUpScreen}
        name={NavigationStrings.SIGNUP_SCREEN}
      />
      <Stack.Screen
        component={ForgotScreen}
        name={NavigationStrings.FORGOT_SCREEN}
      />
      <Stack.Screen component={OtpScreen} name={NavigationStrings.OTP_SCREEN} />
      <Stack.Screen
        component={WorkoutScreen}
        name={NavigationStrings.WORKOUT_SCREEN}
      />
      <Stack.Screen component={GymScreen} name={NavigationStrings.GYMSCREEN} />
    </Stack.Navigator>
  );
};

export default AuthTab;
