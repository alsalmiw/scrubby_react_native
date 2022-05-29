import React, { FC, ReactNode, useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TaskSpaceRowIconComponent from './TaskSpaceRowIconComponent';
import TaskSpaceRowComponent from './TaskSpaceRowComponent';
import { ThemeContext } from '../context/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { DeleteSpaceCollectionById, GetSpaceCollectionByUsername } from '../services/dataService';
import UserContext from '../context/UserContext';


interface Props {
  onPress: Function,
  idx: number,
  children: ReactNode
  spaceId: number
}


const TaskSpaceRowTrash: FC<Props> = (props) => {

  const {bgColor, lilacColor} = useContext(ThemeContext)
  const { setMySpaces, mySpaces, setMyHouses, myHouses, userData } = useContext(UserContext)


  const handleDeleteSpace = async () => {
    let result = await DeleteSpaceCollectionById(props.spaceId)
    if(result){
      setMyHouses(myHouses.filter((space:any) => space.id!=props.spaceId))
      let collections = await GetSpaceCollectionByUsername(userData.username)
      if(collections.length > 0){
        setMyHouses(collections)
    }
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