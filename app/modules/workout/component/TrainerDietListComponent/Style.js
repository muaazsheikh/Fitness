import { ScaledSheet, scale } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../home/constant";

const styles = ScaledSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
  },
  dietImg: {
    width: scale(320),
    height: scale(230),
    alignSelf: "center",
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
    width: scale(14),
    height: scale(14),
    resizeMode: "contain",
  },
  dowIcon: {
    width: scale(8),
    height: scale(7),
    resizeMode: "contain",
  },
  breakIcon: {
    width: scale(16),
    height: scale(15),
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
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  trainerText: {
    marginRight: 15,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_MEDIUM,
    alignSelf: "center",
  },
  headerClick: {
    width: scale(70),
    height: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
    marginLeft: scale(50),
  },
  nutrientIcon: {
    width: 14,
    height: 14,
    alignSelf: "center",
  },
  nutrientIconLarge: {
    width: 21,
    height: 21,
    resizeMode:'contain'
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
  gap: { flexDirection: "row", gap: 10, marginTop: 10 },
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
  userIcon: {
    height: scale(30),
    width: scale(30),
    resizeMode: "contain",
    alignSelf: "center",
    // marginBottom: 10,
  },
  userText: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
    marginLeft: 10,
  },
  horizontalLine: {
    borderWidth: 0.7,
    borderColor: COLORS.gray,
    marginVertical: scale(15),
    width: "90%",
    alignSelf: "center",
  },
  trainerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: scale(330),
    alignSelf: "center",
  },
  row: { flexDirection: "row" },
  trainerDiet: { flexDirection: "row", justifyContent: "space-around" },
});

export default styles;
