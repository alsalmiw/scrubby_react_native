// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, FlatList, Pressable } from 'react-native';
import CoinsPointsDisplayContainer from '../../components/Profile/CoinsPointsDisplayContainer'
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import AddPhotoComponent from '../../components/AddPhotoComponent';
import HeaderComponent from '../../components/HeaderComponent';
import UserNameComponent from '../../components/UserNameComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import AddItemButtonComponent from '../../components/AddItemButtonComponent';
import TaskSpaceRowIconComponent from '../../components/TaskSpaceRowIconComponent';
import TaskSpaceRowTrash from '../../components/TaskSpaceRowTrash';
import RootStackParamList from '../../types/INavigateProfile'
import UseTheme from '../../hooks/use-theme';
// import { GetUserById } from '../../services/dataService';
//
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetSpaceCollectionByUserId, GetUserByUsername, GetDependantByUserId, GetSpacesByCollectionID } from '../../services/dataService';


//This is just testing
import { Dimensions } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TaskSpaceRowCheck from '../../components/TaskSpaceRowCheck';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import UserContext from '../../context/UserContext';
import { ISpace } from '../../Interfaces/ISpace';
import IChild from '../../Interfaces/IChild';
import AvatarComponent from '../../components/AvatarComponent';

const windowWidth = Dimensions.get('window').width * 0.33;

type Props = NativeStackScreenProps<RootStackParamList, 'MyProfile'>

interface newSpace {
  collectionName: string,
  id: number,
  isDeleted: boolean,
  userId: number
}

const MyProfileScreen: FC<Props> = ({ navigation }) => {

  const { bgColor, lilacColor } = useContext(ThemeContext)
  const { savedUsername, setSavedUsername, isChildFree, userData, setUserData, childData, setChildData, myRooms, setMyRooms,setMySpace, setMySpaces, mySpaces, childrenData, setChildrenData} = useContext(UserContext)

  //This is a test useState for populating create a new space
  const [newSpace, setNewSpace] = useState<newSpace[]>([]);



  let r = Math.floor(Math.random() * 7)

  const handleAddChild = () => {
    console.log('Plus Icon Works');
    navigation.navigate('AddChild')
  }


  const handleAddNewRoomNavigation = () => {
    navigation.navigate('AddItems');
  }

  const handleGoToSpaceRooms = async(space:any)=> {
    console.log("collection id is "+space.id)
    let spaceRooms = await GetSpacesByCollectionID(space.id)
    console.log("spacerooms" + spaceRooms)
    setMySpace(space)

    if (spaceRooms.length != 0){
      setMyRooms(spaceRooms)
      navigation.navigate('Rooms')
    }
    else{
      setMyRooms('')
      navigation.navigate('Rooms')
    }
  }


  // const asyncShit = async (Id: number) => {
  //   let result = await GetSpaceCollectionById(Id);
  //   setNewSpace(prevState => {
  //     return [...prevState, result];
  //   });
  //   console.log(result);
  // }

  useEffect(() => {
    // console.log(savedUsername)
    AsyncGetSpaceCollectionById();


  }, [])

  const AsyncGetSpaceCollectionById = async () => {

    let userInfo: any = await AsyncStorage.getItem("Username");
    if (userInfo) {
      setSavedUsername(userInfo)
      console.log(userInfo)
    }

    let user = await GetUserByUsername(savedUsername)
    console.log(user);
    // console.log(user)
    if (user.length != 0) {
      setUserData(user)
      let result = await GetSpaceCollectionByUserId(user.id);
      let children = await GetDependantByUserId(user.id);
      console.log(children)
      if (result.length != 0) {
        setNewSpace([...result])
        setMySpaces(result)
      }
      if (children.length != 0) {
        console.log(children.length);
        setChildrenData(children)
        console.log("after");
      }

    }

  }

  const handleGoToChildProfile=(child:object)=> {
    console.log(child)
   setChildData(child)
    navigation.navigate('ChildTasks')
  }

  return (

    <ScrollView style={styles.container}>

      <HeaderComponent title="MY PROFILE"></HeaderComponent>
      <View style={styles.firstRow}>
        <AvatarComponent onPress={undefined} imageSource={userData.photo} />
        <View style={styles.nameAndCoinContainer}>

          <UserNameComponent name={savedUsername}></UserNameComponent>
          <View style={styles.coinContainer}>
            <CoinsPointsDisplayContainer coins={`${childData.dependentCoins}`} points="39"></CoinsPointsDisplayContainer>
          </View>
        </View>
      </View>


      <UnderlinedHeaderComponent titleOne="My Spaces" titleTwo="" titleThree=""/>
      <Pressable style={styles.secondRow} onPress={handleAddNewRoomNavigation}>
        <AddItemButtonComponent onPress={handleAddNewRoomNavigation}>
          <Entypo name="squared-plus" size={50} color={lilacColor} />
        </AddItemButtonComponent>
        <View style={styles.userNameContainer}>
          <UserNameComponent name="Create a New Space"></UserNameComponent>
        </View>
      </Pressable>
      <View style={styles.newSpaceContainer}>

        {mySpaces.map((space:ISpace, idx:number) =>
          <TaskSpaceRowTrash
            idx={r+idx}
            key={idx}
            onPress={()=>handleGoToSpaceRooms(space)}
          >
            {space.collectionName}
          </TaskSpaceRowTrash>

        )}


      </View>
{
                !isChildFree? 
                <>
                          <UnderlinedHeaderComponent titleOne="Kids" titleTwo="" titleThree=""/>
                            <View style={styles.thirdRow}>
                                
                                      <AddItemButtonComponent onPress={handleAddChild}>
                                        <Entypo name="squared-plus" size={windowWidth} color={lilacColor} />
                                      </AddItemButtonComponent> 

                                      {childrenData.length!=0 ? 
                                      childrenData.map((child:object, idx:number)=>{
                                        return(
                                      //     <AddItemButtonComponent key={idx} onPress={()=>handleGoToChildProfile(child)}>
                                      //   <Entypo name="squared-cross" size={windowWidth} color={lilacColor} />
                                      // </AddItemButtonComponent>
                                        <AvatarComponent key={idx} onPress={undefined} imageSource={userData.photo} />
                                        )

                                      })
                                      
                                    : null}
                              
                            </View>

                </>
                :null
              }
    
    </ScrollView>





  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },

  firstRow: {
    marginVertical: '0%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nameAndCoinContainer: {
    flex: 1,
    alignItems: 'center',
  },

  coinContainer: {
    marginTop: '6%',
    alignItems: 'center',
    width: '100%'
  },

  secondRow: {
    marginTop: '4%',
    marginLeft: '4%',
    flexDirection: 'row',
    alignItems: 'center'
  },

  newSpaceContainer: {
    alignItems: 'center',
  },

  userNameContainer: {
    marginLeft: '4%'
  },

  thirdRow: {
    flex: 1,
    flexDirection: 'row',
   flexWrap: 'wrap'
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  }

});

export default MyProfileScreen