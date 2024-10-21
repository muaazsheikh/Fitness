import {
  ScaledSheet,
  verticalScale,
  scale,
  moderateScale,
} from "react-native-size-matters";

import { COLORS, FONTS } from "../../constant";

const styles = ScaledSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
    width: scale(330),
    height: 78,
    backgroundColor: COLORS.gray,
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  text: {
    flex: 1,
    marginRight: 16,
    fontSize: 16,
    fontFamily: FONTS.ARCHI_BOLD,
    color: COLORS.white,
  },
  flexedImage: {
    width: 15,
    height: 10,
  },
  smallImg: {
    width: scale(18),
    height: scale(18),
    paddingVertical: verticalScale(1),
    backgroundColor: COLORS.lightBlack,
    alignSelf: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: -8,
    left: 40,
    zIndex: 1,
    justifyContent: "center",
    borderRadius: 5,
  },
  ImageView: {
    width: scale(10),
    height: scale(10),
    paddingVertical: verticalScale(1),
    alignItems: "center",
    position: "absolute",
    top: 4,
    left: 5,
    zIndex: 2,
    alignSelf: "center",
  },
  imgView: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.themGreen,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBack: {
    height: scale(24),
    width: scale(28),
    resizeMode: "contain",
    // borderRadius:verticalScale(30),
    marginHorizontal: scale(6),
  },
  ImageView: {
    width: scale(17),
    paddingVertical: scale(1),
    borderRadius: scale(8),
    backgroundColor: COLORS.red,
    alignSelf: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: -10,
    left: 20,
  },
  countText: {
    color: COLORS.white,
    fontSize: scale(12),
    fontWeight: "500",
    textAlign: "center",
  },
  sessionIcon: { width: 20, height: 15, marginLeft: 10, marginRight: 10 },
});

export default styles;
