import {
  ScaledSheet,
  verticalScale,
  scale,
  moderateScale,
} from "react-native-size-matters";

import { COLORS, FONTS } from "../../constant";

const styles = ScaledSheet.create({
  horizontalLine: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginVertical: scale(8),
    width: scale(300),
    alignSelf: "center",
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 10,
  },
  starImageStyle: {
    width: 20,
    height: 20,
    marginLeft: 5,
    alignSelf: "center",
  },
  textStyle: {
    width: '90%',
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
    // marginVertical: 15,
    color: COLORS.white,
    alignSelf: "center",
    alignSelf:'center'
  },
  requestTextStyle: {
    color: COLORS.white,
    fontSize: 19,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  userTextStyle: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
  },
  reservTextHead: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    marginLeft: scale(6),
  },
  requestTextView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    // backgroundColor:'red'
  },
  smallIcon: {
    width: 17,
    height: 17,
    resizeMode: "contain",
  },
  smallTextStyle: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    width: 160,
    height: 40,
  },
  largeTextStyle: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
    marginTop: 10,
  },
});

export default styles;
