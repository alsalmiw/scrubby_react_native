// import { StatusBar } from 'expo-status-bar';
import { FC, useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import UserContext from '../../context/UserContext';
import HeaderComponent from '../../components/HeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import AddItemButtonComponent from '../../components/AddItemButtonComponent';
import SquareColoredButton from '../../components/SquareColoredButton';
import { Dimensions } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { Entypo } from '@expo/vector-icons';


interface taskInfo {
  description: string;
  id: number;
  name: string;
  tags: string;
  UserId: number;
}


const AddedItemsScreen: FC = () => {

  const { seeAll, setSeeAll, task, setTask, allTask, setAllTask, addTask, setAddTask, userData } = useContext(UserContext)

  const { lilacColor } = useContext(ThemeContext)
  const windowWidth = Dimensions.get('window').width * 0.25;



  let r = Math.floor(Math.random() * 7)

  const handleDisplayIcon = () => {
    console.log('Hello World');
  }

  return (
    <View style={styles.container}>
      {/* This header component use font size 25, later must change to percentage based on device width */}
      <View>
        <HeaderComponent title="Master Bathroom Items" />
        <UnderlinedOneHeaderComponent titleFirst="Added Items" />
      </View>


      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: '2%' }}>
        <View>
          <AddItemButtonComponent onPress={handleDisplayIcon}>
            <Entypo name="squared-plus" size={windowWidth} color={lilacColor} />
          </AddItemButtonComponent>
        </View>
        {

          addTask.map((colorBtn: taskInfo, x: number) => {
            return (
              <View>
                <SquareColoredButton key={x} idx={r + x} onPress={() => { colorBtn.UserId = userData.id, addTask.push(colorBtn), console.log(addTask) }} >
                  <Entypo name="minus" size={45} color="white" style={{ paddingBottom: 0, marginBottom: 0, textAlign: 'center' }} />
                  <Text style={{ color: 'white', textAlign: 'center', marginTop: 0 }}>{colorBtn.name}</Text>
                </SquareColoredButton>
              </View>

            )
          })
        }
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
});

export default AddedItemsScreen