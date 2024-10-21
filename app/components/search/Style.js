import {
  ScaledSheet,
  verticalScale,
  scale,
  moderateScale,
} from "react-native-size-matters";
import { COLORS, FONTS } from "../../modules/home/constant";

const styles = ScaledSheet.create({
  searchView: {
    marginVertical: verticalScale(0),
    paddingHorizontal: scale(15),
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    width: scale(320),
    backgroundColor: COLORS.black,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: scale(19),
  },
  searchHeading: {
    color: COLORS.white,
    marginLeft: 25,
    fontSize: 22,
    fontFamily: FONTS.ARCHI_BOLD,
    marginBottom: 20,
    marginTop: 20,
  },
  traineView: {
    marginTop: 5,
  },
  imageSmall: {
    height: verticalScale(15),
    width: scale(15),
    resizeMode: "contain",
  },
  renderTextInput: {
    marginLeft: scale(10),
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_BOLD,
    width: '90%',
    lineHeight:20,
    height:35
  },
});

export default styles;
