import { ScaledSheet, scale } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../../home/constant";

const styles = ScaledSheet.create({
  container: {},
  textHeader: {
    fontSize: 17,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
    textAlign:'center'
  },
  textSubheader: {
    fontSize: 14,
    color: COLORS.lightWhite,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: "row",
    width: scale(230),
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  nutrientInfo: {
    flexDirection: "row",
    gap: 10,
  },
  nutrientIcon: {
    width: 21,
    height: 21,
  },
  nutrientText: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    borderRadius: 10,
  },
  star: {
    width: 20,
    height: 20,
    marginLeft: 10,
    alignSelf: "center",
  },
  edit_icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },
  textStyle: {
    borderColor: "gray",
    marginTop: 5,
    borderRadius: 10,
    marginBottom: 0,
    height: 85,
    color: COLORS.white,
  },
  textContainer: {
    flexDirection: "row",
    borderWidth: 0.7,
    width: scale(310),
    height: 90,
    borderColor: COLORS.borderColor,
    marginTop: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
});

export default styles;
