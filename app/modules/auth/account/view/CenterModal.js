import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import { PrimaryButton } from "../../../../components";
import { COLORS, icons } from "../../../home/constant";

const CustomModal = ({
  visible,
  onClose,
  imageUrl,
  text,
  closeText,
  upperText,
  button,
  cross,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.crossIconView} onPress={cross}>
            <FastImage source={icons.CrossButton} style={styles.crossImage} />
          </TouchableOpacity>

          <Image
            resizeMode="contain"
            source={imageUrl}
            style={styles.modalImage}
          />
          <Text style={styles.modalText}>{text}</Text>

          {button && (
            <PrimaryButton
              title={"Close"}
              style={90}
              edit={true}
              color={true}
              onPress={onClose}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: COLORS.themeGray,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: scale(50),
    paddingHorizontal: verticalScale(40),
    gap: 10,
    marginHorizontal: 20,
  },
  modalImage: {
    width: scale(100),
    height: scale(100),
  },
  modalText: {
    // width: scale(210),
    fontSize: 20,
    textAlign: "center",
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 20,
    color: COLORS.white,
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
  crossImage: {
    width: scale(12),
    height: verticalScale(12),
    resizeMode: "contain",
  },
});

export default CustomModal;
