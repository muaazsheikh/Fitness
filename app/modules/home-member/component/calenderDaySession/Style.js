import { COLORS, FONTS } from "../../constant/theme";
import {
  scale,
  moderateScale,
  verticalScale,
  ScaledSheet,
} from "react-native-size-matters";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginBottom: verticalScale(20),
  },
  buttonContainer: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.LightYellow,
    borderEndWidth: moderateScale(1),
    borderColor: COLORS.black,
  },
  buttonContainerActive: {
    backgroundColor: COLORS.lightGray,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    marginVertical: verticalScale(20),
  },
  itemSeparator: {
    height: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  arrowImage: {
    height: verticalScale(15),
    width: scale(19),
    resizeMode: "cover", // or 'contain'
  },
  customStyles: {
    height: verticalScale(60),
    width: scale(90),
    alignSelf: "center",
  },
  headerDatesContainer: {
    flexDirection: "row",
    paddingHorizontal: moderateScale(10),
    marginVertical: verticalScale(10),
  },
  headerDateItem: {
    paddingHorizontal: moderateScale(10),
  },
  headerDateText: {
    color: COLORS.white,
    fontSize: moderateScale(16),
    fontWeight: "300",
  },
  customMoth: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(5),
    justifyContent: "space-between",
    width: scale(300),
    alignSelf: "center",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    backgroundColor: COLORS.headerColor,
    width: "100%",
    flexDirection: "row",
    zIndex: 2,
    flex: 1,
    paddingHorizontal: 20,
    padding: 10,
  },
  dateText: {
    fontSize: 10,
    color: COLORS.themGreen,
    alignSelf: "flex-start",
    marginLeft: 5,
    fontFamily: FONTS.ARCHI_BOLD,
  },
  dayView: {
    height: 25,
    width: 25,
    borderRadius: 8,
    backgroundColor: COLORS.themGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  todayView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 50,
  },
  todayText: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_BOLD,
    marginRight: 50,
    marginTop: 10,
  },

  //NEW STYLE
  container: {
    flex: 1,
    backgroundColor: COLORS.themeGray,
  },
  content: {
    flexDirection: "row",
    marginTop: scale(10),
    borderColor: COLORS.calendarColor,
    marginBottom: scale(50),
  },
  hourContainer: {
    width: 60,
    height: 60,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  hourText: {
    fontSize: 12,
    width: 40,
    marginLeft: 20,
    color: COLORS.white,
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  eventContainer: {
    borderTopWidth: 0.5,
    height: scale(50),
    width: scale(325),
    marginTop: 0,
    borderColor: COLORS.borderColor,
    alignSelf: "center",
    alignItems: "flex-start",
  },
  eventWrapper: {
    flexDirection: "row", // Adjust as needed
    alignItems: "center", // Adjust as needed
    padding: 10,
    backgroundColor: COLORS.Lightred,
    borderRadius: 6,
    marginLeft: 15,

    //  width:scale(200)
  },

  eventText: {
    // color: "pink",
  },
});

export default styles;
