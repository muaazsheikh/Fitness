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
    width: scale(350),
    alignSelf: "center",
    marginVertical: scale(10),
    height: 25,
  },
  drowerIcon: {
    height: scale(19),
    width: scale(19),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 2,
  },
  headingText: {
    width: scale(185),
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: scale(15),
    alignSelf: "center",
  },
  imageBack: {
    height: scale(24),
    width: scale(28),
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
    left: 20,
  },
  countText: {
    color: COLORS.white,
    fontSize: scale(12),
    fontWeight: "500",
    textAlign: "center",
  },
  notiView: {
    width: scale(10),
    height: scale(10),
    paddingVertical: scale(0),
    borderRadius: scale(8),
    backgroundColor: COLORS.red,
    alignSelf: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: -5,
    left: 18,
  },
});

export default styles;
