import React, { useState, useEffect } from "react";
import {
  Linking,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@react-navigation/elements";
import styles from "../styles/HomeStyle.js";
import { API_URL } from "../config.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter((item) =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token JWT no disponible.");
        navigation.navigate("LoginScreen");
        return;
      }
      const response = await fetch(API_URL + "/getNegocios", {
        method: "GET",
        headers: {
          "Accept-Charset": "utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error en la respuesta de la API");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      await AsyncStorage.removeItem("token");
      navigation.navigate("LoginScreen");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleRefresh();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    setData([]);
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar negocio..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        getItemLayout={(data, index) => ({
          length: 120,
          offset: 120 * index,
          index,
        })}
        windowSize={5}
        initialNumToRender={10}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#1E90FF"]}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imagen }} style={styles.image} />
            <Text style={styles.title}>{item.nombre}</Text>
            <Text style={styles.address}>{item.direccion}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${item.telefono}`)}
            >
              <Text style={styles.phone}>{item.telefono}</Text>
            </TouchableOpacity>
            <Button
              onPress={() => navigation.navigate("Detalles", { negocio: item })}
            >
              Más Información
            </Button>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("FormularioNegocioScreen")}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
