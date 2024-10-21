import { scale, ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: scale(200),
    alignSelf:'center'
  },
  loginImage: { width: 46, height: 46 },
  appleImageStyle: {
    width: 30,
    height: 38,
    marginLeft: 12,
  },
  kakaoImageStyle: {
    width: 56,
    height: 56,
    marginLeft: 12,
  },
});

export default styles;
