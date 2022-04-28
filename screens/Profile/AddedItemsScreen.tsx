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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../../types/INavigateProfile'


interface taskInfo {
  description: string;
  id: number;
  name: string;
  tags: string;
  UserId: number;
  color: number;

}



type Props = NativeStackScreenProps<RootStackParamList, 'MyProfile'>


const AddedItemsScreen: FC<Props> = ({navigation}) => {

  const { seeAll, setSeeAll, task, setTask, allTask, setAllTask, addTask, setAddTask, userData, rState, setRState } = useContext(UserContext)

  const { lilacColor } = useContext(ThemeContext)
  const windowWidth = Dimensions.get('window').width * 0.25;
  


  // let r = Math.floor(Math.random() * 7)
  //const [rState, setRState] = useState(Math.floor(Math.random() * 7));

  //superAddTask = addTask


  //const [addTaskLength, setAddTaskLength] = useState(8);
  //console.log(`The random number of r is ${rState}`);
  //This is my dumb test
  //Need to know why color of boxes stays the same when i delete an item

  const handleNavigate = () => {
    console.log('Hello World');
    navigation.navigate("AddItems");
  }

  const handleDeleteItem = (id:number) => {

    setAddTask((currentTasks: any) => {

      return currentTasks.filter((task:any, x:number) => x !== id)
      
    });
  
  }
  
  return (
    <View style={styles.container}>
      {/* This header component use font size 25, later must change to percentage based on device width */}
      <View>
        <HeaderComponent title="Master Bathroom Items" />
        <UnderlinedOneHeaderComponent titleFirst="Added Items" />
      </View>


      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: '2%' }}>
       
          <AddItemButtonComponent onPress={handleNavigate}>
            <Entypo name="squared-plus" size={windowWidth} color={lilacColor} />
          </AddItemButtonComponent>
        
        {

          addTask.map((colorBtn: taskInfo, x: number) => {
            console.log(colorBtn);
            return (
              <View>
                <SquareColoredButton key={colorBtn.id} idx={colorBtn.color}  onPress={handleDeleteItem.bind(this, x)} >
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

// onPress={() => { colorBtn.UserId = userData.id, addTask.push(colorBtn), console.log(addTask)