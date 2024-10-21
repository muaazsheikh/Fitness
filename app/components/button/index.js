import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { scale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import styles from "./Style";
import { COLORS } from "../../modules/home/constant";

const PrimaryButton = ({
  title,
  onPress,
  style,
  imgUrl,
  color,
  edit,
  imgStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        color ? styles.secondaryButton : styles.button,
        { width: style ? scale(style) : null },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {imgUrl && (
        <Image
          source={imgUrl}
          style={[
            edit ? styles.editNote : styles.noteImg,
            { tintColor: imgStyle ? imgStyle : null },
          ]}
        />
      )}
      <Text numberOfLines={1} style={color ? styles.secondaryButtonText : styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
