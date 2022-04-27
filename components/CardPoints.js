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
        }}
      >
        <FAB
          style={styles.fab}
          small
          icon="palette"
          color="white"
          onPress={() => showModalPalette(true, points.id)}
        />
        <IconButton
          compact={true}
          style={styles.colorButton}
          icon="minus"
          color="red"
          onPress={() => minusButton(points.value--, points.id)}
        />
        <TextInput
          value={String(points.value)}
          style={styles.input}
          onChangeText={(text) => alterPoints(text)}
        />
        <IconButton
          compact={true}
          style={styles.colorButton}
          icon="plus"
          color="red"
          onPress={() => plusButton(points.value++, points.id)}
        />
        {/* <Slider
          value={3}
          minimumValue={1}
          maximumValue={5}
          step={1}
          trackClickable={true}
        /> */}
      </View>
      {/* <View
        style={[
          {
            backgroundColor: "#c0392b",
            height: 200,
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <TextInput value={points} style={styles.input} />
      </View> */}
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
    // alignItems: 'center',
    // justifyContent: 'center',
    // textAlign: 'center'
  },
  containerCard: {
    flexDirection: "row",
  },
  colorButton: {
    backgroundColor: "white",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
