import { ScaledSheet, scale } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../../home/constant";

const styles = ScaledSheet.create({
  dietImg: {
    width: scale(320),
    height: scale(230),
  },
  updateHeader: {
    flex: 1,
    zIndex: 1,
    width: 300,
    alignSelf: "flex-start",
    paddingHorizontal: 3,
  },
  valueText: {
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    fontSize: 13,
  },
  smallIcon: {
    width: scale(12),
    height: scale(12),
    resizeMode: "contain",
  },
  dowIcon: {
    width: scale(8),
    height: scale(7),
    resizeMode: "contain",
  },
  breakIcon: {
    width: scale(15),
    height: scale(14),
    // resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 3,
  },
  lunchIcon: {
    width: scale(15),
    height: scale(12),
    // resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 3,
  },
  textCalendar: {
    color: COLORS.lightWhite,
    fontSize: 13,
  },
  trainerText: {
    marginRight: 15,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_MEDIUM,
    alignSelf: "center",
  },
  headerClick: {
    width: scale(80),
    height: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "flex-start",
  },
});

export default styles;
