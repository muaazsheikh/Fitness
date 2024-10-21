import {
  ScaledSheet,
  verticalScale,
  scale,
  moderateScale,
} from "react-native-size-matters";

import { COLORS } from "../../../constant";
const styles = ScaledSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.8)',
  },
  modalContent: {
    backgroundColor: COLORS.themeGray,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: scale(330),
    marginTop:scale(200)

  },
  modalImage: {
    width: scale(70),
    height: scale(70),
  },
  modalText: {
    // width: scale(210),
    fontSize: 20,
    textAlign: "center",
    fontWeight: "800",
    marginTop: 10,
    color: COLORS.white,
  },
  starImageStyle: {
    width: 30,
    height: 30,
    marginLeft: 10,
    alignSelf: "center",
    // resizeMode: 'cover',
  },
  textStyle: {
    width: 325,
    height: 90,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
    marginBottom: 20,
    color: COLORS.white,
  },
  smallContainer: {
    width: 250,
    height: 60,
    backgroundColor: COLORS.calendarColor,
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "row",
  },
});

export default styles;
