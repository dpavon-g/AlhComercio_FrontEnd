import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import styles from "../styles/OfertasStyle.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config.js";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Alert } from "react-native";

export default function OfertasScreen({ route }) {
  const navigation = useNavigation();
  const { negocio } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token JWT no disponible.");
        navigation.navigate("LoginScreen");
        return;
      }
      const response = await fetch(
        API_URL + `/getNegocioByID?id=${negocio.id}`,
        {
          method: "GET",
          headers: {
            "Accept-Charset": "utf-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Error en la respuesta de la API");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
      await AsyncStorage.removeItem("token");
      navigation.navigate("LoginScreen");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEliminarNegocio = () => {
    Alert.alert(
      "Eliminar negocio",
      "¿Estás seguro de que deseas eliminar este negocio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              if (!token) {
                navigation.navigate("LoginScreen");
                return;
              }

              const response = await fetch(
                API_URL + `/eliminarNegocio?id=${negocio.id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Accept-Charset": "utf-8",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (!response.ok) throw new Error("Error al eliminar el negocio");

              Alert.alert(
                "Negocio eliminado",
                "El negocio se ha eliminado correctamente."
              );
              navigation.goBack(); // Vuelve a la pantalla anterior
            } catch (error) {
              console.log(error);
              Alert.alert("Error", "No se pudo eliminar el negocio.");
            }
          },
        },
      ]
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setData([]);
    fetchData();
  };

  useFocusEffect(
    React.useCallback(() => {
      handleRefresh();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.item}>
        <Text>Error al cargar datos del negocio.</Text>
      </View>
    );
  }

  return (
  <View style={{ flex: 1 }}>
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 120 }}
      data={data.ofertas || []}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View>
          {data.admin && (
            <TouchableOpacity
              onPress={handleEliminarNegocio}
              style={styles.botonEliminar}
            >
              <Text style={styles.botonEliminarText}>Eliminar negocio</Text>
            </TouchableOpacity>
          )}
          <View style={styles.item}>
            <Image source={{ uri: negocio.imagen }} style={styles.image} />
            <Text style={styles.title}>{negocio.nombre}</Text>
            <Text style={styles.address}>{negocio.direccion}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${negocio.telefono}`)}
            >
              <Text style={styles.phone}>{negocio.telefono}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Ofertas disponibles:</Text>
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.ofertaCard}>
          <Image source={{ uri: item.imagen }} style={styles.ofertaImagen} />
          <View style={styles.ofertaInfo}>
            <Text style={styles.ofertaNombre}>{item.nombre}</Text>
            <Text style={styles.precioOriginal}>
              Precio original:{" "}
              <Text style={styles.tachado}>{item.precio_original}€</Text>
            </Text>
            <Text style={styles.precioOferta}>
              Oferta: {item.precio_oferta}€
            </Text>
          </View>
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={["blue"]}
        />
      }
    />

    {/* Botón flotante al final */}
    {data.admin && (
      <TouchableOpacity
        style={styles.botonFlotante}
        onPress={() =>
          navigation.navigate("FormularioOfertaScreen", {
            negocioId: negocio.id,
          })
        }
      >
        <Text style={styles.botonFlotanteText}>Crear Oferta</Text>
      </TouchableOpacity>
    )}
  </View>
);

}
