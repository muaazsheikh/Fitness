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
    height: 90,
    position: "absolute",
    top: 0, // Adjust this value to position it at the top
    left: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: 5,
    flex: 1, // Adjust as needed
    alignSelf: "flex-start",
    backgroundColor: COLORS.transparent,
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
  userHeaderList: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    height: 100,
    paddingHorizontal: 5,
    alignSelf: "flex-start",
    justifyContent: "space-between",
    width: scale(300),
  },
});

export default styles;
