import {
  ScaledSheet,
  verticalScale,
  scale,
  moderateScale,
} from "react-native-size-matters";

import { COLORS, FONTS } from "../../constant";

const styles = ScaledSheet.create({
  container: {
    paddingVertical: 10,
  },
  itemContainer: {
    width: 54,
    height: 54,
    marginHorizontal: 0,
    borderRadius: 8,
    // overflow: 'hidden',
    borderWidth: 2,
    zIndex: 1,
    marginLeft: 5,
  },
  image: {
    flex: 1,
    width: 54,
    height: 54,
    resizeMode: "contain",
    // margin: 10,
    alignSelf: "center",
  },
  ImageView: {
    width: scale(18),
    height: scale(18),
    // paddingVertical: scale(1),
    borderRadius: scale(8),
    // alignSelf: "flex-end",
    // alignItems: "center",
    position: "absolute",
    top: -10,
    left: 37,
    justifyContent: "center",
    zIndex: 2,
  },
});

export default styles;
