import {
  ScaledSheet,
  moderateScale,
  scale,
  verticalScale,
} from "react-native-size-matters";

const { COLORS, FONTS } = require("../../constant");
const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: moderateScale(16),
    color: "blue",
  },
  monthYear: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: COLORS.black,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.calendarColor,
    height: scale(105),
    alignContent: "flex-start",
  },
  dayText: {
    fontSize: moderateScale(14),
    color: COLORS.white,
    position: "absolute",
    top: verticalScale(4),
  },
  dayOfWeek: {
    fontWeight: "bold",
    color: COLORS.white,
  },
  nextMonth: {
    color: COLORS.calendarColor,
  },
  weekNameCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  weekNameRow: {
    width: "14.28%",
    height: scale(55),
    justifyContent: "space-evenly",
    borderWidth: 0.5,
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.calendarColor,

    borderTopWidth: 0,
  },
  weekNameText: {
    fontWeight: "700",
    fontSize: scale(13),
    color: COLORS.borderColor,
    textAlign: "center",
  },
  taskText: {
    fontSize: scale(12),
  },
  taskView: {
    flexDirection: "row",
    marginHorizontal: scale(6),
    borderRadius: scale(4),
    paddingVertical: scale(2),
    // width: scale(45),
    // height: scale(20),
    alignItems: "center",
    backgroundColor: COLORS.calendarColor,
  },
  taskImage: {
    height: 22,
    width: 26,
    resizeMode: "contain",
    marginHorizontal: moderateScale(0),
  },
  viewContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },

  // ------ calender screen style ----
  containerCalender: {
    paddingHorizontal: verticalScale(2),
    flex: 1,
    backgroundColor: COLORS.headerColor,
  },
  addYellowview: {
    backgroundColor: COLORS.themGreen,
    width: scale(45),
    position: "absolute",
    bottom: 20,
    right: 8,
    height: verticalScale(39),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  calenderContainer: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: verticalScale(8),
    backgroundColor: COLORS.calendarColor,
  },
  pluseText: {
    color: "black",
    fontSize: 30,
    fontWeight: "400",
  },

  // ------- model ------
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    width: scale(130),
    position: "absolute",
    bottom: verticalScale(110),
    right: scale(70),
    borderRadius: 9,
    padding: 1,
    alignItems: "center",
  },
  modalView: {
    width: scale(110),
    flexDirection: "row",
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalWorkoutView: {
    width: scale(110),
    flexDirection: "row",
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    elevation: 5,
    backgroundColor: COLORS.calendarColor,
    borderColor: COLORS.themGreen,
    borderWidth: 2,
  },
  modalText: {
    textAlign: "center",
    fontSize: scale(12),
    color: COLORS.black,
    fontWeight: "500",
    marginLeft: verticalScale(4),
  },
  modelIcon: {
    width: scale(15),
    height: verticalScale(15),
    resizeMode: "contain",
  },

  viewModal: {
    width: scale(340),
    alignSelf: "center",
    justifyContent: "center",
    marginTop: scale(160),
    borderRadius: scale(8),
    paddingVertical: scale(30),
    backgroundColor: COLORS.lightBlack,
  },
  crossImage: {
    width: scale(12),
    height: verticalScale(12),
    resizeMode: "contain",
  },

  // -------- Modal ------
  modelViewcontainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  requestTextStyle: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  reservTextHead: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    marginLeft: scale(6),
  },
  userIcon: {
    height: verticalScale(30),
    width: scale(30),
    resizeMode: "contain",
  },
  requestTextView: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  crossIconView: {
    width: scale(15),
    padding: scale(6),
    position: "absolute",
    top: 1,
    right: 5,
    alignItems: "flex-end",
    zIndex: 1,
  },
  RecentlyView: {
    padding: scale(6),
    marginTop: verticalScale(10),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: scale(8),
  },
  reserveIcon: {
    width: scale(23),
    height: verticalScale(23),
    resizeMode: "contain",
  },
  timeText: {
    fontSize: scale(13),
    marginBottom: verticalScale(4),
    color: COLORS.white,
    fontWeight: "600",
  },
  smallIcon: {
    width: scale(12),
    height: verticalScale(12),
    resizeMode: "contain",
  },
  smallTextStyle: {
    color: COLORS.white,
    fontSize: scale(10),
    fontWeight: "500",
  },
  confirmText: {
    fontWeight: "500",
    fontSize: scale(11),
    color: COLORS.black,
  },
  confirmLargeText: {
    color: COLORS.white,
    fontSize: scale(17),
    fontWeight: "600",
    textAlign: "center",
  },
  rejectText: {
    fontSize: scale(11),
    fontWeight: "500",
    color: COLORS.white,
  },
  boxView: {
    alignItems: "center",
    width: scale(72),
    borderRadius: verticalScale(2),
    backgroundColor: COLORS.calendarColor,
    marginLeft: scale(5),
    padding: scale(8),
  },
  confirmStyle: {
    alignItems: "center",
    width: scale(55),
    borderRadius: verticalScale(15),
    marginLeft: scale(5),
    padding: scale(3),
  },
  confirmButton: {
    backgroundColor: COLORS.themGreen,
    alignSelf: "center",
    marginTop: scale(20),
    width: scale(80),
    alignItems: "center",
    borderRadius: scale(15),
    padding: 7,
  },
  cancelButton: {
    alignSelf: "center",
    marginTop: scale(20),
    width: scale(80),
    alignItems: "center",
    padding: 7,
    backgroundColor: COLORS.gray,
    borderWidth: 0.7,
    borderColor: COLORS.white,
    borderRadius: scale(15),
  },

  // --------- Model reject --
  TextReasone: {
    color: COLORS.white,
    fontSize: scale(15),
    fontWeight: "500",
  },
  textSmallReasone: {
    color: COLORS.white,
    fontSize: scale(13),
    fontWeight: "500",
    marginLeft: scale(9),
  },
  radioIcon: {
    width: scale(12),
    height: verticalScale(12),
    resizeMode: "contain",
  },
  searchView: {
    marginVertical: verticalScale(4),
    paddingHorizontal: scale(15),
    padding: moderateScale(8),
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    width: scale(310),
    backgroundColor: COLORS.black,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: scale(19),
  },
  rejectedText: {
    color: COLORS.white,
    fontSize: scale(17),
    fontWeight: "600",
    textAlign: "center",
  },
  reasonRejectContain: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: scale(310),
  },
  // -------- Model cancel -----
  centerModal: {
    marginTop: verticalScale(10),
    width: scale(320),
    alignSelf: "center",
    borderRadius: scale(6),
    padding: verticalScale(6),
  },
  verticalLine: {
    borderRightWidth: 0.7,
    borderRightColor: COLORS.white,
    marginHorizontal: verticalScale(8),
    width: scale(4),
    height: verticalScale(10),
  },
  horizontalLine: {
    borderWidth: 0.7,
    borderColor: COLORS.white,
    marginVertical: scale(8),
    marginLeft: scale(10),
    width: scale(225),
    alignSelf: "center",
  },
  rowView: {
    flexDirection: "row",
    width: 60,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default styles;
