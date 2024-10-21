import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { PrimaryButton } from "../../../../components";
import { COLORS, FONTS } from "../../constant";

const CancelDiscardModal = ({ visible, onCancel, onDiscard }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Are you sure you want to discard your changes?
          </Text>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={"Cancel"}
              onPress={onCancel}
              style={90}
              color={"transparent"}
            />
            <PrimaryButton title={"Discard"} style={90} onPress={onDiscard} />
          </View>
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
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    width: "80%",
    padding: 40,
    backgroundColor: "#353638",
    borderRadius: 10,
  },
  modalText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: 17,
    fontFamily:FONTS.ARCHI_REGULAR,
    marginBottom:35
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CancelDiscardModal;
