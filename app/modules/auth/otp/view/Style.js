import { Dimensions } from "react-native";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../home/constant";
const { width: ScreenWidth } = Dimensions.get("window");

const styles = ScaledSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
  },
  headerContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  titleTextStyle: {
    fontSize: 30,
    color: COLORS.white,
    fontWeight: "600",
    marginTop: 20,
  },
  textInputContainer: {
    marginTop: 24,
    justifyContent: "center",
    width: ScreenWidth * 0.85,
    alignSelf: "center",
  },
  verifyAgainTextStyle: {
    color: COLORS.themeGray,
  },
  forgotButtonStyle: {
    height: 30,
    justifyContent: "center",
    marginLeft: "auto",
  },
  verifyButtonStyle: {
    marginTop: 24,
    backgroundColor: COLORS.themGreen,
    width: ScreenWidth * 0.85,
    height: "50@ms",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  verifyButtonTextStyle: {
    color: COLORS.black,
    fontWeight: "600",
  },
  logoImg: {
    width: scale(80),
    height: scale(80),
  },
  appleButtonStyle: {
    backgroundColor: COLORS.white,
    width: ScreenWidth * 0.85,
    height: 55,
    marginTop: 8,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  newAccountContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.themeGray,
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.themeGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    marginTop: 20,
  },
  input: { flex: 1, height: 40 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  otpInput: {
    width: 200,
    height: 40,
    backgroundColor: "green",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "white",
  },
  verifyAgainStyle: {
    color: COLORS.lightWhite,
    fontSize: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  sixDigitText: {
    width: 320,
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 30,
  },
  // ---- otp ----
  container: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  roundedTextInput: {
    marginVertical: verticalScale(20),
    width: "10%",
    color: "white",
    borderRadius: scale(10),
    height: 55,
    backgroundColor: COLORS.themeGray,
  },
  attempts: { fontSize: 16, fontFamily: FONTS.ARCHI_BOLD, color: COLORS.red },
});

export default styles;
