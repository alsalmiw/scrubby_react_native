// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, Pressable, Image, FlatList } from 'react-native';
//

import icons from '../../types/Icons';

// import Line from '../../components/AddEdit/LineComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import UserContext from '../../context/UserContext';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import SquareColoredButton from '../../components/SquareColoredButton';

//icon
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import FullButtonComponent from '../../components/FullButtonComponent';
import { ThemeContext } from '../../context/ThemeContext';
import { AddSelectedTask, GetAllSpaceItems } from '../../services/dataService';
import RootStackParamList from '../../types/INavigateProfile'
import { NativeStackScreenProps } from '@react-navigation/native-stack';



import AsyncStorage from '@react-native-async-storage/async-storage';
//
interface taskInfo {
  description:string;
  id:number;
  name:string;
  tags:string;
  UserId:number;
  spaceId: number;
  color: number;
}

type Props = NativeStackScreenProps<RootStackParamList, 'AddItems'>


const AddItemsScreen: FC<Props> = ({navigation}) => {
  const { seeAll, setSeeAll, task, setTask,allTask, setAllTask, addTask, setAddTask, userData, rState, setRState, myRoom } = useContext(UserContext)

  //let r = Math.floor(Math.random() * 7)
  
  

  const { purpleColor } = useContext(ThemeContext)

  // const [task, setTask] = useState<taskInfo[]>([]);
  // const [allTask, setAllTask] = useState<taskInfo[]>([])
  // const [addTask, setAddTask] = useState<taskInfo[]>([])



  useEffect(() => {
    console.log(fetchSpaceInfo());
    
    

  }, [])

  const fetchSpaceInfo = async () => {
    let data = await GetAllSpaceItems();
    if (data.length != 0) {
      setAllTask(data);
    }



  }
  const AddItems = (name: string) => {
    setTask(allTask.filter((aTask:taskInfo) => aTask.tags.includes(name.toLowerCase())))
  }

  const handleSelectedTasks = async () => {
    console.log(addTask);

    //await AddSelectedTask(addTask);
    // let result = await AddSelectedTask(addTask);
    // console.log(result);
    navigation.navigate('AddedItems')
    
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headTitle}>
          <HeaderComponent title={myRoom.spaceName}> </HeaderComponent>
        </View>
        <View style={styles.underlineContainer}>
          <UnderlinedHeaderComponent titleOne={'Add Items from Categories'} titleTwo={'see all'} titleThree={'see less'} />
        </View>
        <>
          {
            seeAll ?
              <>
                <View style={styles.rest}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                      icons.map((icon, idx) => {
                        return (
                          <View key={idx} style={styles.categories}>
                            <Pressable  onPress={() => AddItems(icons[idx].Name) }>
                              <View style={{ alignItems: 'center' }}>
                                <Image style={{ width: 50, height: 50, }} source={icon.Link} />
                              </View>
                              <Text style={{ textAlign: 'center' }}>{icons[idx].NickName} </Text>
                            </Pressable>
                          </View>
                        )
                      })
                    }
                  </ScrollView>

                </View>

              </>
              :
              <View style={styles.rest2}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {
                    icons.map((icon, idx) => {
                      return (
                        <View key={idx} style={styles.categories2}>
                          <Pressable  onPress={() => AddItems(icons[idx].Name)}>
                            <View style={{ alignItems: 'center' }}>
                              <Image style={{ width: 50, height: 50, }} source={icon.Link} />
                            </View>
                            <Text style={{ textAlign: 'center', }}>{icons[idx].NickName} </Text>
                          </Pressable>
                        </View>
                      )
                    })
                  }
                </View>
              </View>
          }
        </>
        
        <View style={styles.underlineContainer}>
        <UnderlinedOneHeaderComponent titleFirst={'Items'} />
        </View>
        <ScrollView>
          <View style={styles.rest3}>
          <View style={[styles.underlineContainer, { marginBottom: 5 }]}>
          
        </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: '2%' }}>
              {
                task.map((colorBtn:taskInfo, x:number) => {
                  return (
                  <SquareColoredButton key={x} idx={rState+x} onPress={() => { colorBtn.UserId= userData.id , addTask.push({...colorBtn, 'color': (rState + x), 'spaceId':myRoom.id}) , console.log(addTask)} } >
                    <Entypo name="plus" size={45} color="white" style={{ paddingBottom: 0, marginBottom: 0, textAlign: 'center' }} />
                    <Text style={{ color: 'white', textAlign: 'center', marginTop: 0 }}>{colorBtn.name}</Text>
                  </SquareColoredButton>
                  )
                })
              }
              
            </View>
          </View>
        </ScrollView >



      </View >
      <FullButtonComponent onPress={handleSelectedTasks} color={purpleColor}>
      {/* AddSelectedTask(addTask), console.log(AddSelectedTask(addTask) */}
        <Text>Done</Text>
      </FullButtonComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    position:'absolute'
  },
  headTitle: {

    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop:40
  },
  clickText: {
    textDecorationLine: 'underline',
    flexDirection: 'row',
  },
  rest: {
    paddingLeft: 10,
    marginTop: 10,
  },
  categories: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    minWidth: 83,
    maxWidth: 84,
    marginRight: 10,
    minHeight: 85,
    maxHeight: 85


  },
  rest2: {
    paddingLeft: 10,
    minWidth: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    marginTop: 10,
    marginBottom: 10
  },
  categories2: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    paddingBottom: 2,
    minWidth: 84,
    maxWidth: 84,
    marginRight: 10,
    marginBottom: 10,
    minHeight: 85,
    maxHeight: 85
  },
  underlineContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  rest3: {

    paddingLeft: '3%',
    paddingRight: '3%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }


});

export default AddItemsScreen