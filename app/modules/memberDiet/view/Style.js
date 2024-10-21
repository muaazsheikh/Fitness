import { ScaledSheet, scale } from "react-native-size-matters";
import { COLORS, FONTS } from "../../home/constant";

const styles = ScaledSheet.create({
  newAccountContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.themeGray,
    gap: 15,
    marginBottom: scale(70),
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  dietImg: {
    width: scale(320),
    height: scale(230),
  },
  updateImg: {
    width: scale(320),
    height: scale(230),
    backgroundColor: COLORS.gray,
    alignItems: "center",
    gap: 30,
  },
  updateHeader: {
    flex: 1,
    zIndex: 1,
    alignSelf: "flex-start",
    paddingHorizontal: 3,
  },
  addYellowview: {
    backgroundColor: COLORS.themGreen,
    height: scale(45),
    position: "absolute",
    bottom: scale(100),
    right: 28,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    padding: 16,
    gap: 10,
    flex: 1,
  },
  pluseText: {
    color: "black",
    fontSize: 30,
    fontWeight: "400",
  },
  centeredView: {
    width: "100%",
    position: "absolute",
    borderRadius: 9,
    padding: 1,
    alignItems: "flex-end",
    flex: 1,
    zIndex: 1,
    height: "100%",
    alignContent: "flex-end",
    justifyContent: "flex-end",
    bottom: 0,
    // backgroundColor:'pink'
  },
  modalPlusView: { marginBottom: 130, marginRight: 85 },
  modalView: {
    width: scale(160),
    flexDirection: "row",
    borderRadius: 25,
    padding: 5,
    alignItems: "center",
    elevation: 5,
  },
  modalWorkoutView: {
    width: scale(110),
    flexDirection: "row",
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    elevation: 5,
    backgroundColor: COLORS.calendarColor,
    borderColor: COLORS.themGreen,
    borderWidth: 2,
  },
  modalTextUpload: {
    textAlign: "center",
    fontSize: 20,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_BOLD,
    marginLeft: scale(4),
    marginVertical: 10,
  },
  modelIcon: {
    width: scale(17),
    height: scale(17),
    resizeMode: "contain",
    alignSelf: "center",
  },
  changeButton: {
    width: scale(100),
    height: 40,
    backgroundColor: COLORS.themGreen,
    position: "absolute",
    top: 110,
    zIndex: 2,
    alignItems: "center",
    left: 130,
    borderRadius: 100,
    justifyContent: "center",
  },
  selectButton: {
    width: scale(100),
    height: 40,
    backgroundColor: COLORS.themGreen,
    position: "absolute",
    top: 180,
    zIndex: 2,
    alignItems: "center",
    left: 130,
    borderRadius: 100,
    justifyContent: "center",
  },
  upload: {
    width: scale(30),
    height: scale(22),
  },
  uploadText: {
    color: COLORS.white,
    flexSize: 16,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  uploadView: {
    flexDirection: "row",
    width: scale(53),
    height: scale(45),
    backgroundColor: COLORS.calendarColor,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.transparentBlack,
  },
  modalContent: {
    backgroundColor: COLORS.gray1,
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: "center",
    width: scale(330),
  },
  modalImage: {
    width: scale(70),
    height: scale(70),
  },
  modalText: {
    // width: scale(210),
    fontSize: 14,
    textAlign: "center",
    fontFamily: FONTS.ARCHI_SEMBOLD,
    color: COLORS.black,
    alignSelf: "center",
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
    height: 30,
    justifyContent: "center",
    marginVertical: 30,
    borderRadius: 10,
  },
  crossImage: {
    width: scale(10),
    height: scale(10),
    resizeMode: "contain",
  },
  imageHolder: {
    width: scale(17),
    height: scale(17),
    resizeMode: "contain",
  },
  crossIconView: {
    width: scale(15),
    padding: scale(6),
    position: "absolute",
    top: 1,
    right: 5,
    alignItems: "flex-end",
    zIndex: 1,
  },
  doneText: {
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    fontSize: 12,
    marginRight: 45,
  },
  minus: {
    flexShrink: 50,
    fontSize: 20,
  },
});

export default styles;
