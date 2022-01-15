import firebase from "../database/firebaseDB";

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const db = firebase.firestore().collection('todos');

export default function NotesScreen({ navigation, route }) {
  const [notes, setNotes] = useState([]);

  // This is to update the firebase database.
  // we are establishing a connection to the todos collection in firestore.
  // the moment todos changes, we will update the collection
  // and we will use the updated notes. 
  useEffect(() => {
    const unsubscribe = db.onSnapshot((collection) => {
        const updatedNotes = collection.docs.map((doc) => {

          const noteObject = {
            ...doc.data(),
            id: doc.id,
          }
          console.log(noteObject)
          return noteObject
        })
        setNotes(updatedNotes)
      })

    return unsubscribe;
  }, [])


  // This is to set up the top right square button to add a note
  useEffect(() => {
    navigation.setOptions({
      // we use the navigation prop
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          
          <Ionicons
            name="ios-create-outline"
            size={30}
            color="black"
            style={{
              color: "#f55",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

  // Monitor route.params for changes and add items to the database
  useEffect(() => {
    if (route.params?.text) {
      // if my route has a parameter called text (i.e. everytime there is a change). run this..
      // this is called componentdidupdate 
      const newNote = {
        title: route.params.text,
        done: false,
        
      };
      db.add(newNote);
      // setNotes([...notes, newNote]);
      // this line is no longer needed. 
    }
  }, [route.params?.text]);

  function addNote() {
    navigation.navigate("Add Screen");
  }

  // This deletes an individual note
  function deleteNote(id) {
    console.log("Deleting " + id);
    // we want to add a firebase interaction here
    // this firebase interaction means we find the id in firebase that is the same as 
    // what we selected to delete in the expo app
    db.doc(id).delete();

  
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{item.title}</Text>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
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
});
