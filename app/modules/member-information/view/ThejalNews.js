import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";

import styles from "./Style";
import _ from "lodash";
import { images } from "../../workout/constant";
import TrainerHeader from "../component/header";
import { PrimaryButton } from "../../../components";
import { CONTEXT } from "../../home/constant/theme";
import { useFocusEffect } from "@react-navigation/native";
import getCenterBulletinApi from "../../../api/profile/getCenterBulletin";
import SwipeImage from "../component/swiperImage";
import getThejalNewsApi from "../../../api/profile/getThejalNews";
import HeaderComponent from "../component/HeaderComponent";

const ThejalNews = ({ navigation }) => {
  const [centerBulletin, setCenterBulletin] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          const response = await getThejalNewsApi();
          setCenterBulletin(response?.data?.newsList);
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      }
      fetchMyAPI();
      return () => {};
    }, [])
  );

  const Header = () => (
    <View style={{ padding: 5 }}>
      <HeaderComponent
        title={CONTEXT.thejal_news}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );

  const Container = () => (
    <View>
      <View style={{ flex: 1 }}>
        {centerBulletin.map((data, index) => (
          <SwipeImage key={index} data={data} />
        ))}
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

export default ThejalNews;
