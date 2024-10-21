import React, { useEffect, useState } from "react";
import { Modal, View, TouchableWithoutFeedback, Text, TouchableOpacity, Alert, Image } from "react-native";
import { icons } from "../../../constant";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import { CONTEXT } from "../../../constant/theme";

const ViewModal = ({ modalView, setModalView }) => {

 
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalView}
      onRequestClose={() => {
        setModalView(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalView(false)}>
        <View style={styles.modelViewcontainer}>
          <View style={[styles.confirmModal]}>
          <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => setModalView(false)}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>

            <View style={styles.requestTextView}>
              <Image source={icons.file} style={styles.reserveIcon} />
              <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
                {'David David evaluated'}
              </Text>
            </View>
        <View style={styles.horizontalLine}></View>

        <Text style={styles.textModal}>
        Today, I ate very cleanly and stuck to my plan. 
This level of nutrition balance and a clean diet is excellent. 
Today, I ate very cleanly and stuck to my plan. 
This level of nutrition balance and a clean diet is excellent. 
Today, I ate very cleanly and stuck to my plan. 
This level of nutrition balance and a clean diet is excellent. 
Today, I ate very cleanly and stuck to my plan. 
This level of nutrition balance and a clean diet is excellent.
        </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ViewModal;
