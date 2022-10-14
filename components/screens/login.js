import React, { useState } from "react";
import { styles } from "mqttproject/components/styles/stylesheet.js";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Login = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const correctPassword = "helloWorld";

  const checkTextInput = () => {
    if (!password.trim()) {
      alert("Please Enter Password!");
      return;
    }

    if (password === correctPassword) {
      alert("Login Successful!");
      navigation.navigate("Homepage");
      return;
    }

    alert("Wrong Password!");
  };

  return (
    <View style={{ backgroundColor: "#c6ecec", flex: 1 }}>
      <ScrollView>
        <Text
          style={{
            marginTop: "20%",
            marginLeft: "12%",
            fontSize: 35,
            fontWeight: "bold",
            textAlign: "left",
            color: "#000",
          }}
        >
          Login
        </Text>

        <Text
          style={{
            marginTop: "2%",
            marginLeft: "12%",
            fontSize: 12,
            textAlign: "left",
            color: "#000",
          }}
        >
          Please enter password to continue.
        </Text>

        <TextInput
          style={{
            marginTop: "10%",
            marginHorizontal: "10%",
            alignText: "center",
            height: 55,
            backgroundColor: "#fff",
            paddingHorizontal: 40,
            fontSize: 23,
            borderRadius: 10,
          }}
          placeholder="Password"
          placeholderTextColor="#c3c3c3"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        ></TextInput>

        <TouchableOpacity
          style={{
            marginTop: "7%",
            marginHorizontal: "10%",
            height: 48,
            backgroundColor: "#fff",
            padding: 8,
            borderRadius: 50,
            elevation: 5,
          }}
          onPress={checkTextInput}
        >
          <Text
            style={{
              fontSize: 23,
              fontWeight: "bold",
              textAlign: "center",
              color: "#000",
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Login;
