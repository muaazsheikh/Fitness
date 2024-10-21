import { ScaledSheet, scale, verticalScale } from "react-native-size-matters";
import { COLORS, FONTS } from "../../home/constant";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.themeGray,
    marginBottom: scale(80),
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  headerView: {
    width: scale(280),
    height: 60,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginVertical: 10,
  },
  iconMember: { width: 18, height: 18, alignSelf: "center" },
  iconExercise: { width: 30, height: 26 },
  totalText: {
    color: COLORS.white,
    fontSize: 18,
    alignSelf: "center",
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  colorText: {
    color: COLORS.themGreen,
    fontSize: 24,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    flexDirection: "row",
  },
  kgText: {
    fontFamily: FONTS.ARCHI_BOLD,
    fontSize: 24,
    color: COLORS.white,
    alignSelf: "center",
  },
  smallText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.ARCHI_MEDIUM,
  },
  exerciseView: {
    width: 112,
    height: 112,
    borderRadius: 10,
    backgroundColor: COLORS.gray,
    justifyContent: "center",
    gap: 5,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    gap: 10,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    marginTop: scale(5),
    marginBottom:50,
    gap:5,
    flex: 1,
    marginBottom:30,
    marginRight:20
  },
  tabView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: scale(320),
    alignSelf: "center",
  },
  tabButtonView: {
    width: "47%",
    paddingVertical: 10,
    backgroundColor: COLORS.themGreen,
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  tabButtonText: {
    color: COLORS.themeGray,
    fontSize: 16,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  headerClick: {
    width: scale(80),
    height: 40,
    backgroundColor: COLORS.gray1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: verticalScale(8),
  },
  smallIcon: {
    width: scale(12),
    height: scale(12),
    resizeMode: "contain",
  },
  textCalendar: {
    color: COLORS.lightWhite,
    fontSize: 13,
  },
});

export default styles;
