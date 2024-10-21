import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";

import { COLORS, FONTS } from "../../modules/workout/constant";

const styles = ScaledSheet.create({
  seperatorContainer: {
    // flexDirection: "row",
    width: "95%",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: scale(30),
    marginBottom: scale(30),
    // paddingHorizontal:scale(10)
  },
  sepView: {
    justifyContent: "center",
  },
  sepText: {
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    marginTop: scale(40),
    fontSize: 20,
    width: "100%",
  },
  sepSubText: {
    color: COLORS.lightWhite,
    fontFamily: FONTS.ARCHI_MEDIUM,
    alignSelf: "center",
    marginTop: scale(10),
    width: "100%",
  },
  sepImg: {
    width: scale(250),
    height: scale(85),
    marginTop: verticalScale(100),
  },
});

export default styles;
