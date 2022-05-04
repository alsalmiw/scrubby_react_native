import { StatusBar } from 'expo-status-bar';
import { FC, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import { ThemeContext } from '../../context/ThemeContext';
import UserContext from '../../context/UserContext';
import { ISpace } from '../../Interfaces/ISpace';

const TaskFamilyScreen: FC = ()=> {

  const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor, greenColor } = useContext(ThemeContext);
  const { mySpaces } = useContext(UserContext)

  let r = Math.floor(Math.random() * 7)

  const handleGoToSpaceRooms = async(space:any)=> {
    console.log("collection id is "+space.id)
    
  }


  return (
    
    <ScrollView style={styles.container}>
      <HeaderComponent title="Task Family"/>
    
 
    <View style={styles.container}>
        <Text>My Task Family Page</Text>

        <View style={styles.spacesContainer}>

        {mySpaces.map((space:ISpace, idx:number) =>
          <TaskSpaceRowComponent
            idx={r+idx}
            key={idx}
            onPress={()=>handleGoToSpaceRooms(space)}
          >
            <Text style={styles.spaceFont}>{space.collectionName}</Text>
          </TaskSpaceRowComponent>

        )}


      </View>
    </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    padding:10,
  },
  spacesContainer:{

  }, 
  spaceFont:{
    color: '#fff',
    fontWeight: "bold"
  }
});

export default TaskFamilyScreen