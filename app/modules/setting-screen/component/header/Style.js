import { ScaledSheet } from "react-native-size-matters";
import { FONTS } from "../../../workout/constant";
import { COLORS } from "../../../home/constant";

const styles = ScaledSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    width: "80%",
  },
  headerImage: {
    width: 30,
    height: 30,
    alignSelf: "flex-end",
  },
});
export default styles;