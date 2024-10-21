import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { COLORS } from "../../../home/constant";
const { width: ScreenWidth } = Dimensions.get("window");

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    alignItems: "center",
    flex: 1,
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

  signUpButtonContainer: {
    marginTop: 8,
    width: ScreenWidth * 0.9,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  signUpButtonStyle: {
    height: 40,
    justifyContent: "center",
    marginLeft: 1,
  },
  signUpTextStyle: {
    fontSize: 14,
    color: COLORS.lightText,
    
  },
  signUpButtonTextStyle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.themGreen,
  },
  newAccountContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.themeGray,
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
});

export default styles;
