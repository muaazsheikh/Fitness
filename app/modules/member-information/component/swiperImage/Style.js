import { ScaledSheet, scale } from "react-native-size-matters";
import { FONTS } from "../../../workout/constant";
import { COLORS } from "../../../home/constant";

const styles = ScaledSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    width: "70%",
    // Adjust the font family as needed
  },
  headerImage: {
    width: 30,
    height: 30,
    alignSelf: "flex-end",
  },
  multipleImagePhoto: {
    height: 280,
    width: "100%",
    marginTop: 15,
  },
  mainImage: {
    width: "100%",
    height: 280,
    marginTop: 15,
  },
  slide: {
    // flex: 0.9,
  },
  containerUser: {
    width: scale(330),
    backgroundColor: COLORS.gray1,
    paddingVertical: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignSelf: "center",
  },
  img: { width: 60, height: 60, alignSelf: "center" },
  userTextStyle: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
  },
  userText: {
    fontSize: 20,
    fontFamily: FONTS.ARCHI_BOLD,
    color: COLORS.white,
    alignSelf: "center",
  },
  largeTextStyle: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
    marginTop: 8,
  },
  informationImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  informationTextStyle: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
  },
  row: { flexDirection: "row", gap: 5 },
  containerUser: {
    width: scale(330),
    backgroundColor: COLORS.gray1,
    paddingVertical: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignSelf: "center",
  },
  userImg: {
    width: 20,
    height: 20,
    borderRadius: 25,
    alignSelf: "center",
  },
});
export default styles;
