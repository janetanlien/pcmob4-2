import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export default function AddScreen({ navigation }) {
  const [text, setText] = useState("");
  // setText is a function we use to store the user input
  // useState is a hook that gives us a state and a function to set the state

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <Text style={{ fontSize: 24 }}>What do you want to add?</Text>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={(input) => setText(input)}
        // new user input will be put to the setText function. setText is a constant defined previously in this file. 
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Notes", { text })}
          // when we press the button, it navigates us to the note page and ALSO passes a TEXT prop into the notes page.
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
      {/* <Text>{text.toUpperCase()}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
  buttonText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
