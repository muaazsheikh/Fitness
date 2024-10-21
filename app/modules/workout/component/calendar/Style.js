import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constant/theme";
import { scale, moderateScale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textReserve: {
    color: COLORS.white,
    fontSize: 24,
    fontFamily: FONTS.ARCHI_BOLD,
    marginTop: 20,
    marginLeft: 10,
  },
  timeButton: {
    width: scale(100),
    height: verticalScale(25),
    backgroundColor: COLORS.gray1,
    margin: scale(8),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(100),
    marginTop: verticalScale(10),
  },
  timeText: {
    fontSize: scale(12),
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },

  timeAvailableView: {
    marginVertical: verticalScale(15),
    alignSelf: "center",
    height: scale(200),
  },

  traineView: {
    marginTop: 5,
  },
  searchView: {
    marginVertical: verticalScale(5),
    paddingHorizontal: scale(15),
    padding: moderateScale(9),
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    width: scale(320),
    backgroundColor: COLORS.black,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: scale(19),
  },

  userList: {
    padding: scale(6),
    marginTop: verticalScale(10),
    flexDirection: "row",
    alignSelf: "center",
    width: scale(320),
    backgroundColor: COLORS.gray,
    borderRadius: scale(8),
  },

  textView: {
    width: scale(200),
    flexDirection: "row",
  },

  imageView: {
    width: scale(50),
    alignItems: "center",
  },

  sessionText: {
    color: COLORS.white,
    fontSize: scale(15),
    marginLeft: scale(5),
    fontWeight: "400",
  },

  nameText: {
    color: COLORS.white,
    fontSize: scale(15),
  },
  userNameText: {
    color: COLORS.white,
    fontSize: scale(12),
    textAlign: "center",
  },

  imageSmall: {
    height: verticalScale(15),
    width: scale(15),
    resizeMode: "contain",
  },

  searchHeading: {
    color: COLORS.white,
    marginLeft: 25,
    fontSize: 22,
    fontFamily: FONTS.ARCHI_BOLD,
    marginBottom: 10,
    marginTop: 20,
  },
  userIcon: {
    height: verticalScale(30),
    width: scale(30),
    resizeMode: "contain",
  },
  calendarTheme: {
    backgroundColor: COLORS.lightBlack,
    calendarBackground: COLORS.lightBlack,
    todayTextColor: COLORS.themGreen,
    dayTextColor: COLORS.white,
    textDisabledColor: "gray",
    monthTextColor: COLORS.white,
    arrowColor: COLORS.white,
    textDayFontWeight: "bold",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "bold",
    textDayFontSize: 14, //date
    textMonthFontSize: 16,
    selectedDayTextColor: COLORS.yellow,
    textDayHeaderFontSize: 13,
    selectedDayBackgroundColor: COLORS.themGreen,
    textSectionTitleColor: COLORS.white,
  },
  renderTextInput: {
    marginLeft: scale(10),
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_BOLD,
    width: scale(200),
  },
  recentSearchView: {
    marginHorizontal: scale(9),
    marginTop: verticalScale(5),
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  flatlistContainer: {
    justifyContent: "center",
    alignSelf: "center",
  },
  recentHeadingText: {
    color: COLORS.white,
    marginLeft: 20,
    fontSize: 22,
    marginTop: scale(6),
    fontFamily: FONTS.ARCHI_BOLD,
    marginBottom: 10,
  },
  calendarContainer: {
    backgroundColor: COLORS.lightBlack,
    margin: 15,
    borderRadius: 10,
    paddingVertical: 0,
  },
  availableText: {
    color: COLORS.white,
    marginLeft: 0,
    fontFamily: FONTS.ARCHI_BOLD,
    fontSize: 17,
    marginBottom: 5,
    alignSelf: "center",
  },
  arrowImg: {
    width: 18,
    height: 18,
    alignSelf: "center",
  },
  arrowView: {
    width: 23,
    height: 23,
    backgroundColor: COLORS.gray,
    justifyContent: "center",
    borderRadius: 100,
  },
  horizontalLine: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginVertical: scale(8),
    // marginLeft: scale(10),
    width: scale(300),
    alignSelf: "center",
  },
});

export default styles;
