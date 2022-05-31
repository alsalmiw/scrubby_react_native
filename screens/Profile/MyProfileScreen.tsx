// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, FlatList, Pressable } from 'react-native';
import CoinsPointsDisplayContainer from '../../components/Profile/CoinsPointsDisplayContainer'
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import HeaderComponent from '../../components/HeaderComponent';
import UserNameComponent from '../../components/UserNameComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import AddItemButtonComponent from '../../components/AddItemButtonComponent';
import { FontAwesome5 } from '@expo/vector-icons';
import TaskSpaceRowTrash from '../../components/TaskSpaceRowTrash';
import RootStackParamList from '../../types/INavigation'
import UseTheme from '../../hooks/use-theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetSpaceCollectionByUserId, GetUserByUsername, GetDependantByUserId, GetSpacesByCollectionID, GetSelectedTasksByUserID, GetChildDefaultSchedule, GetDependantsDTOByUserId } from '../../services/dataService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//This is just testing
import { Dimensions } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import UserContext from '../../context/UserContext';
import { ISpace } from '../../Interfaces/ISpace';
import IChild from '../../Interfaces/IChild';
import AvatarComponent from '../../components/AvatarComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import SplashComponentFaded from '../../components/SplashComponentFaded';

const windowWidth = Dimensions.get('window').width * 0.33;

type Props = NativeStackScreenProps<RootStackParamList, 'MyProfile'>

interface newSpace {
  collectionName: string,
  id: number,
  isDeleted: boolean,
  userId: number
}

