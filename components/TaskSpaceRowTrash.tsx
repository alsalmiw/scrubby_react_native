import React, { FC, ReactNode, useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TaskSpaceRowIconComponent from './TaskSpaceRowIconComponent';
import TaskSpaceRowComponent from './TaskSpaceRowComponent';
import { ThemeContext } from '../context/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { DeleteSpaceCollectionById, GetSpaceCollectionByUsername, GetUserDefaultSchedule } from '../services/dataService';
import UserContext from '../context/UserContext';


interface Props {
  onPress: Function,
  idx: number,
  children: ReactNode
  spaceId: number
}


const TaskSpaceRowTrash: FC<Props> = (props) => {

  const {bgColor, lilacColor} = useContext(ThemeContext)
  const { setMySpaces, mySpaces, setMyHouses, myHouses, userData, defaultSpace, setDefaultSpace, setRunAgain, setSharedSpacesInfo, sharedSpacesInfo, spacesRooms, setSpacesRoom } = useContext(UserContext)


  const handleDeleteSpace = async () => {
    let result = await DeleteSpaceCollectionById(props.spaceId)
    if(result){
      setMyHouses(myHouses.filter((space:any) => space.id!=props.spaceId))
      let collections = await GetSpaceCollectionByUsername(userData.username)
      if(collections.length > 0){
        setMyHouses(collections)
    }
    if(props.spaceId == defaultSpace.id){
      let defaultCollection = await GetUserDefaultSchedule(userData.username)
        setDefaultSpace(defaultCollection)
        setRunAgain(true)
    }
    setSharedSpacesInfo(sharedSpacesInfo.filter((space:any) => space.id!=props.spaceId))
    setSpacesRoom(spacesRooms.filter((space:any) => space.id!=props.spaceId))
    }
    console.log(props.spaceId)
    
  }

  const handleNav = () => {
    props.onPress();
  }
  return (
    <TaskSpaceRowComponent idx={props.idx} onPress={handleNav}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.textStyle}>{props.children}</Text>
        <Pressable  onPress={()=>handleDeleteSpace()}>
          <Feather name="trash-2" size={27} color={"#FFF"} />
      </Pressable>
      </View>
    </TaskSpaceRowComponent>
  )
};

export default TaskSpaceRowTrash;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  }
})