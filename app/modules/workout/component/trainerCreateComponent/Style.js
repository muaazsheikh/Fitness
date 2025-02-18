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
    width: "95%",
    borderWidth: 0.7,
    backgroundColor: COLORS.calendarColor,
    alignSelf: "center",
    alignItems: "flex-start",
    borderRadius: 10,
    padding: 10,
  },
  cardView: { flex: 1 },
  setList: { marginBottom: 10, marginTop: 1 },
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
  ImageView: {
    width: scale(15),
    height: scale(15),
    // paddingVertical: scale(1),
    borderRadius: scale(8),
    backgroundColor: COLORS.Lightred,
    alignSelf: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: -7,
    left: 25,
    justifyContent: "center",
  },
  countText: {
    color: COLORS.white,
    fontSize: 10,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    textAlign: "center",
  },
  imageContainer: {
    // Additional styles for views with images
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 5,
  },
  item: {
    width: 39,
    height: 39,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
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
  imageNotes: {
    width: 15,
    height: 20,
  },
  memberText: {
    color: COLORS.themGreen,
    fontSize: 16,
    fontFamily: FONTS.ARCHI_BOLD,
    marginLeft: 10,
    width: scale(290),
  },
});

export default styles;