const MyProfileScreen: FC<Props> = ({ navigation }) => {

  const { bgColor, lilacColor, primaryTextColor } = useContext(ThemeContext)
  const { savedUsername, setSavedUsername, isChildFree, userData, setUserData, childData, setChildData, myRooms, setMyRooms, setMySpace, setMySpaces, mySpaces, childrenData, setChildrenData, setUsersAddedTasks, setChildPage, childPage, childDefaultSpace, setChildDefaultSpace, setBlank, memberInfo, setMemberInfo, setIsEditImage, setRunAgain, childrenInfo, setChildrenInfo, myHouses, setMyHouses, setChildCoins, setChildPoints, setWaiting, waiting } = useContext(UserContext)


  //This is a test useState for populating create a new space
  const [newSpace, setNewSpace] = useState<newSpace[]>([]);
  const [r, setR] = useState<number>(Math.floor(Math.random() * 7))


  const handleAddChild = () => {
    //console.log('Plus Icon Works');
    navigation.navigate('AddChild')
  }


  const handleAddNewSpaceNavigation = () => {
    navigation.navigate('AddNewSpace');
  }

  const handleGoToSpaceRooms = async (space: any) => {
    // console.log("collection id is "+space.id)
    let spaceRooms = await GetSpacesByCollectionID(space.id)
    //console.log(spaceRooms)
    // console.log("spacerooms" + spaceRooms)
   

    if (spaceRooms!= null || spaceRooms.length != 0) {
      setMyRooms(spaceRooms)
     navigation.navigate('Rooms')
    
      //console.log("in the if statement")
    }
    else {
      setMyRooms('')
      //console.log("in the else statement")
     
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

    
    navigation.addListener('focus', () => {
      setBlank(false)
      setRunAgain(true)
    })


    // console.log(savedUsername)
    //AsyncGetSpaceCollectionById();
    //AsyncGetSpaceCollectionById();



  }, [myHouses, childrenData, userData]);



  // const AsyncGetSpaceCollectionById = async () => {

  //   let userInfo: any = await AsyncStorage.getItem("Username");
  //   if (userInfo) {
  //     setSavedUsername(userInfo)
  //     //console.log(userInfo)
  //   }

  //   let user = await GetUserByUsername(savedUsername)
  //   //console.log(user);
  //   // console.log(user)
  //   if (user.length != 0) {
  //     setUserData(user)
  //     let result = await GetSpaceCollectionByUserId(user.id);
  //     // let children = await GetDependantByUserId(user.id);
  //     //let usersTasks = await GetSelectedTasksByUserID(user.id)
  //     //console.log(children)
  //     if (result.length != 0) {
  //       setNewSpace([...result])
  //       setMySpaces(result)
  //     }
  //     // if (children.length != 0) {
  //     //   console.log(children.length);
  //     //   setChildrenData(children)
  //     //   console.log("after");
  //     // }
  //     //   if(usersTasks.length!= 0)
  //     // {
  //     //   setUsersAddedTasks (usersTasks)
  //     //   console.log(usersTasks)
  //     // }

  //   }

  // }


  const handleGoToChildProfile = async (child: any) => {
    setWaiting(true)
    // console.log("=======================================================================++")
    //console.log(child)

    await setChildPage(child)
    await setChildCoins(child.dependentCoins)
    await setChildPoints(child.dependentPoints)
    let childDefault = await GetChildDefaultSchedule(child.id)
    //console.log("Child fetch", childDefault)
    if (childDefault.length != 0) {
      setChildDefaultSpace(childDefault)
      navigation.navigate('ChildTasks')
      setWaiting(false)
      //console.log("got it");
    }
    else {
      setChildDefaultSpace([])
      //console.log("child Page",childPage)
      setWaiting(false)
      navigation.navigate('ChildTasks')
      //console.log('empty default space')
      // console.log("Child Default Space",childDefaultSpace)
    }


    // console.log(child.scheduledTasks)
    //setChildData(child)

  }

  const handleChangeInfo = (isChangeName: boolean) => {
    let newDetails = {
      personId: userData.Id,
      username: userData.Username,
      isChild: false,
    }

    setMemberInfo(newDetails)
    navigation.navigate('EditProfile')

    if (isChangeName) {
      setIsEditImage(false)
    }
    else {
      setIsEditImage(true)
    }

  }


  return (
    <>
      <SplashComponentFaded>
        <ScrollView style={styles.container}>

          <HeaderComponent title="MY PROFILE"></HeaderComponent>
          <View style={styles.firstRow}>
            <View>
              <AvatarComponent onPress={undefined} imageSource={userData.photo} />
              <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
                <MaterialCommunityIcons name="image-edit-outline" size={20} color={lilacColor} />
                <Text style={{ color: "blue", paddingLeft: 5 }} onPress={() => handleChangeInfo(false)}>Edit image?</Text>
              </View>

            </View>
            <View style={styles.nameAndCoinContainer}>
              <Pressable style={{ flexDirection: 'row' }} onPress={() => handleChangeInfo(true)}>
                <UserNameComponent name={userData.name} />
                <View style={{ marginLeft: 5 }}>
                  <FontAwesome5 name="edit" size={15} color={lilacColor} />
                </View>
              </Pressable>

              <View style={styles.coinContainer}>
                <CoinsPointsDisplayContainer coins={`${userData.coins}`} points={userData.points}></CoinsPointsDisplayContainer>
              </View>
            </View>
          </View>

          <View style={styles.underlineContainer}>
            <UnderlinedOneHeaderComponent titleFirst='My Spaces' />
          </View>
          {/* <UnderlinedHeaderComponent titleOne="My Spaces" titleTwo="" titleThree="" /> */}
          <Pressable style={styles.secondRow} onPress={handleAddNewSpaceNavigation}>
     
              <Entypo name="squared-plus" size={50} color={lilacColor} />
       
            <View style={styles.userNameContainer}>
              <UserNameComponent name="Create a New Space"></UserNameComponent>
            </View>
          </Pressable>
          <View style={styles.newSpaceContainer}>

            {myHouses.length > 0 ?
              myHouses.map((space: ISpace, idx: number) =>
                <TaskSpaceRowTrash
                  idx={r + idx}
                  key={idx}
                  spaceId={space.id}
                  onPress={() => handleGoToSpaceRooms(space)}
                >
                  {space.collectionName}
                </TaskSpaceRowTrash>



              )
              : null
            }

          </View>
          {
            !isChildFree ?
              <>
                <View style={styles.underlineContainer} >
                  <UnderlinedOneHeaderComponent titleFirst='Kids' />
                </View>
                {/* <UnderlinedHeaderComponent titleOne="Kids" titleTwo="" titleThree="" /> */}
                <View style={styles.thirdRow}>

                  <AddItemButtonComponent onPress={handleAddChild}>
                    <Entypo name="squared-plus" size={windowWidth} color={lilacColor} />
                  </AddItemButtonComponent>

                  {childrenData.length != 0 ?
                    childrenData.map((child: any, idx: number) => {
                      return (
                        //     <AddItemButtonComponent key={idx} onPress={()=>handleGoToChildProfile(child)}>
                        //   <Entypo name="squared-cross" size={windowWidth} color={lilacColor} />
                        // </AddItemButtonComponent>
                        <AvatarComponent key={idx} onPress={() => { handleGoToChildProfile(child) }} imageSource={child.dependentPhoto} />
                      )

                    })

                    : null}

                </View>

              </>
              : null
          }

        </ScrollView>
      </SplashComponentFaded>
    </>







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
    paddingLeft: '1%',
  },

  nameAndCoinContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
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
    flexWrap: 'wrap',
    paddingLeft:'2.5%',
    paddingRight:'2.5%',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  },
  underlineContainer: {

    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: '2.5%',
    paddingRight: '2.5%'
  },

});

export default MyProfileScreen