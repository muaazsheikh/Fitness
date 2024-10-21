import { ScaledSheet, scale } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../../home/constant";

const styles = ScaledSheet.create({
  container: {
    width: scale(330),
    backgroundColor: COLORS.gray1,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
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
    alignSelf: "center",
    marginBottom: 3,
  },
  lunchIcon: {
    width: scale(15),
    height: scale(12),
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
  nutrientIcon: {
    width: 10,
    height: 10,
    alignSelf: "center",
    resizeMode: "contain",
  },
  nutrientText: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  reviewText: {
    fontSize: 23,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
  },
  starIcon: {
    width: 14,
    height: 13,
    alignSelf: "center",
  },
  nutrientContainer: {
    width: scale(78),
    height: scale(60),
    backgroundColor: COLORS.calendarColor,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
  },
  gap: { flexDirection: "row", gap: 10 },
  shareIcon: {
    width: scale(15),
    height: scale(15),
    // resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 3,
  },

  trainerText: {
    marginRight: 10,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_MEDIUM,
    alignSelf: "center",
  },
  shareView: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  trainerView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    width: scale(125),
  },
});

export default styles;
