import { Dimensions } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import { COLORS } from "../../../home/constant";
const { width: ScreenWidth } = Dimensions.get("window");

const styles = ScaledSheet.create({
  textInputContainer: {
    marginTop: 24,
    justifyContent: "center",
    width: ScreenWidth * 0.85,
  },

  forgotPasswordTextStyle: {
    color: COLORS.themeGray,
  },
  forgotButtonStyle: {
    height: 30,
    justifyContent: "center",
    marginLeft: "auto",
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
    color: COLORS.themeGray,
  },
  signUpButtonTextStyle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.themGreen,
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

  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: scale(250),
  },
  loginImage: { width: 46, height: 46 },
  container: {
    // justifyContent: "space-between",
    // paddingHorizontal: 20,
    marginTop: 0,
    // margin: 10,

    backgroundColor: COLORS.lightBlack,
    borderRadius: 10,
  },
  header: {
    marginBottom: 10,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryItem: {
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryContainer: {
    marginRight: 10,
  },
  categoryImage: {
    width: 72,
    height: 72,
    borderRadius: 10,
    marginLeft: 10,
  },
  categoryName: {
    marginTop: 10,
    textAlign: "center",
    marginLeft: 10,
    marginBottom: 10,
    color: COLORS.white,
    fontSize: 12,
  },
  textTrainer: {
    padding: 5,
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 0,
  },
});

export default styles;
