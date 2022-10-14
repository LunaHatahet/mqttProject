import React from "react";
import { styles } from "mqttproject/components/styles/stylesheet.js";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

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
  const checkTextInput = (item) => {
    if (!passwords[item.id - 1].trim()) {
      alert("Please enter password!");
      return;
    }

    if (passwords[item.id - 1] === item.pwd) {
      alert(item.msg);
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
