import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { COLORS, icons, images } from "../../../home/constant";
import styles from "./Style";
import { NavigationStrings } from "../../../../constants";
import FastImage from "react-native-fast-image";

const headers = [
  "Date",
  "Weight",
  "Skeletal Muscle Mass",
  "Body Fat Mass",
  "BMI",
  "Body Fat",
  "Abdominal Fat",
  "Physical Development Score",
];

const CustomTable = ({ tableData, navigation }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  function formatDate(inputDate) {
    var date = new Date(inputDate);
    var year = date.getFullYear().toString().substr(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var formattedDate = year + "." + month + "." + day;

    return formattedDate;
  }

  const CustomTableHeader = () => (
    <View style={styles.header}>
      {headers.map((val) => {
        return (
          <View
            style={{
              ...styles.headerSubView,
              borderEndWidth: val === "Physical Development Score" ? 0 : 0.3,
            }}
          >
            {val === "Date" && (
              <FastImage
                source={images.calendar_color}
                style={{ height: 12, width: 12 }}
              />
            )}
            <Text style={styles.headerText} numberOfLines={2}>
              {val}
            </Text>
          </View>
        );
      })}
    </View>
  );

  const CustomTableRow = ({ item, index }) => {
    const isLastRow = tableData.length - 1 === index;
    return (
      <View
        style={{
          ...styles.tableItemContainer,
          borderBottomRightRadius: isLastRow ? 10 : 0,
          borderBottomLeftRadius: isLastRow ? 10 : 0,
        }}
      >
        <TouchableOpacity
          style={
            !!selectedItem && item?.id === selectedItem?.id
              ? styles.selectedItemRow
              : {
                  ...styles.row,
                  borderBottomWidth: isLastRow ? 0 : 0.3,
                }
          }
          onPress={() => {
            if (!!selectedItem && item.id === selectedItem.id) {
              setSelectedItem(null);
            } else {
              setSelectedItem(item);
            }
          }}
        >
          <View style={styles.listTimeView}>
            <Text style={[styles.text]}>{formatDate(item.regDate)}</Text>
          </View>
          <Text style={styles.text}>{item.weight || 0} kg</Text>
          <Text style={styles.text}>{item.muscleMass || 0}kg</Text>
          <Text style={styles.text}>{item.fatMass || 0}kg</Text>
          <Text style={styles.text}>{item.bmi || 0}kg/m2</Text>
          <Text style={styles.text}>{item.fatPercentage || 0}%</Text>
          <Text style={styles.text}>{item.abdominalFatPercentage || 0}%</Text>
          <Text style={styles.text}>{item.physicalDevelopmentScore || 0}%</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.tableContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <CustomTableHeader />
          <FlatList
            data={tableData}
            renderItem={({ item, index }) => (
              <CustomTableRow item={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        disabled={!selectedItem}
        style={[
          styles.editButtonView,
          {
            backgroundColor: !!selectedItem
              ? COLORS.themGreen
              : COLORS.lightBlack,
          },
        ]}
        onPress={() => {
          navigation.navigate(NavigationStrings.MEMBER_BODY, {
            isEdit: true,
            data: selectedItem,
          });
        }}
      >
        <Text
          style={[
            styles.tabButtonText,
            {
              color: !!selectedItem ? COLORS.themeGray : COLORS.white,
            },
          ]}
        >
          Edit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTable;
