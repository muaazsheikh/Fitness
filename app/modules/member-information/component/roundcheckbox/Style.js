import { ScaledSheet, scale } from "react-native-size-matters";
import { FONTS } from "../../../workout/constant";
import { COLORS } from "../../../home/constant";
const styles = ScaledSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    alignSelf: "center",
    gap:10
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.gray, // Use your primary color
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightBlack,
    marginRight:scale(14)
  },
  checked: {
    backgroundColor: COLORS.lightBlack, // Use your primary color
  },
  checkIcon: {
    color: COLORS.themGreen, // Use your text color
    fontSize: 16,
    fontFamily:FONTS.ARCHI_MEDIUM
  },
  label: {
    fontSize: 13,
    fontFamily: FONTS.ARCHI_MEDIUM,
    color: COLORS.white, // Use your text color
  },
});
export default styles;