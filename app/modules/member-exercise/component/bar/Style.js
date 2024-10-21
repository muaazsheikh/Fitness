import { ScaledSheet, scale } from "react-native-size-matters";

import { COLORS, FONTS } from "../../../home/constant";

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
    width: scale(330),
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  slider: {
    width: "80%",
    zIndex: 1,
  },
  buttonContainer: {
    justifyContent: "space-between",
    width: "15%",
    marginTop: 10,
    backgroundColor: COLORS.calendarColor,
    height: 53,
    width: 50,
    alignItems: "center",
    borderRadius: 15,
    marginLeft: 10,
  },
  button: {
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    fontSize: 13,
  },
  labelContainer: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },
  initialText: {
    color: COLORS.borderColor,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    fontSize: 10,
    zIndex: 0,
  },
});

export default styles;
