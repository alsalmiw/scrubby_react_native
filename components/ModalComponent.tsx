import React, { FC, useContext, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import UserContext from "../context/UserContext";
import { FontAwesome5 } from '@expo/vector-icons';
//
const ModalComponent:FC<any> = ({children}) => {

  const { modalVisible, setModalVisible} = useContext(UserContext)
 
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            
            {children}
            
            <Pressable
              style={[styles.button, styles.buttonClose,]}
              onPress={() => {setModalVisible(!modalVisible), console.log('yes')}}
            >
              <FontAwesome5 name="unlock" size={24} color="black" />
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
     
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  
  },
  modalView: {
    margin: 20,
    width: "95%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 0,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    backgroundColor:'blue',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ModalComponent;