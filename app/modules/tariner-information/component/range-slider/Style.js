import { ScaledSheet } from "react-native-size-matters";

import { FONTS } from "../../../workout/constant";
import { COLORS } from "../../../home/constant";
const styles = ScaledSheet.create({
  container: {
    marginVertical: 20,
  },
  slider: {
    width: "100%",
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 12,
    color: "#888",
  },
});
export default styles;
