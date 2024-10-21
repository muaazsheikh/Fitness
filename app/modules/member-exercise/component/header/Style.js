import { ScaledSheet, scale } from "react-native-size-matters";

import { FONTS } from "../../../workout/constant";
import { COLORS } from "../../../home/constant";
const styles = ScaledSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    width: "70%",
  },
  headerImage: {
    width: 30,
    height: 30,
    alignSelf: "flex-end",
  },
  touchableText: {
    fontSize: 12,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
  },
  headerClick: {
    width: scale(80),
    height: 40,
    backgroundColor: COLORS.gray1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
  },
  smallIcon: {
    width: scale(12),
    height: scale(12),
    resizeMode: "contain",
  },
  textCalendar: {
    color: COLORS.lightWhite,
    fontSize: 13,
  },
  writeTouchable: {
    width: 100,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.themGreen,
    justifyContent: "center",
  },
});
export default styles;
