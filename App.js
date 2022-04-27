import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import { FAB, Modal, Portal, Button, Provider } from "react-native-paper";
import { Slider } from "@miblanchard/react-native-slider";

import CardPoints from "./components/CardPoints";

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const [cardId, setCardId] = React.useState("");
  const [sliderValue, setSliderValue] = React.useState(3);
  const [sliderTextValue, setSliderTextValue] = React.useState("#2d3436");
  const [countCardPoints, setCountCardPoints] = React.useState("");
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const margin = Platform.OS === "ios" ? 30 : 0;

  const valueCountCardPoints = [
    { id: 1, value: 20, color: "#0984e3", name: "" },
    { id: 2, value: 20, color: "#c0392b", name: "" },
    // { id: 3, value: 20, color: "#c0392b", name: "" },
    // { id: 4, value: 20, color: "#c0392b", name: "" },
    // { id: 5, value: 20, color: "#c0392b", name: "" },
  ];

  React.useEffect(() => {
    setCountCardPoints(valueCountCardPoints);
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  function handleShowModalPalette(show, id) {
    show ? showModal() : "";
    setCardId(id);
  }

  const handlerColorText = (value) => {
    setSliderValue(value);
    if (value == 1) {
      setSliderTextValue("#c0392b");
    } else if (value == 2) {
      setSliderTextValue("#0984e3");
    } else if (value == 3) {
      setSliderTextValue("#2d3436");
    } else if (value == 4) {
      setSliderTextValue("#dfe6e9");
    } else if (value == 5) {
      setSliderTextValue("#2ecc71");
    }
    let oldValues = countCardPoints;
    let valeuCard = oldValues.map((item) => {
      if (item.id === cardId) {
        item.color = sliderTextValue;
        return item;
      }
    });
    // setCountCardPoints({ ...countCardPoints, valeuCard });
  };
  const handlerValueInput = (value) => {
    console.log(value);
  };
  const HandlerPressButton = (value, id) => {
    let data = countCardPoints;
    let valeuCard = countCardPoints.map((item) => {
      if (item.id === id) {
        item.points = value;
      } else {
        return item;
      }
      return item;
    });
    setCountCardPoints(valeuCard);
  };

  const handlerAddCard = () => {
    let data = countCardPoints;
    let padrao = [
      {
        id: data.length + 1,
        value: 20,
        color: "#c0392b",
        name: "",
      },
    ];
    data = [...data, ...padrao];
    setCountCardPoints(data);
  };

  const handlerRemoveCard = () => {
    let data = countCardPoints;
    data = data.slice(0, -1);
    data = [...data];
    setCountCardPoints(data);
  };

  const handlerReloadPoints = () => {
    let data = countCardPoints;
    let valeuCard = countCardPoints.map((item) => {
      if (item.points) {
        item.points = 20;
      } else {
        return item;
      }
      return item;
    });
    setCountCardPoints(valeuCard);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#2c3e50" }}>
        <View style={{ marginTop: 30 }}>
          <FlatList
            data={countCardPoints}
            horizontal={false}
            numColumns="2"
            keyExtractor={(card) => String(card.id)}
            renderItem={({ item, index }) => {
              return (
                <CardPoints
                  points={item}
                  alterPoints={handlerValueInput}
                  minusButton={HandlerPressButton}
                  plusButton={HandlerPressButton}
                  showModalPalette={handleShowModalPalette}
                />
              );
            }}
          />
        </View>
        {/* <FAB
          style={styles.fab}
          small
          icon="dots-vertical"
          color="white"
          onPress={() => console.log("Pressed")}
        /> */}

        <Provider>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? "dots-vertical" : "dots-vertical"}
              color="white"
              actions={[
                {
                  style: { backgroundColor: "#eb2f06" },
                  icon: "trash-can",
                  onPress: () => handlerRemoveCard(),
                },
                {
                  style: { backgroundColor: "#f1c40f" },
                  icon: "reload",
                  onPress: () => handlerReloadPoints(),
                },
                {
                  style: { backgroundColor: "#78e08f" },
                  icon: "account-plus",
                  onPress: () => handlerAddCard(),
                },
              ]}
              onStateChange={onStateChange}
              // onPress={() => {}}
            />
          </Portal>
        </Provider>

        <Provider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <Text style={[{ color: sliderTextValue }, styles.textSlider]}>
                Cor
              </Text>
              <Slider
                value={sliderValue}
                minimumValue={1}
                maximumValue={5}
                step={1}
                trackClickable={true}
                onValueChange={(value) => handlerColorText(value)}
              />
            </Modal>
          </Portal>
        </Provider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#2c3e50",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#e74c3c",
  },
  containerBlock: {
    flex: 1,
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  input: {
    height: 50,
    width: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  containerCard: {
    flexDirection: "row",
  },
  colorButton: {
    backgroundColor: "white",
  },
  textSlider: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
