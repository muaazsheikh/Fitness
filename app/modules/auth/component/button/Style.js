import { Dimensions } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../home/constant";
const { width: ScreenWidth } = Dimensions.get("window");

const styles = ScaledSheet.create({
  signInButtonStyle: {
    marginTop: 2,
    backgroundColor: COLORS.themGreen,
    width: ScreenWidth * 0.85,
    height: "45@ms",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonTextStyle: {
    color: COLORS.black,
    fontFamily:FONTS.ARCHI_SEMBOLD
  },
});

export default styles;
