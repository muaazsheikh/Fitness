import { StyleSheet } from "react-native";

import { scale, moderateScale, verticalScale } from "react-native-size-matters";
import { COLORS, FONTS } from "../../modules/home/constant";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: COLORS.themGreen,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    zIndex: 4,
    height: 50,
  },
  message: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: FONTS.ARCHI_BOLD,
  },
});

export default styles;
