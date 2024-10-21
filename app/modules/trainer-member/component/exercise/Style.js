import { ScaledSheet } from "react-native-size-matters";

import { COLORS, FONTS } from "../../../home/constant";

const styles = ScaledSheet.create({
  horizontalListContainer: {
    marginHorizontal: 10,
    marginVertical: 15,
    height: 40,
    flexGrow: 1,
  },
  horizontalListItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray, // Customize the background color
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  itemImage: {
    width: 14,
    height: 14,
    resizeMode: "contain",
    alignSelf: "center",
  },
  itemIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginLeft: 5,
  },
  itemText: {
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    marginHorizontal: 10,
    // marginLeft:10
  },
  selectedText: {
    color: COLORS.black,
    marginHorizontal: 10,

    // marginLeft:10
  },
  selectedListItem: {
    backgroundColor: COLORS.themGreen,
  },
});

export default styles;
