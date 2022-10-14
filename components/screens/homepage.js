import React, {useState, useEffect} from "react";
import { styles } from "mqttproject/components/styles/stylesheet.js";
import Paho from "paho-mqtt";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Button,
} from "react-native";

const objects = [
  {
    id: "1",
    description: "What is 1+1?",
    pwd: "2",
  },
  {
    id: "2",
    description: "What is the capital of UAE?",
    pwd: "AbuDhabi",
  },
  {
    id: "3",
    description: "Where is Burj Khalifa located?",
    pwd: "Dubai",
  },
];

const passwords = [];

for (const i in objects) {
  passwords.push("");
}

var client = new Paho.Client(
  "broker.hivemq.com",
  Number(8000),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

const Homepage = ({navigation}) => {

  const [value, setValue] = useState(0);

  function onMessage(message) {
    if (message.destinationName === "mqtt-async-test/value")
      setValue(parseInt(message.payloadString));
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
      }
    });  
  }, [])

  function changeValue(c) {
    const message = new Paho.Message((value + 1).toString());
    message.destinationName = "mqtt-async-test/value";
    c.send(message);
  }

  const checkTextInput = (item) => {
    if (!passwords[item.id - 1].trim()) {
      alert("Please enter password!");
      return;
    }

    if (passwords[item.id - 1] === item.pwd) {
      alert("Congrats!");
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

  return (
    <View style={styles.container}>
      <Text> Value is: {value} </Text>
      <Button onPress={() => { changeValue(client);} } title="Press Me"/>
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
}

export default Homepage;