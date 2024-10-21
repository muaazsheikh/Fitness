import { Dimensions } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../home/constant";
const { width: ScreenWidth } = Dimensions.get("window");

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },

  textInputContainer: {
    marginTop: 24,
    justifyContent: "center",
    width: ScreenWidth * 0.85,
    alignSelf: "center",
  },

  forgotPasswordTextStyle: {
    color: COLORS.lightWhite,
    fontFamily: FONTS.ARCHI_MEDIUM,
  },
  forgotButtonStyle: {
    height: 30,
    justifyContent: "center",
    marginLeft: "auto",
    marginBottom: 30,
  },
  signUpButtonContainer: {
    marginTop: 8,
    width: ScreenWidth * 0.9,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  signUpButtonStyle: {
    height: 40,
    justifyContent: "center",
    marginLeft: 1,
  },
  signUpTextStyle: {
    fontSize: 14,
    color: COLORS.lightWhite,
    fontFamily: FONTS.ARCHI_MEDIUM,
  },
  signUpButtonTextStyle: {
    fontSize: 14,
    fontFamily: FONTS.ARCHI_MEDIUM,
    color: COLORS.themGreen,
  },
  newAccountContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#181A1F",
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },

  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: scale(250),
  },
  loginImage: { width: 46, height: 46 },
  titleTextStyle: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_BLACK,
    textAlign: "center",
    width: 320,
    alignSelf: "center",
  },
  textInput: {
    alignSelf: "flex-start",
    marginLeft: 10,
    fontSize: 16,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    color: COLORS.white,
    marginTop: 10,
  },
});

export default styles;
