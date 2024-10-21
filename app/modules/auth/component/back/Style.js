import { scale, ScaledSheet } from "react-native-size-matters";
import { COLORS,FONTS } from "../../../home/constant";

const styles = ScaledSheet.create({
  headerContainer: {
    marginTop: scale(10),
    alignSelf:'flex-start',
  },
  logoImg: {
    width: scale(30),
    height: scale(30),
  },

});

export default styles;
