import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, icons } from "../../workout/constant";
import TrainerHeader from "../component/header";
import { PrimaryButton } from "../../../components";
import { CONTEXT } from "../../home/constant/theme";
import { useFocusEffect } from "@react-navigation/native";
import getServiceIntroApi from "../../../api/profile/getServiceIntro";
import Collapsible from "react-native-collapsible";
import HeaderComponent from "../component/HeaderComponent";

const ServiceIntroduction = ({ navigation }) => {
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);

  const handlePress = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleCloseAll = () => {
    setActiveSection(null);
  };

  function formatDateString(dateTimeString) {
    const [dateString] = dateTimeString.split("T");
    const [year, month, day] = dateString.split("-");
    // const formattedDate = `${day}/${month}/${year.slice(-2)}`;
    const formattedDate = `${year.slice(-2)}/${month}/${day}`;
    return formattedDate;
  }

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          const response = await getServiceIntroApi();
          console.log(JSON.stringify(response));
          setSections(response?.data?.terms);
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      }
      fetchMyAPI();
      return () => {};
    }, [])
  );

  const Header = () => (
    <View style={{ paddingStart: 5,paddingBottom:5 }}>
      <HeaderComponent
        title={CONTEXT.service_Intro}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );

  const renderTerm = (term) => (
    <View key={term.id} style={styles.contentContainer}>
      <Text style={styles.menuItem}>{term.title}</Text>
      <Text style={styles.contentText}>{term.content}</Text>
    </View>
  );

  const renderSection = (section) => (
    <View key={section.type}>
      <TouchableOpacity
        onPress={() => handlePress(section.type)}
        style={[
          styles.menuItemContainer,
          { borderBottomWidth: section.type === 0 ? 1 : 0 },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View style={{ flex: 1, gap: 10 }}>
            <Text style={styles.menuItem}>{section.typeValue}</Text>
            {activeSection === section.type && (
              <Text style={styles.contentText}>
                {CONTEXT.last_updated} {formatDateString(section.lastUpdatedAt)}
              </Text>
            )}
          </View>
          <Image
            source={
              activeSection === section.type ? icons.up_icon : icons.down_icon
            }
            style={styles.imageView}
          />
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={activeSection !== section.type}>
        <View>{section.terms.map(renderTerm)}</View>
      </Collapsible>
    </View>
  );

  const Container = () => (
    <View>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.menu}>{sections.map(renderSection)}</View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Header()}
        <ScrollView
          style={{ marginBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {Container()}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  newAccountContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.themeGray,
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  menu: {
    width: "95%",
    backgroundColor: COLORS.gray1,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginLeft: 10,
    borderRadius: 10,
  },
  menuItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 20,
  },
  menuItem: {
    color: "#FFF",
    fontSize: 18,
  },
  contentContainer: {
    padding: 10,
    backgroundColor: COLORS.gray1,
  },
  contentText: {
    color: "#FFF",
    fontSize: 16,
  },
  buttonViewNew: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imageView: {
    width: 15,
    height: 15,
    marginLeft: 10,
    resizeMode: "contain",
  },
  backdropButton: {
    position: "absolute",
    top: "100%",
    zIndex: 2,
    // transform: [{ translateX: -50 }],
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 20,
    alignSelf: "center",
    // left:'50%'
  },
  backdropButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default ServiceIntroduction;
