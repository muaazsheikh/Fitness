import {
  ScaledSheet,
  moderateScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { FONTS } from "../../workout/constant/theme";
import { COLORS } from "../../home/constant/theme";
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.themeGray,
  },
  headView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(17),
  },
  mainContainer: {
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_BOLD,
  },
  heading: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  headerImage: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  gymView: {
    marginTop: scale(18),
    width: scale(330),
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.lightBlack,
    borderRadius: scale(5),
    alignSelf: "center",
  },
  memberView: {
    width: scale(300),
    marginVertical: 13,
    borderTopColor: COLORS.lightGray,
    borderTopWidth: 0.6,
  },
  smallText: {
    fontSize: 13,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_LIGHT,
  },
  listItemContainer: {
    width: scale(280),
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.lightGray,
  },
  flatView: {
    flex: 1,
    height: moderateScale(160),
  },
  icon: {
    width: 14,
    height: 14,
    resizeMode: "contain",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 13,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_REGULAR,
    marginBottom: 2,
  },
  mediumText: {
    fontSize: 13,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_MEDIUM,
    marginBottom: 2,
  },
  typeText: {
    fontSize: 12.5,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_REGULAR,
  },
  buttonMainView: {
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  buttonPtView: {
    marginTop: verticalScale(15),
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    width: scale(160),
  },
  borderTextView: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: COLORS.lightBlack,
    borderRadius: scale(15),
    borderColor: COLORS.themGreen,
    borderWidth: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  changeButton: {
    width: scale(95),
    alignItems: "center",
    paddingHorizontal: 1,
    paddingVertical: 5,
    backgroundColor: COLORS.lightBlack,
    borderRadius: scale(15),
    borderColor: COLORS.themGreen,
    borderWidth: 0.9,
  },
  ptItemContainer: {
    width: scale(280),
    alignItems: "center",
  },
  dateView: {
    flexDirection: "row",
    width: scale(280),
    alignItems: "center",
    marginVertical: 8,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 15,
  },
  rowViewPT: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    flex: 1,
    width: scale(260),
    gap: 10,
  },
  rowDirectionView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  userIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    marginRight: 10,
  },
  rateIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginRight: 13,
    // tintColor:'#FFFFFF'
  },
  userName: {
    width: scale(90),
    fontSize: 14.5,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: scale(300),
    backgroundColor: COLORS.lightBlack,
    alignSelf: "center",
    padding: "16@ms",
    paddingVertical: scale(20),
    borderRadius: scale(8),
    elevation: 5,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    marginTop: scale(5),
    gap: 10,
  },
  buttonViewNew: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    marginTop: scale(5),
    marginRight: scale(20),
    gap: 10,
  },
  modalDate: {
    fontSize: scale(13),
    fontFamily: FONTS.ARCHI_SEMBOLD,
    color: COLORS.white,
  },
  modalType: {
    fontSize: 13,
    fontFamily: FONTS.ARCHI_MEDIUM,
    color: COLORS.white,
  },
  closeButton: {
    fontSize: scale(11),
    fontFamily: FONTS.ARCHI_SEMBOLD,
    color: COLORS.white,
  },
  btnStyle: {
    paddingHorizontal: scale(13),
    paddingVertical: scale(5),
    borderColor: COLORS.themGreen,
    borderWidth: 1,
    borderRadius: moderateScale(15),
  },
  checkView: {
    width: scale(280),
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    padding: scale(10),
    backgroundColor: COLORS.themeGray,
    borderRadius: moderateScale(6),
    marginVertical: moderateScale(8),
  },
  headingModel: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_BOLD,
    textAlign: "center",
  },
  borderBottomView: {
    marginVertical: verticalScale(10),
    marginBottom: scale(5),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.lightGray,
  },
  checkImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 16,
  },
  crossimg: {
    position: "absolute",
    top: 10,
    right: 0,
    zIndex: 9,
  },
  noteText: {
    fontSize: 13,
    fontFamily: FONTS.ARCHI_MEDIUM,
    color: COLORS.white,
    marginTop: 8,
  },
  searchView: {
    width: scale(270),
    backgroundColor: COLORS.black,
    alignSelf: "center",
    padding: "16@ms",
    paddingVertical: scale(8),
    borderRadius: scale(15),
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    marginTop: scale(5),
    marginBottom: scale(15),
  },
  imagehold: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  listView: {
    flexDirection: "row",
    width: "95%",
    backgroundColor: COLORS.gray1,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignContent: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
  },
  informationImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  informationTextStyle: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
  },
  rightIcon: {
    width: 15,
    height: 15,
    tintColor: COLORS.lightWhite,
    alignSelf: "center",
  },
  itemContainer: {
    marginLeft: 5,
  },
  imagePlace: {
    width: 65,
    height: 65,
  },
  imagePlaceBackground: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.gray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
  imagePlacePT: {
    width: 45,
    height: 45,
    alignItems: "center",
  },
  containerUser: {
    width: scale(330),
    backgroundColor: COLORS.gray1,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center",
  },
  img: { width: 60, height: 60, alignSelf: "center", borderRadius: 999 },
  userTextStyle: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
  },
  userText: {
    fontSize: 20,
    fontFamily: FONTS.ARCHI_BOLD,
    color: COLORS.white,
    alignSelf: "center",
  },
  userHeaderList: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    height: 70,
    alignSelf: "flex-start",
    width: "100%",
    marginTop: 10,
  },
  hashView: {
    width: scale(100),
    backgroundColor: COLORS.themeGray,
    alignSelf: "center",
    paddingVertical: scale(3),
    borderRadius: scale(5),
    marginTop: scale(8),
  },
  requestTextView: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  sessionIcon: {
    width: scale(25),
    height: scale(25),
    resizeMode: "contain",
  },
  largeTextStyle: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
    marginTop: 8,
  },
  verticalLine: {
    borderRightWidth: 0.7,
    borderRightColor: COLORS.lightWhite,
    height: scale(45),
    alignSelf: "center",
    marginTop: 10,
    height: "100%",
  },
  divider: {
    borderRightWidth: 0.7,
    borderRightColor: COLORS.lightWhite,
    height: 20,
    alignSelf: "center",
  },
  horizontalLine: {
    borderWidth: 1,
    opacity: 0.2,
    borderColor: "#FFFFFF",
    width: "100%",
    alignSelf: "center",
    marginTop: scale(15),
  },
  newAccountContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.themeGray,
  },
  hashRowView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: COLORS.themeGray,
    paddingHorizontal: scale(8),
    alignSelf: "center",
    paddingVertical: scale(5),
    borderRadius: scale(10),
    marginTop: scale(8),
  },
  logText: {
    fontSize: 12.5,
    fontFamily: FONTS.ARCHI_REGULAR,
    color: COLORS.white,
  },
  rowViewAndIcon: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: scale(8),
  },
  emailText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_MEDIUM,
  },
  imageList: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 5,
  },
  editView: {
    width: scale(20),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.themGreen,
    height: scale(20),
    alignSelf: "center",
    borderRadius: scale(25),
    position: "absolute",
    top: scale(53),
    right: scale(135),
    zIndex: 1,
  },
  editIcon: {
    width: 14,
    height: 14,
    resizeMode: "contain",
    alignSelf: "center",
  },
  rejectedIcon: {
    width: 8,
    height: 8,
    resizeMode: "contain",
  },
  placeholderStyle: {
    width: scale(330),
    backgroundColor: COLORS.gray1,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginBottom: moderateScale(8),
    alignSelf: "center",
  },
  titleName: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.ARCHI_REGULAR,
    marginLeft: scale(13),
  },
  containerView: {
    marginTop: scale(5),
  },
  AddIconStyle: {
    width: scale(50),
    height: scale(54),
    backgroundColor: COLORS.gray1,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  bottonRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  borderView: {
    width: scale(250),
    justifyContent: "center",
    padding: "16@ms",
    paddingVertical: scale(8),
    borderRadius: scale(8),
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    alignItems: "flex-start",
    marginTop: scale(15),
    marginBottom: scale(5),
  },
  addView: {
    width: scale(40),
    height: scale(24),
    backgroundColor: COLORS.mediumGrey,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  bottonPostion: { alignSelf: "flex-end", marginTop: scale(15) },
  textStyle: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
    marginRight: 43,
    width: scale(200),
  },
  addlistView: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    marginVertical: 15,
    alignSelf: "center",
  },
  textInput: {
    height: 40,
    width: "80%",
    borderWidth: 0.5,
    borderColor: COLORS.borderColor,
    borderRadius: 10,
    color: COLORS.white,
    paddingHorizontal: 10,
  },
  secondaryButton: {
    backgroundColor: COLORS.gray,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 20,
    height: 30,
  },
  secondaryButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  row: {
    flexDirection: "row",
    width: "95%",
    paddingHorizontal: 10,
    gap: 10,
    marginVertical: 10,
  },
  textUser: {
    // height: 40,
    width: "90%",
    borderWidth: 0.5,
    borderColor: COLORS.borderColor,
    borderRadius: 10,
    color: COLORS.white,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  deleteImg: { width: 15, height: 17, alignSelf: "flex-end" },
  centerIntroView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  PTListView: {
    width: scale(330),
    marginVertical: 10,
    borderTopWidth: 0.6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.lightBlack,
    borderRadius: 10,
  },
  changeTrainerButton: {
    width: scale(100),
    alignItems: "center",
    paddingHorizontal: 1,
    paddingVertical: 3,
    backgroundColor: COLORS.lightBlack,
    borderRadius: scale(15),
    borderColor: COLORS.themGreen,
    borderWidth: 0.9,
  },
  taskImage: {
    height: verticalScale(13),
    width: scale(14),
    resizeMode: "contain",
    marginHorizontal: moderateScale(4),
  },
  current: {
    width: scale(300),
    marginVertical: 13,
    borderTopColor: COLORS.lightGray,
    borderTopWidth: 0.6,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    alignSelf: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.gray,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginRight: scale(14),
  },
  checked: {
    backgroundColor: COLORS.lightBlack,
  },
  checkIcon: {
    color: COLORS.themGreen,
    fontSize: 16,
    fontFamily: FONTS.ARCHI_MEDIUM,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.ARCHI_MEDIUM,
    color: COLORS.white,
    fontWeight: "500",
  },
  rowItem: {
    paddingVertical: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 15,
    gap: 10,
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
  smallModalContainer: {
    width: 250,
    height: 30,
    justifyContent: "center",
    marginVertical: 30,
    borderRadius: 10,
  },
  imageHolder: {
    width: scale(17),
    height: scale(17),
    resizeMode: "contain",
  },
  doneText: {
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    fontSize: 12,
    marginRight: 45,
  },
  modalTextUpload: {
    textAlign: "center",
    fontSize: 20,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_BOLD,
    marginLeft: scale(4),
    marginVertical: 10,
  },
  editIconStyle: {
    height: 12,
    width: 12,
  },
  editButtonView: {
    borderRadius: 99,
    backgroundColor: "#CCFF00",
    height: 20,
    width: 20,
    position: "absolute",
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  userCricleIcon: { marginRight: 4, width: 24, height: 24, marginRight: 8 },
  itemTagStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  detailView: {
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
    borderRightWidth: 1,
    borderRightColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 15,
  },
  detailContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 5,
    height: "25%",
    justifyContent: "space-between",
  },
  uploadImageContainer: {
    marginVertical: 5,
    width: 60,
    height: 60,
    alignSelf: "center",
    borderRadius: 999,
  },
  userCircleImage: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 999,
  },
});
export default styles;