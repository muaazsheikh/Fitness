import {
  ScaledSheet,
  moderateScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { COLORS } from "../../../../home/constant";
import { FONTS } from "../../../constant";

const styles = ScaledSheet.create({
  modelViewcontainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "space-around",
  },
  confirmModal: {
    width: scale(330),
    alignSelf: "center",
    borderRadius: scale(8),
    padding: scale(10),
    backgroundColor: COLORS.lightBlack,
    margin: 10,
    height: scale(280),
  },
  crossIconView: {
    width: scale(15),
    padding: scale(6),
    position: "absolute",
    top: 10,
    right: 5,
    alignItems: "flex-end",
    zIndex: 1,
  },
  crossImage: {
    width: scale(12),
    height: scale(12),
    resizeMode: "contain",
  },
  requestTextView: {
    flexDirection: "row",
  },
  reserveIcon: {
    width: scale(18),
    height: scale(18),
    resizeMode: "contain",
    tintColor: COLORS.themGreen,
    color: COLORS.themGreen,
  },
  requestTextStyle: {
    color: COLORS.white,
    fontSize: 19,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  horizontalLine: {
    borderWidth: 0.7,
    borderColor: COLORS.gray,
    marginVertical: scale(15),
    width: "100%",
    alignSelf: "center",
  },
  textModal: {
    color: COLORS.white,
    lineHeight: 25,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
});

export default styles;
