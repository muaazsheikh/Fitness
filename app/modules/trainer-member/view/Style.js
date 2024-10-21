import { ScaledSheet } from "react-native-size-matters";
import { COLORS, FONTS } from "../../home/constant";

const styles = ScaledSheet.create({
  newAccountContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.themeGray,
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  itemIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 5,
    tintColor: COLORS.themGreen,
  },
  memberVeiw: {
    flexDirection: "row",
    marginVertical: 15,
    gap: 10,
    marginHorizontal: 12,
  },
  memberText: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_BOLD,
    alignSelf: "center",
  },
  headerTrainer: { flexDirection: "row" },
  img: { width: 38, height: 38 },
});

export default styles;
