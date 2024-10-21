import {
  ScaledSheet,
  moderateScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { COLORS } from "../../../home/constant";

const styles = ScaledSheet.create({
  modelViewcontainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "space-around",
  },
  confirmModal: {
    width: scale(330),
    alignSelf: "center",
    justifyContent: "center",
    marginTop: scale(100),
    borderRadius: scale(8),
    paddingVertical: scale(30),
    backgroundColor: COLORS.lightBlack,
    margin: 10,
    height: scale(280),
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
});

export default styles;
