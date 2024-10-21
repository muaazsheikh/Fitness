import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { scale } from "react-native-size-matters";
import { COLORS, icons, images } from "../../constant";
import styles from "./Style";

const CustomRatingInput = ({
  maxRating,
  defaultRating,
  setDefaultRating,
  imageUrl,
  title,
  value,
  onChangeValue,
  edit,
}) => {
  return (
    <View
      style={{
        marginVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: edit ? 1 : 0,
        paddingBottom: edit ? 15 : 0,
        borderBottomColor: "#505050",
        paddingHorizontal: 10,
        marginHorizontal: 10,
      }}
    >
      <View style={[styles.requestTextView]}>
        <View style={styles.requestTextView}>
          <Image
            source={imageUrl}
            style={[styles.smallIcon, { tintColor: COLORS.white }]}
          />
          <Text style={[styles.smallTextStyle, { marginLeft: scale(6) }]}>
            {title}
          </Text>
        </View>
        <View style={styles.container}>
          {maxRating.map((item, key) => (
            <TouchableOpacity
              key={item}
              style={{ flexDirection: "row" }}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                style={{...styles.starImageStyle,tintColor:item <= defaultRating?'#F6EB61':null}}
                source={
                  item <= defaultRating ? icons.review : icons.review_place
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {defaultRating < 3 && (
        <>
          {!edit ? (
            <View>
              <TextInput
                style={styles.textStyle}
                multiline={true}
                placeholder="Add Reason"
                placeholderTextColor={COLORS.placeholderColor}
                onChangeText={onChangeValue}
              />
            </View>
          ) : (
            <View
              style={{
                // borderBottomWidth: 1,
                paddingBottom: 15,
                borderBottomColor: "#505050",
                paddingHorizontal: 10,
                // backgroundColor: "red",
              }}
            >
              {!!value.length && (
                <Text
                  style={{
                    color: "#FFFFFF",
                    marginTop: 15,
                    marginHorizontal: 5,
                  }}
                >
                  {value}
                </Text>
              )}
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default CustomRatingInput;
