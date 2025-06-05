import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  item: {
    padding: 20,
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  address: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  phone: {
    fontSize: 16,
    color: "blue",
    marginBottom: 10,
    textAlign: "center",
  },
  botonFlotante: {
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: "white",
    paddingVertical: 22,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  botonFlotanteText: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 16,
  },
  
  botonEliminar: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    marginRight: 20,
    alignSelf: "flex-end", // Esto hace que el botón solo ocupe el ancho necesario
  },
  botonEliminarText: {
    color: "white",
    fontWeight: "bold",
  },

  ofertaCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  ofertaImagen: {
    width: 100,
    height: 100,
  },

  ofertaInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },

  ofertaNombre: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  precioOriginal: {
    fontSize: 14,
    color: "#888",
  },

  tachado: {
    textDecorationLine: "line-through",
  },


  precioOferta: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
    marginTop: 4,
  },
});

export default styles;
