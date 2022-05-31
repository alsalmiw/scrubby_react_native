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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../../types/INavigateProfile';
import FullButtonComponent from '../../components/FullButtonComponent';
import { AddSelectedTask, DeleteTaskByTaskId, GetTasksByRoomId } from '../../services/dataService'
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';


interface taskInfo {
  description: string;
  id: number;
  name: string;
  tags: string;
  UserId: number;
  spaceId: number;
  color: number;
}

interface noColorTaskInfo {
  description: string;
  id: number;
  name: string;
  tags: string;
  UserId: number;
  spaceId: number;
  color?: number
}

type Props = NativeStackScreenProps<RootStackParamList, 'AddedItems'>

const AddedItemsScreen: FC<Props> = ({ navigation }) => {

  const { seeAll, setSeeAll, task, setTask, allTask, setAllTask, addTask, setAddTask, userData, rState, setRState, setRoomTasks, myRoom, storedAddedItems, setStoredAddedItems, roomTasks, noAddedItems, setNoAddedItems } = useContext(UserContext)

  const { lilacColor, purpleColor } = useContext(ThemeContext)
  const windowWidth = Dimensions.get('window').width * 0.25;


  const handleNavigate = () => {
    navigation.navigate("AddItems");
  }

  const handleNavigateDone = async () => {

    let newAddTask: noColorTaskInfo[] = [...addTask];

    newAddTask.forEach((task: noColorTaskInfo) => {
      delete task.color;
    })

    let result = await AddSelectedTask(newAddTask)

    if (result) {
      let tasks = await GetTasksByRoomId(newAddTask[0].spaceId)
      if (tasks.length != 0) {

        setRoomTasks(tasks)
        navigation.navigate('AddedTasks')
      }

    }

    setAddTask([])

  }

  const handleDeleteItem = (id: number) => {

    setAddTask((currentTasks: any) => {

      return currentTasks.filter((task: any, x: number) => x !== id)

    });

  }

  const handleDeleteItemTask = async (task: any) => {
    let isDelete = await DeleteTaskByTaskId(task.id)
    if (isDelete) {
      setStoredAddedItems(storedAddedItems.filter((addedtask: any) => addedtask.id !== task.id))
      setRoomTasks(roomTasks.filter((addedTask: any) => addedTask.id !== task.id))
    }

  }

  return (
    <View style={styles.container}>
      <View>
        <View>
          <HeaderComponent title={myRoom.spaceName} />
        </View>
        <View style={styles.underlineContainer}>
          <UnderlinedOneHeaderComponent titleFirst="Added Items" />
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: '2%', alignItems: 'center' }}>
          <AddItemButtonComponent onPress={handleNavigate}>
            <Entypo name="squared-plus" size={windowWidth} color={lilacColor} />
          </AddItemButtonComponent>
          {
            addTask.map((colorBtn: taskInfo, x: number) => {
              return (
                <View key={x}>
                  <SquareColoredButton key={colorBtn.id} idx={colorBtn.color} onPress={handleDeleteItem.bind(this, x)} >
                    <Entypo name="minus" size={30} color="white" style={{ paddingBottom: 0, marginBottom: 0, textAlign: 'center' }} />
                    <Text style={{ color: 'white', textAlign: 'center', marginTop: 0 }}>{colorBtn.name}</Text>
                  </SquareColoredButton>
                </View>
              )
            })
          }
          {
            storedAddedItems.length > 0 ?

              storedAddedItems.map((task: any, idx: number) => {
                return (
                  <View key={idx}>
                    <SquareColoredButton key={task.id} idx={task.color} onPress={() => handleDeleteItemTask(task)} >
                      <Entypo name="minus" size={30} color="white" style={{ paddingBottom: 0, marginBottom: 0, textAlign: 'center' }} />
                      <Text style={{ color: 'white', textAlign: 'center', marginTop: 0 }}>{task.item.name}</Text>
                    </SquareColoredButton>
                  </View>
                )
              })
              : null
          }
        </View>
      </View>
      {
        noAddedItems || (noAddedItems && storedAddedItems.length! > 0) ?
          <FullButtonComponent radius={0} onPress={() => { navigation.goBack(), setNoAddedItems(false) }} color={purpleColor}>
            <Text>Back</Text>
          </FullButtonComponent>
          :
          <TwoFullButtonComponent color={purpleColor} text1={"Back"} text2={"Add"} onBackPress={() => { navigation.navigate("AddedTasks"), setAddTask([]) }} onAcceptPress={handleNavigateDone} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "space-between",
  },
  underlineContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10
  },
});

export default AddedItemsScreen
