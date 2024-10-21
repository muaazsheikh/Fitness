import { Dimensions } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import { COLORS } from "../../../home/constant";
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
    alignSelf:'center'
  },
  sendAgainTextStyle: {
    color: COLORS.lightWhite,
  },
  forgotButtonStyle: {
    height: 30,
    justifyContent: "center",
    marginLeft: "auto",
    marginBottom:50
  },
  sendButtonStyle: {
    marginTop: 24,
    backgroundColor: COLORS.themGreen,
    width: ScreenWidth * 0.85,
    height: "50@ms",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonTextStyle: {
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
    backgroundColor:COLORS.themeGray
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
});

export default styles;
