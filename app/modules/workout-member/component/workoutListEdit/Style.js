import {
  ScaledSheet,
  verticalScale,
  scale,
  moderateScale,
} from "react-native-size-matters";

import { COLORS, FONTS } from "../../constant";

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.gray,
    paddingHorizontal: 0,
    borderRadius: 10,
    // paddingVertical:15
  },
  item: {
    width: 39,
    height: 39,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
  touchableContainer: {
    width: 35,
    height: 85,
    backgroundColor: COLORS.black,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderTopEndRadius: 10,
    borderEndEndRadius: 10,
  },
  setView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 30,
  },
  setTextView: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.gray1,
    borderRadius: 45,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
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
    height: scale(50),
    alignSelf: "center",
  },
  arrowIcon: {
    width: 10,
    height: 18,
  },
  arrowDowIcon: {
    width: 10,
    height: 6,
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
  mainConatiner: {
    backgroundColor: COLORS.gray1,
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    marginTop: 10,
    width: scale(320),
  },
  listConatiner: { alignSelf: "flex-start", marginTop: 10, marginBottom: 10 },
});

export default styles;
