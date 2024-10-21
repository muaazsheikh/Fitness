import {
  scale,
  ScaledSheet,
  verticalScale,
  moderateScale,
} from "react-native-size-matters";
import { COLORS } from "../../constant";

const styles = ScaledSheet.create({
  headerView: {
    flexDirection: "row",
    width: scale(330),
    alignSelf: "center",
    marginVertical: scale(10),
    height: 20,
    justifyContent: "space-between",
  },
  drowerIcon: {
    height: scale(19),
    width: scale(19),
    resizeMode: "contain",
  },
  headingText: {
    // width: scale(135),
    color: COLORS.white,
    fontSize: scale(17),
    fontWeight: "bold",
    marginLeft: scale(15),
    lineHeight: 20,
  },
  imageBack: {
    height: scale(22),
    width: scale(22),
    resizeMode: "contain",
    // borderRadius:verticalScale(30),
    marginHorizontal: scale(6),
  },
  ImageView: {
    width: scale(17),
    paddingVertical: scale(1),
    borderRadius: scale(8),
    backgroundColor: COLORS.red,
    alignSelf: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: -10,
    left: 30,
  },
  countText: {
    color: COLORS.white,
    fontSize: scale(12),
    fontWeight: "500",
    textAlign: "center",
  },
  notiView: {
    width: scale(8),
    height: scale(8),
    paddingVertical: scale(0),
    borderRadius: scale(8),
    backgroundColor: COLORS.red,
    alignSelf: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: -5,
    left: 15,
  },
});

export default styles;
