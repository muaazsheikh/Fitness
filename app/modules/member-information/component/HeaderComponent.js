import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FONTS, images } from '../../home/constant';

const HeaderComponent = ({ title, onBackPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <FastImage source={images.back_button} style={styles.backIconStyle}/>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal:3,
    gap:10
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color:"#FFFFFF",
    fontFamily:FONTS.ARCHI_MEDIUM
  },
  backIconStyle:{
    width:30,
    height:30
  }
});

export default HeaderComponent;
