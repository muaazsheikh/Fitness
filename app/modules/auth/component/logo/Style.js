import { scale, ScaledSheet } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../home/constant";

const styles = ScaledSheet.create({
  headerContainer: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImg: {
    width: scale(120),
    height: scale(120),
    resizeMode: "contain",
  },
  titleTextStyle: {
    fontSize: 26,
    color: COLORS.white,
    marginTop: 20,
    fontFamily: FONTS.ARCHI_BLACK,
  },
});

export default styles;
