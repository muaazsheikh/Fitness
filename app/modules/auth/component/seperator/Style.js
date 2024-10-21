import { scale, ScaledSheet } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../home/constant";

const styles = ScaledSheet.create({
  seperatorContainer: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: scale(30),
    marginBottom: scale(30),
    alignSelf: "center",
    // paddingHorizontal:scale(10)
  },
  sepView: {
    borderWidth: 0.465,
    borderColor: COLORS.gray,
    width: scale(120),
  },
  sepText: {
    color: COLORS.lightWhite,
    fontFamily: FONTS.ARCHI_MEDIUM,

    marginLeft: scale(10),
    marginRight: scale(10),
  },
});

export default styles;
