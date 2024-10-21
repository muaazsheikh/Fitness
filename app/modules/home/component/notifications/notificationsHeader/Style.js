import {
  scale,
  ScaledSheet,
} from "react-native-size-matters";
import { COLORS } from "../../../constant";

const styles = ScaledSheet.create({
  headerView: {
    flexDirection: "row",
    width: '96%',
    alignSelf:'center',
    marginVertical: scale(10),
    justifyContent:'space-between'
  },
  drowerIcon: {
    height: scale(19),
    width: scale(19),
    resizeMode: "contain",
    
  },
  headingText: {
    color: COLORS.white,
    fontSize: scale(17),
    fontWeight: "bold",
    marginLeft: scale(15),
  },
  imageBack: {
    height: scale(24),
    width: scale(24),
    resizeMode: "contain",
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
