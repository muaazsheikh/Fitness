import { ScaledSheet, scale } from "react-native-size-matters";
import { FONTS } from "../../../workout/constant";
import { COLORS } from "../../../home/constant";
const styles = ScaledSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    alignSelf: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
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
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.black, // Use your text color
  },
});
export default styles;