import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../redux/store";
import {
  createNativeStackNavigator,
  TransitionPresets,
} from "@react-navigation/native-stack";
import { NavigationStrings } from "../constants";
import SplashScreen from "../modules/auth/slpash/view/SplashScreen";
import TrainerTab from "./TrainerTabs";
import AcccountSelect from "../modules/auth/account/view/AcccountSelect";
import WorkoutScreen from "../modules/auth/workout/view/WorkoutScreen";
import GymScreen from "../modules/auth/gym/view/GymScreen";
import MemberTabs from "./MemberTabs";
import AuthTab from "./AuthTab";
import HomeScreen from "../modules/home/view/HomeScreen";
import Bookedscreen from "../modules/home/view/Bookedscreen";
import DrawerNavigator from "./DrawerNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "../modules/auth/welcome/view/WelcomeScreen";
import SelectGym from "../modules/auth/account/SelectGym";
import MessageNotification from "../modules/setting-screen/view";
import PtClassNotify from "../modules/setting-screen/view/PtClassNotify";
import StorageService from "../services/storage";
import ChatScreen from "../modules/chat/view/ChatScreen";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const [splashFinished, setSplashFinished] = useState(false);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    getUser();
    setTimeout(async () => {
      setSplashFinished(true);
    }, 1000);
  }, []);

  const getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("userInfo"));
      const userType = await AsyncStorage.getItem("userType");
      const tokenData = await StorageService.getToken();
      setToken(tokenData);
      setType(userType);
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={NavigationStrings.SPLASH_SCREEN}
          screenOptions={{
            headerShown: false,
            stackPresentation: "push",
            stackAnimation: "slide_from_right",
            screenOrientation: "portrait",
          }}
        >
          {splashFinished ? (
            user ? (
              <Stack.Screen
                component={type === "trainer" ? TrainerTab : MemberTabs}
                name={NavigationStrings.CALENDER_SCREEN}
              />
            ) : (
              <Stack.Screen component={AuthTab} name={NavigationStrings.AUTH} />
            )
          ) : (
            <Stack.Screen
              name={NavigationStrings.SPLASH_SCREEN}
              component={SplashScreen}
            />
          )}
          <Stack.Screen
            name={NavigationStrings.DRAWER_TAB}
            component={DrawerNavigator}
          />
          <Stack.Screen
            component={HomeScreen}
            name={NavigationStrings.HOME_SCREEN}
          />
          <Stack.Screen
            name={NavigationStrings.MEMBER_TAB}
            component={MemberTabs}
          />
          <Stack.Screen
            name={NavigationStrings.BOOK_SCREEN}
            component={Bookedscreen}
          />

          <Stack.Screen
            name={NavigationStrings.TRAINER_TAB}
            component={TrainerTab}
          />

          <Stack.Screen
            component={AcccountSelect}
            name={NavigationStrings.ACCOUNT_SELECT}
          />
          <Stack.Screen
            component={SelectGym}
            name={NavigationStrings.SELECT_GYM}
          />
          <Stack.Screen
            component={WelcomeScreen}
            name={NavigationStrings.WELCOME_SCREEN}
          />

          <Stack.Screen
            component={MessageNotification}
            name={NavigationStrings.MESSAGE_NOTIFICATION}
          />
          <Stack.Screen
            component={PtClassNotify}
            name={NavigationStrings.PT_CLASSNOTIFY}
          />
          <Stack.Screen
            name={NavigationStrings.CHAT}
            component={ChatScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Routes;
