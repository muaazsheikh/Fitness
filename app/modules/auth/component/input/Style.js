import { scale, ScaledSheet } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../home/constant";

const styles = ScaledSheet.create({
  icon: {
    width: 16,
    height: 13,
    marginRight: 10,
  },
  user_icon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  eye_icon: {
    width: 18,
    height: 15,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.themeGray,
    borderRadius: 40,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    marginTop: 10,
    backgroundColor: COLORS.lightBlack,
  },
  input: {
    flex: 1,
    height: 56,
    fontFamily: FONTS.ARCHI_MEDIUM,
    color: COLORS.white,
  },
  incomplete: {
    borderColor: "red", // Border color when incomplete
  },
  incompleteInput: {},
});

export default styles;
