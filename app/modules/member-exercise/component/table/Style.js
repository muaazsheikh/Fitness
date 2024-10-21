import { ScaledSheet, scale, verticalScale } from "react-native-size-matters";

import { FONTS } from "../../../workout/constant";
import { COLORS } from "../../../home/constant";
const styles = ScaledSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#464648",
    borderWidth: 1,
    borderColor: "#FFFFFF33",
    borderTopStartRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    borderColor:'#FFFFFF33'
  },
  headerText: {
    fontSize: 15,
    textAlign: "center",
    color: "#CCCCCC",
    fontFamily: FONTS.ARCHI_BOLD,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#ccc",
    paddingVertical: scale(15),
    alignItems: "center",

  },
  selectedItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: COLORS.themGreen,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#4D4F52",
    borderWidth:1,
    paddingVertical: scale(15),
    borderRadius:10
    
  },
  lastRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#353638",
    paddingVertical: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    color: COLORS.white,
    textAlign: "center",
    width: 130,
  },
  headerSubView: {
    paddingVertical: 10,
    borderEndWidth: 0.3,
    marginHorizontal: 3,
    width: 130,
    borderColor: COLORS.white,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    gap:10
  },
  lastheaderSubView: {
    paddingVertical: 10,
    borderEndWidth: 0.5,
    marginHorizontal: 3,
    width: 150,
    borderColor: COLORS.white,
  },

  tableContainer: { borderRadius: 10, margin: 10, marginTop: 15 },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    marginTop: scale(5),
    flex: 1,
  },

  editButtonView: {
    padding: 30,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: verticalScale(15),
    alignItems: "center",
    borderColor: COLORS.themGreen,
    borderWidth: 1,
    margin:scale(10)

  },
  tabButtonText: {
    color: COLORS.themeGray,
    fontSize: 16,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  tableItemContainer: {
    // paddingHorizontal: 10,
    backgroundColor: "#353638",
  },
  listTimeView: {
    paddingVertical: 3,
    borderEndWidth: 0.3,
    marginHorizontal: 3,
    borderColor: COLORS.white,
  },
  headerSubViewForDate: {
    paddingVertical: 10,
    borderEndWidth: 0.3,
    marginHorizontal: 3,
    width: 130,
    borderColor: COLORS.white,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    gap:10
  },
});
export default styles;
