import { Dimensions } from "react-native";
import { ScaledSheet, scale } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../home/constant";
const { width: ScreenWidth } = Dimensions.get("window");

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  headerContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    marginTop: 24,
    justifyContent: "center",
    width: ScreenWidth * 0.85,
  },

  signInButtonStyle: {
    marginTop: 24,
    backgroundColor: COLORS.themGreen,
    width: ScreenWidth * 0.85,
    height: "50@ms",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonTextStyle: {
    color: COLORS.black,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  logoImageStyle: {
    width: "22@ms",
    height: "22@ms",
    marginLeft: 12,
  },
  appleImageStyle: {
    width: "16@ms",
    height: "20@ms",
    marginLeft: 12,
  },
  kakaoImageStyle: {
    width: "20@ms",
    height: "30@ms",
    marginLeft: 12,
  },
  naverButtonStyle: {
    backgroundColor: COLORS.gray,
    width: ScreenWidth * 0.85,
    height: "40@ms",
    marginTop: 15,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  naverButtonTextStyle: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  kakaoButtonStyle: {
    backgroundColor: COLORS.gray,
    width: ScreenWidth * 0.85,
    height: "40@ms",
    marginTop: 25,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  kakaoButtonTextStyle: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  appleButtonStyle: {
    backgroundColor: COLORS.gray,
    width: ScreenWidth * 0.85,
    height: "40@ms",
    marginTop: 15,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  appleButtonTextStyle: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  newAccountContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.themeGray,
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  forgetStyle: { marginTop: 30 },
  forgetText: { color: COLORS.placeholderColor, fontFamily: FONTS.ARCHI_BOLD },
});

export default styles;
