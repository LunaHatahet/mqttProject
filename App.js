import React from "react";
import {
  StyleSheet,
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

export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c6ecec",
    alignItems: "center",
    justifyContent: "center",
  },

  innerContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: "4%",
    elevation: 1,
    paddingVertical: "2%",
    paddingHorizontal: "2%",
    borderRadius: 10,
    borderWidth: 2,
  },

  textbox: {
    alignText: "center",
    height: 55,
    backgroundColor: "#fff",
    paddingHorizontal: 40,
    fontSize: 23,
    borderRadius: 10,
  },

  textFont: {
    fontSize: 23,
    padding: 20,
  },
});
