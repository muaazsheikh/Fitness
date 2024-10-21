import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { COLORS, icons } from "../../../constant";
import { PrimaryButton } from "../../../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SessionModal = ({
  visible,
  setModalVisible,
  imageUrl,
  text,
  navigation,
  onMemoChange,
  onConfirm,
}) => {
  const [enable, setEnable] = useState(false);
  const [memo, setMemo] = useState("");
  const handleConfirm = (text) => {
    if (memo.length > 0 || enable) {
      setMemo("");
      onConfirm();
      setEnable(false);
    } else {
      console.log("cancel");
    }
  };

  const memoChange = (text) => {
    setMemo(text);
    onMemoChange(text);
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      {/* <TouchableWithoutFeedback onPress={() => setModalVisible(false)}> */}

      <TouchableOpacity
        style={styles.modalContainer}
        onPress={() => setModalVisible(false)}
      >
        <KeyboardAwareScrollView>
          <View style={styles.modalContent}>
            <FastImage source={imageUrl} style={styles.modalImage} />
            <Text style={styles.modalText}>{text}</Text>

            {/* Memo */}
            <TextInput
              style={styles.textStyle}
              multiline={true}
              placeholder="Add notes"
              placeholderTextColor={COLORS.lightGray}
              value={memo}
              onChangeText={(text) => {
                memoChange(text);
              }}
            />

            <View style={{ flexDirection: "row", gap: 25 }}>
              <PrimaryButton
                title={"Cancel"}
                color={true}
                onPress={() => setModalVisible(false)}
                style={90}
              />
              <PrimaryButton
                color={memo.length > 0 || enable ? false : true}
                title={"Confirm"}
                onPress={handleConfirm}
                style={90}
              />
            </View>
            {/* Confirm button */}
          </View>
        </KeyboardAwareScrollView>
      </TouchableOpacity>

      {/* </TouchableWithoutFeedback> */}
    </Modal>
  );
};

export default SessionModal;
