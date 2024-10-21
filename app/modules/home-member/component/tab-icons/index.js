import React from "react";
import { View, Image } from "react-native";

import { COLORS } from "../../constant";

const TabIcon = ({ focused, icon }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: focused ? 2 : 0,
        borderTopColor: COLORS.themGreen,
        paddingTop: focused ? 5 : 0,
        width: 25,
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? COLORS.themGreen : COLORS.gray,
          margin: 20,
        }}
      />
    </View>
  );
};

export default TabIcon;
