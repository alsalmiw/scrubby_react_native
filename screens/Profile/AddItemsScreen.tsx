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
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';
//
interface taskInfo {
  description: string;
  id: number;
  name: string;
  tags: string;
  UserId: number;
  spaceId: number;
  color: number;
}

type Props = NativeStackScreenProps<RootStackParamList, 'AddItems'>


const AddItemsScreen: FC<Props> = ({ navigation }) => {
  const { seeAll, setSeeAll, task, setTask, allTask, setAllTask, addTask, setAddTask, userData, rState, setRState, myRoom } = useContext(UserContext)

  const[counter,setCounter] =useState<number>(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  //let r = Math.floor(Math.random() * 7)


  const { purpleColor, primaryTextColor, lilacColor, blueColor } = useContext(ThemeContext)

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
    setTask(allTask.filter((aTask: taskInfo) => aTask.tags.includes(name.toLowerCase())))
  }

  const handleSelectedTasks = async () => {
    setCounter(0);
    navigation.navigate('AddedItems')

  }

  return (
    <View style={{flex:1,  justifyContent: "space-between"}}>
      <ScrollView style={styles.container}>
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
                          <View key={idx} style={[styles.categories, {borderColor:selectedCategory==icon.Name?blueColor:lilacColor}]}>
                            <Pressable onPress={() => {AddItems(icons[idx].Name), setSelectedCategory(icon.Name)}}>
                              <View style={{ alignItems: 'center' }}>
                                <Image style={{ width: 50, height: 50, }} source={icon.Link} />
                              </View>
                              <Text style={[{ textAlign: 'center', color:primaryTextColor }]}>{icons[idx].NickName} </Text>
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
                        <View key={idx} style={[styles.categories2, {borderColor:selectedCategory==icon.Name?blueColor:lilacColor}]}>
                          <Pressable onPress={() => {AddItems(icons[idx].Name), setSelectedCategory(icon.Name)}}>
                            <View style={{ alignItems: 'center' }}>
                              <Image style={{ width: 50, height: 50, }} source={icon.Link} />
                            </View>
                            <Text style={{ textAlign: 'center',  color:primaryTextColor }}>{icons[idx].NickName} </Text>
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
          <UnderlinedOneHeaderComponent titleFirst={'Items   '+counter } />
        </View>
        <ScrollView>
          <View style={styles.rest3}>
            <View style={[styles.underlineContainer, { marginBottom: 5 }]}>

            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: '2%' }}>
              {
                task.map((colorBtn: taskInfo, x: number) => {
                  return (
                    <SquareColoredButton key={x} idx={rState + x} onPress={() => { colorBtn.UserId = userData.id, addTask.push({ ...colorBtn, 'color': (rState + x), 'spaceId': myRoom.id }), console.log(addTask), setCounter(counter + 1) }} >
                      <Entypo name="plus" size={30} color="white" style={styles.plusIconStyle} />
                      <Text style={styles.plusIconText}>{colorBtn.name}</Text>
                    </SquareColoredButton>
                  )
                })
              }

            </View>
          </View>
        </ScrollView >



      </ScrollView >
      <View></View>
      <TwoFullButtonComponent text1={"Back"} text2={"Add"} onAcceptPress={handleSelectedTasks} onBackPress={()=>navigation.goBack()} color={purpleColor}/>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    //position: 'absolute'
  },
  headTitle: {

    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 0
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
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    minWidth: 83,
    maxWidth: 84,
    marginRight: 5,
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
  
    borderWidth: 3,
    borderRadius: 10,
    padding: 8,
    paddingBottom: 2,
    minWidth: 84,
    maxWidth: 84,
    marginRight: 5,
    marginBottom: 10,
    minHeight: 85,
    maxHeight: 85
  },
  underlineContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: "2.5%",
    paddingRight: "2.5%"
  },
  rest3: {

    paddingLeft: '3%',
    paddingRight: '3%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  plusIconStyle: {
    paddingBottom: 0,
    marginBottom: 0,
    textAlign: 'center'
  },
  plusIconText: {
    color: 'white',
    textAlign: 'center',

    marginTop: 0
  }


});

export default AddItemsScreen