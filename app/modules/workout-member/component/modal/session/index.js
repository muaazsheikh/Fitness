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
import { icons } from "../../../constant";
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
  const [memo, setMemo] = useState("");

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
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <KeyboardAwareScrollView>
          
        <TouchableOpacity style={styles.crossIconView} onPress={()=>setModalVisible(false)}>
            <FastImage source={icons.CrossButton} style={styles.crossIconView} />
          </TouchableOpacity>
          <FastImage source={imageUrl} style={styles.modalImage} />
          <Text style={styles.modalText}>{text}</Text>

          {/* Memo */}
          <TextInput
            style={styles.textStyle}
            multiline={true}
            placeholder="Add notes"
            value={memo}
            onChangeText={(text) => {
              memoChange(text);
            }}
          />

          <View style={{ flexDirection: "row" ,alignSelf:'center',gap:10}}>
            <PrimaryButton
              title={"Cancel"}
              color={true}
              onPress={() => setModalVisible(false)}
              style={90}
            />
            <PrimaryButton title={"Confirm"} onPress={onConfirm} style={90} />
          </View>
          {/* Confirm button */}
        </KeyboardAwareScrollView>
        </View>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </Modal>
  );
};

export default SessionModal;
