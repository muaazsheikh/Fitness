import { ScaledSheet } from "react-native-size-matters";
import { COLORS } from "../../../home/constant";
const styles = ScaledSheet.create({
  container: {
    ...ScaledSheet.absoluteFillObject,
    backgroundColor: COLORS.black,
    flex: 1,
    justifyContent: "center",
  },
  textInputContainer: {
    justifyContent: "flex-end",
    flex: 1,
    marginBottom: 10,
  },
  imageContent: {
    justifyContent: "space-around",
    alignSelf: "center",
    alignItems: "center",
    flex: 3,
  },
  image: { width: 280, height: 180 },
});

export default styles;
