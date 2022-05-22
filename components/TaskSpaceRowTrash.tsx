import React, { FC, ReactNode, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TaskSpaceRowIconComponent from './TaskSpaceRowIconComponent';
import TaskSpaceRowComponent from './TaskSpaceRowComponent';
import { ThemeContext } from '../context/ThemeContext';
import { Feather } from '@expo/vector-icons';

interface Props {
  onPress: Function,
  idx: number,
  children: ReactNode
}


const TaskSpaceRowTrash: FC<Props> = (props) => {

  const {bgColor, lilacColor} = useContext(ThemeContext)

  const handleNav = () => {
    props.onPress();
  }
  return (
    <TaskSpaceRowComponent idx={props.idx} onPress={handleNav}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.textStyle}>{props.children}</Text>
        <View>
          <Feather name="trash-2" size={27} color={"#FFF"} />
        </View>
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