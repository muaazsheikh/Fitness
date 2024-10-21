import { COLORS, FONTS } from "../../constant/theme";
import { scale, ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.themeGray,
  },
  content: {
    flexDirection: "row",
    marginTop: scale(10),
    borderColor: COLORS.calendarColor,
  },
  hourContainer: {
    width: scale(44),
    height: scale(40),
  },
  hourText: {
    fontSize: 12,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_BOLD,
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  eventContainer: {
    borderTopWidth: 0.5,
    height: scale(40),
    marginTop: 0,
    alignItems: "flex-start",
    borderRightWidth: 0.5,
    borderColor: COLORS.borderColor,
  },
  eventWrapper: {
    alignItems: "center",
    width: scale(42),
    height: 30,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 1,
  },
  eventText: {
    color: COLORS.black,
    fontFamily: FONTS.ARCHI_BOLD,
    fontSize: 10,
    marginLeft: 2,
    marginTop: 2,
  },
  hourColumn: {
    width: scale(44),
    flexDirection: "column",
    borderColor: COLORS.calendarColor,
    marginTop: scale(8),
    justifyContent: "flex-end",
    alignContent: "flex-end",
  },
  hourText: {
    fontSize: 12,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_REGULAR,
    marginLeft: 10,
  },
  dayItem: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: scale(20),
    borderRadius: scale(8),
    width: scale(44),
    height: scale(40),
  },
  dateText: {
    fontSize: 11,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_REGULAR,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    backgroundColor: COLORS.headerColor,
    width: "100%",
    flexDirection: "row",
    zIndex: 2,
    paddingHorizontal: 20,
    padding: 10,
  },
  weekHeader: {
    flexDirection: "row",
    paddingHorizontal: scale(10),
    marginTop: scale(10),
    marginBottom: scale(1),
    // backgroundColor:'red',
    marginLeft: scale(30),
  },
  weekHeaderText: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_BOLD,
    textAlign: "center",
    borderRadius: 100,
    alignSelf: "center",
  },
  weekItem: {
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: scale(20),
    borderRadius: scale(8),
    width: scale(44),
    height: 33,
    marginBottom: scale(10),
    marginTop: scale(10),

    // backgroundColor:'pink'
  },
  weekHeaderView: {
    width: 33,
    height: 30,
    textAlign: "center",
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  weekContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.themeGray,
    marginBottom: scale(90),
  },
});

export default styles;
