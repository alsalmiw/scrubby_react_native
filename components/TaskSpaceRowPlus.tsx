import React, { FC, ReactNode, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TaskSpaceRowIconComponent from './TaskSpaceRowIconComponent';
import TaskSpaceRowComponent from './TaskSpaceRowComponent';
import { ThemeContext } from '../context/ThemeContext';

import { FontAwesome } from '@expo/vector-icons';
import SquareColoredButton from './SquareColoredButton';

interface Props {
  onPress: Function,
  idx: number,
  children: ReactNode
}


const TaskSpaceRowPlus: FC<Props> = (props) => {

  const { bgColor, lilacColor } = useContext(ThemeContext)

  const handleFunction = () => {
    props.onPress();
  }
  return (
    <TaskSpaceRowComponent idx={props.idx} onPress={handleFunction}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.textStyle}>{props.children}</Text>
        <FontAwesome name="plus-square" size={40} color="white" />
      </View>
    </TaskSpaceRowComponent>
  )
};

export default TaskSpaceRowPlus

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  }
})