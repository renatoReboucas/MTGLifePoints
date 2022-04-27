import * as React from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FAB, TextInput, IconButton } from "react-native-paper";
import {
  backgroundColor,
  borderColor,
  color,
} from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default function CardPoints({
  points,
  showModalPalette,
  alterPoints,
  minusButton,
  plusButton,
}) {
  const [name, setName] = React.useState("");
  const [counterpoints, setCounterPoints] = React.useState(20);

  const handlerPoints = (points) => {
    console.log(points);
    if (!points) {
      return;
    } else {
      setCounterPoints(points);
      handlerPoints(points);
    }
  };

  // React.useEffect(() => {
  //   setCounterPoints(points.points);
  // }, []);

  return (
    <>
      <View
        style={{
          backgroundColor: points.color,
          height: 200,
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          borderWidth: 1,
        }}
      >
        <View style={{ marginTop: 60, flexDirection: "row", flexWrap: "wrap" }}>
          <IconButton
            compact={true}
            style={styles.colorButton}
            icon="minus"
            color="red"
            onPress={() => minusButton(points.value--, points.id)}
          />
          <TextInput
            mode="outlined"
            value={
              points.points == undefined ? String(20) : String(points.points)
            }
            style={styles.input}
            placeholder="20"
            onChangeText={(text) => handlerPoints(text)}
          />
          <IconButton
            compact={true}
            style={styles.colorButton}
            icon="plus"
            color="red"
            onPress={() => plusButton(points.value++, points.id)}
          />
          <TextInput
            mode="outlined"
            value={name}
            style={styles.inputName}
            placeholder="Nome do Planeswalker"
            onChangeText={(text) => setName(text)}
          />
        </View>
        <FAB
          style={styles.fab}
          small
          icon="palette"
          color="white"
          onPress={() => showModalPalette(true, points.id)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 50,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "#000",
    backgroundColor: "#d2dae2",
  },
  containerCard: {
    flexDirection: "row",
  },
  colorButton: {
    backgroundColor: "white",
  },
  fab: {
    position: "absolute",
    margin: 8,
    right: 0,
    bottom: 0,
  },
  inputName: {
    marginTop: 10,
    height: 40,
    width: "100%",
    right: 0,
    bottom: 0,
  },
});
