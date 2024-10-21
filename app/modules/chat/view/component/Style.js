import { ScaledSheet, scale } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../home/constant";

const styles = ScaledSheet.create({
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    height: 80,
    width: scale(320),
    // backgroundColor: COLORS.calendarColor,
    marginTop: 0,
    borderRadius: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  trainerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sessionInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    gap: 10,
  },
  profileName: {
    fontSize: 20,
    fontFamily: FONTS.ARCHI_BOLD,
    color: COLORS.white,
  },
  lastMessage: {
    color: COLORS.lightGray,
    marginTop: 5,
  },
  lastMessageTime: {
    color: COLORS.white,
    flex: 1,
    textAlign: "right",
  },
  unreadMessageCount: {
    color: "white",
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  smallTextStyle: {
    color: COLORS.white,
    fontSize: 13,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  largeTextStyle: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
    marginTop: 0,
  },
  sessionIcon: {
    width: scale(15),
    height: scale(11),
    resizeMode: "contain",
    alignSelf: "center",
  },
  unReadView: {
    backgroundColor: "red",
    borderRadius: 10,
    alignSelf: "flex-end",
    marginTop: 5,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
