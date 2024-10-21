// ExerciseList.js

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { COLORS, images } from "../../constant";
import Seperator from "../../../../components/seperator";
import { icons } from "../../../home/constant";

const ExerciseList = ({
  text,
  type,
  onPress,
  id,
  confirm,
  inComplete,
  sessionCount,
  sessionComplete,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [localSelected, setLocalSelected] = useState(isSelected);
  const handlePress = () => {
    setLocalSelected(!localSelected);
    onPress(id);
  };

  return (
    <View style={{ zIndex: 4 }}>
      {!text?.length > 0 ? (
        <Seperator title={"No Data Available"} dimesion={150} />
      ) : null}

      <TouchableOpacity
        style={[
          styles.itemContainer,
          localSelected ? styles.selectedContainer : null,
        ]}
        onPress={() => handlePress()}
      >
        <FastImage source={images.User} style={styles.image} />

        <Text numberOfLines={1} style={[styles.text]}>
          {text}
        </Text>

        {sessionCount && (
          <View style={{ flexDirection: "row", width: 120 }}>
            <FastImage source={icons.Session_icon} style={styles.sessionIcon} />
            <Text numberOfLines={1} style={styles.text}>
              {sessionComplete}/{sessionCount}
            </Text>
          </View>
        )}

        <TouchableOpacity>
          <ImageBackground
            source={icons.confirm_count}
            style={styles.imageBack}
          >
            <View style={styles.ImageView}>
              <Text style={styles.countText}>{confirm || 0}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity>
          <ImageBackground source={icons.cancel_count} style={styles.imageBack}>
            <View style={styles.ImageView}>
              <Text style={styles.countText}>{inComplete || 0}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default ExerciseList;
