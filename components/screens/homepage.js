import React, { useEffect } from "react";
import Paho from "paho-mqtt";
import { styles } from "../styles/stylesheet.js";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

client = new Paho.Client(
  "broker.hivemq.com",
  Number(8000),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

const objects = [
  {
    id: "1",
    description: "What's the password?",
    pwd: "always with you",
    msg: "Lower nightstand drawer",
  },
  {
    id: "2",
    description: "yaxz kap",
    pwd: "love you",
    msg: "under the pillow",
  },
];

const passwords = [];

for (const i in objects) {
  passwords.push("");
}

const Homepage = ({ navigation }) => {
  function onMessage(message) {
    if (message.destinationName === "mqtt-async-test/value") {
      let val = 0;
      val = parseInt(message.payloadString);
      if (!isNaN(val)) setValue(val);
    }
  }

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Connected!");
        client.subscribe("mqtt-async-test/value");
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Failed to connect!");
      },
    });
  }, []);

  const checkTextInput = (item) => {
    if (!passwords[item.id - 1].trim()) {
      alert("Please enter password!");
      return;
    }

    if (passwords[item.id - 1] === item.pwd) {
      alert(item.msg);
      changeValue(client, item.msg);
    } else {
      alert("Wrong password!");
    }
  };

  const keyExtractor = (item) => item.id;

  const myListEmpty = () => {
    return (
      <Text style={{ fontSize: 18, textAlign: "center", marginTop: "50%" }}>
        No objects found.
      </Text>
    );
  };

  const ListHeader = () => {
    return (
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "10%",
          marginBottom: "10%",
        }}
      >
        List of objects
      </Text>
    );
  };

  function changeValue(c, msg) {
    const message = new Paho.Message(msg);
    message.destinationName = "mqtt-async-test/value";
    c.send(message);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginTop: "8%",
          marginLeft: "77%",
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#046464",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
      <FlatList
        style={{ marginTop: "4%" }}
        keyExtractor={keyExtractor}
        data={objects}
        renderItem={({ item }) => (
          <SafeAreaView style={styles.innerContainer}>
            <Text style={styles.textFont}>{item.description}</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={styles.textbox}
                placeholder="Password"
                placeholderTextColor="#c3c3c3"
                multiline
                onChangeText={(value) => (passwords[item.id - 1] = value)}
              ></TextInput>
              <TouchableOpacity
                style={{
                  marginLeft: "5%",
                  height: 50,
                  backgroundColor: "#046464",
                  padding: 10,
                  borderRadius: 10,
                  elevation: 5,
                }}
                onPress={() => {
                  checkTextInput(item);
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
        ListEmptyComponent={objects.length === 0 && myListEmpty}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={() => <View style={{ padding: "2%" }} />}
      />
    </View>
  );
};

export default Homepage;
