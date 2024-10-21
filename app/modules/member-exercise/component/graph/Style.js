import { ScaledSheet } from "react-native-size-matters";

import { FONTS } from "../../../workout/constant";
import { COLORS } from "../../../home/constant";
const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    margin: 16,
  },
  chartContainer: {
    flexDirection: "row",
    height: 200,
  },
  markerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  markerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgb(134, 65, 244)",
    marginLeft: 5,
  },
});
export default styles;
