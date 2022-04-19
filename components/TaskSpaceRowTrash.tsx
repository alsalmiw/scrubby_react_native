import React, { FC, ReactNode, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TaskSpaceRowIconComponent from './TaskSpaceRowIconComponent';
import TaskSpaceRowComponent from './TaskSpaceRowComponent';
import { ThemeContext } from '../context/ThemeContext';
import { Feather } from '@expo/vector-icons';

interface Props {
  onPress: Function,
  idx: number
}


const TaskSpaceRowTrash: FC<Props> = (props) => {

  const {bgColor, lilacColor} = useContext(ThemeContext)

  const handleNav = () => {
    props.onPress();
  }
  return (
    <TaskSpaceRowComponent idx={props.idx} onPress={handleNav}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.textStyle}>Hello World</Text>
        <TaskSpaceRowIconComponent>
          {/* <Entypo name="trash" size={24} color={bgColor} /> */}
          <Feather name="trash-2" size={24} color={bgColor} />

        </TaskSpaceRowIconComponent>
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