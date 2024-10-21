import {
  ScaledSheet,
  verticalScale,
  scale,
  moderateScale,
} from "react-native-size-matters";

import { COLORS, FONTS } from "../../constant";

const styles = ScaledSheet.create({
  container: {
    backgroundColor: COLORS.gray1,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  item: {
    width: 39,
    height: 39,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  setText: {
    fontSize: 22,
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
    // width: 40,
    backgroundColor: COLORS.gray,
    borderRadius: 15,
    justifyContent: "center",
  },
  kgText: {
    fontSize: 30,
    color: COLORS.white,
    alignSelf: "center",
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  kgSmallText: {
    fontSize: 16,
    color: COLORS.white,
    alignSelf: "center",
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  verticalLine: {
    borderRightWidth: 0.7,
    borderRightColor: COLORS.lightWhite,
    marginHorizontal: scale(8),
    height: scale(20),
    alignSelf: "center",
  },
  countText: {
    color: COLORS.white,
    fontSize: 10,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    textAlign: "center",
  },
  mainConatiner: {
    backgroundColor: COLORS.gray1,
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  listConatiner: { alignSelf: "flex-start", marginTop: 10, marginBottom: 10 },
  smallText: {
    fontSize: 16,
    fontFamily: FONTS.ARCHI_MEDIUM,
    color: COLORS.white,
    flexDirection: "row",
  },
  noteImg: { width: 15, height: 15, marginRight: 10, resizeMode: "contain" },
  bottomCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  centerImg: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(10),
  },
  setList: { marginBottom: 0, marginTop: 0 },
  horizontalLine: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginVertical: scale(8),
    width: scale(300),
    alignSelf: "center",
  },
  editText: { color: COLORS.themGreen, fontSize: 10, marginLeft: 20 },
  slide: {},
});

export default styles;
