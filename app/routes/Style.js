import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../modules/home/constant";

const isAndroidOS = Platform.OS === "android";

const styles = StyleSheet.create({
  container: {
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      elevation: 0,
      backgroundColor: COLORS.themeGray,
      height: isAndroidOS ? 70 : 100,
      borderTopWidth: 1,
      borderTopColor: COLORS.lightBlack,
    },
    tabBarLabelStyle: {
      display: "none",
    },
    iconStyle: {
      width: 20,
      height: 20,
      tintColor: "white",
    },
    labelStyle: {
      color: "white",
    },
  },
});

export default styles;
