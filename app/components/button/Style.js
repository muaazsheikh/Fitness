import { ScaledSheet } from "react-native-size-matters";
import { COLORS } from "../../modules/home/constant";
import { FONTS } from "../../modules/workout/constant";

const styles = ScaledSheet.create({
  button: {
    backgroundColor: COLORS.themGreen,
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    marginHorizontal: 2,
    height: 40,
    paddingHorizontal: 0,
    minWidth: 100,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 13,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  noteImg: {
    width: 20,
    height: 22,
    marginRight: 5,
  },
  secondaryButton: {
    borderColor: COLORS.themGreen,
    padding:1,
    borderRadius: 100,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 0,
    minWidth: 100,

  },
  secondaryButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  editNote: {
    width: 18,
    height: 18,
    marginRight: 5,
    resizeMode:'contain'
  },
});

export default styles;
