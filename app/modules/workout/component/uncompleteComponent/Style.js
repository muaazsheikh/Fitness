import {
  ScaledSheet,
  verticalScale,
  scale,
  moderateScale,
} from "react-native-size-matters";

import { COLORS, FONTS } from "../../constant";

const styles = ScaledSheet.create({
  userHeader: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    height: 100,
    alignSelf: "center",
    flex: 1, // Adjust as needed
    alignSelf: "flex-start",
    backgroundColor: COLORS.red,
    width: scale(300),
    marginLeft: 20,
  },
  userIcon: {
    height: scale(30),
    width: scale(30),
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },
  userTextStyle: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
  },
  colorText: {
    color: COLORS.themGreen,
    fontSize: 25,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
    marginTop: 10,
  },
  requestTextStyle: {
    color: COLORS.white,
    fontSize: 19,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  requestTextView: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 30,
  },
  smallIcon: {
    width: scale(12),
    height: scale(11),
    resizeMode: "contain",
  },
  smallTextStyle: {
    color: COLORS.white,
    fontSize: 13,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  largeTextStyle: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
    marginTop: 10,
  },
  sessionIcon: {
    width: scale(15),
    height: scale(11),
    resizeMode: "contain",
  },
  verticalLine: {
    borderRightWidth: 0.7,
    borderRightColor: COLORS.lightWhite,
    height: scale(35),
    alignSelf: "center",
  },
  card: {
    width: scale(335),

    backgroundColor: COLORS.calendarColor,
    alignSelf: "center",
    alignItems: "flex-start",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },
  cardView: { marginLeft: 10, flex: 1 },
  setList: { marginBottom: 100, marginTop: 1 },
  listView: {
    flexDirection: "row",
    width: scale(300),
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  arrowIcon: {
    width: 10,
    height: 18,
  },
  arrowDowIcon: {
    width: 10,
    height: 6,
  },
  exerciseText: {
    color: COLORS.themGreen,
    fontSize: 20,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  totalText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_MEDIUM,
    marginTop: 10,
  },
  backText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.ARCHI_MEDIUM,
  },
  pullText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_MEDIUM,
    marginLeft: 40,
  },
  horizontalLine: {
    borderWidth: 0.7,
    borderColor: COLORS.gray,
    marginVertical: scale(15),
    width: scale(300),
  },
});

export default styles;
