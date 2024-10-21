import {
  ScaledSheet,
  verticalScale,
  scale,
  moderateScale,
} from "react-native-size-matters";
import { COLORS, FONTS } from "../../constant";

const styles = ScaledSheet.create({
  crossIconView: {
    width: scale(15),
    padding: scale(6),
    position: "absolute",
    top: 10,
    right: 10,
    alignItems: "flex-end",
    zIndex: 1,
  },
  crossImage: {
    width: scale(12),
    height: scale(11),
    resizeMode: "contain",
  },
  setContainer: {
    width: scale(335),
    // height: scale(600),
    backgroundColor: COLORS.lightBlack,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "flex-start",
    // padding: 20,
    marginTop: 20,
    borderRadius: 10,
    flex: 1,
    paddingVertical: 10,
  },
  setView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 30,
    marginRight: 30,
  },
  setTextView: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.gray,
    borderRadius: 45,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  setText: {
    fontSize: 20,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
  },
  setSmallText: {
    fontSize: 12,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_MEDIUM,
    alignSelf: "center",
  },
  kgView: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.gray,
    borderRadius: 15,
    justifyContent: "center",
  },
  kgText: {
    fontSize: 35,
    color: COLORS.themGreen,
    alignSelf: "center",
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  kgSmallText: {
    fontSize: 16,
    color: COLORS.white,
    alignSelf: "center",
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  buttonView: {
    flexDirection: "row",
    padding: 30,
    marginRight: 30,
    gap:20
  },
  upload: {
    width: scale(30),
    height: scale(22),
  },
  uploadText: {
    color: COLORS.white,
    flexSize: 16,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  uploadView: {
    flexDirection: "row",
    width: scale(53),
    height: scale(45),
    backgroundColor: COLORS.calendarColor,
    borderRadius: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 15,
  },
  image: {
    width: 60,
    height: 60,
  },
  videoText: {
    fontSize: 14,
    fontFamily: FONTS.ARCHI_MEDIUM,
    color: COLORS.lightWhite,
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default styles;
