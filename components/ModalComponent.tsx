import React, { FC, useContext, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import UserContext from "../context/UserContext";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
///
const ModalComponent: FC<any> = ({ children }) => {

  const { modalVisible, setModalVisible } = useContext(UserContext)

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
            <View style={styles.pressableView}>
              <Pressable
                style={[styles.button,]}
                onPress={() => { setModalVisible(!modalVisible), console.log('yes') }}
              >
                <AntDesign name="close" size={35} color="black" />
              </Pressable>
            </View>



            {children}


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
    paddingTop: 10,
    padding: 10,
    // alignItems: "center",
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
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  pressableView: {
    flex: 0,
    width: '120%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 0,
    paddingTop: 0,
    paddingRight: "20%",
  }
});

export default ModalComponent;