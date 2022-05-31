// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View, StatusBar, Image, Pressable } from 'react-native';
import RootStackParamList from '../../types/INavigateTasking'
import { ThemeContext } from '../../context/ThemeContext';
import HeaderComponent from '../../components/HeaderComponent';
import FullButtonComponent from '../../components/FullButtonComponent';
import AvatarComponent from '../../components/AvatarComponent';
import UserNameComponent from '../../components/UserNameComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import UserContext from '../../context/UserContext';
import SquareColoredButton from '../../components/SquareColoredButton';
import iconsMap from '../../types/IconsMap';
import TaskRowTaskInfoComponent from '../../components/TaskRowTaskInfoComponent';
import ModalComponent from '../../components/ModalComponent';




type Props = NativeStackScreenProps <RootStackParamList, 'TaskMember'>

const TaskMemberScreen: FC<Props> = ({navigation, route})=> {
  const { purpleColor, primaryTextColor} = useContext(ThemeContext)
  const { seeAll, setSeeAll,  mySpace, taskUser, isChild, setIsChild, selectedUser, setSelectedUser, setMyRoom, setWaiting} = useContext(UserContext)

  const [tasks, setTasks] = useState([])
  const [r, setR] = useState(Math.floor(Math.random() * 7))
  const [activeRoom, setActiveRoom] = useState<number>(0) 


  useEffect(() => {
    setWaiting(false)
    console.log("im at the useEffect " + activeRoom)
    setSeeAll(true)
    //console.log(mySpace.rooms[0])
    //console.log(mySpace)
   // console.log(selectedUser)
    if (mySpace.rooms.length > 0) {
      setActiveRoom(mySpace.rooms[0].id)
      setTasks(mySpace.rooms[0].tasks)
      setMyRoom(mySpace.rooms[0])
      console.log("did i run again and reset the room?")
    }

  }, [])

  const ShowRooms = ()=>{

    return(

      mySpace.rooms.map((room:any, idx:number) => {
        return(
          <Pressable key={idx} onPress={() => { setTasks(room.tasks), setMyRoom(room), setActiveRoom(room.id), console.log("im with other rooms " +room.id)}} >
        <SquareColoredButton key={idx} idx={r+idx} onPress={() => {setTasks(room.tasks), setMyRoom(room)} }>
          <Image style={styles.buttonSize} source={iconsMap.get(room.spaceCategory)} />
        <Text style={[{color:"#FFF"}]}>{room.spaceName}</Text>
        </SquareColoredButton>
        <View style={[styles.fadedImage, {backgroundColor: "#FFF", opacity:activeRoom == room.id ? 0:0.5}]}></View>
        </Pressable>
        )
      })
    )
  }
  
  return (

 <View style={styles.container}>

    <ScrollView style={{flex:0.8}}>
        
        <HeaderComponent title='Task Family Member'/>
        <View style={styles.firstRowContainer}>
                <AvatarComponent onPress={undefined} imageSource={selectedUser.photo}/>
                <View style={styles.insideFirstRowContainer1}>
                    <UserNameComponent name={selectedUser.fullName}/>
                    <Text style={{color:primaryTextColor, paddingTop:4}}>Space: {mySpace.collectionName}</Text>
                </View>
             
            </View>

           
          <View style={styles.underlineContainer}>
            {
               mySpace.rooms.length<5?
                <UnderlinedOneHeaderComponent titleFirst={"Select a Room"}/>
               : 

               <UnderlinedHeaderComponent titleOne={'Select a Room'} titleTwo={'see all'} titleThree={'see less'} />

            }
          
        </View>
        <View>
          {
           
            seeAll?

                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                      <ShowRooms />
                  
                  </ScrollView> 

                  : 

                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  
                    <ShowRooms />

                  </View>
          }

              </View>
          
          
          <View>
           <UnderlinedOneHeaderComponent titleFirst={' Assign Tasks' }/>
        </View>
            {/* </View>l */}

          <View>
             
            {
              tasks.length>0?
              tasks.map((task: any, idx: number) =>   
             
               <TaskRowTaskInfoComponent r={r+2} key={idx} idx={idx} task={task} selectedSpaceId={activeRoom} />
               
                
                )
              : 
              <Text> You have no tasks in this room.</Text>
            }
             
          </View>

    </ScrollView>
           <FullButtonComponent radius={0} color={purpleColor} onPress={()=>navigation.goBack()} >Back</FullButtonComponent>
          
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
  },
  firstRowContainer: {
      flexDirection: 'row',
  },
  insideFirstRowContainer1: {
      justifyContent: 'center',
      paddingLeft: '3%'
  },
  insideFirstRowContainer2: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  secondRowContainer: {
      marginTop: '5%',
      paddingLeft: '3%',
      
  },
  insideSecondRowContainer1: {
      marginTop: '3%'
  }, 
  buttonSize: {
    width:50, height:50
 },
 underlineContainer: {
  flexDirection: 'row',
  justifyContent: "space-between",
  paddingLeft: 10,
},
fadedImage: {
  borderRadius:5, 
  width: 80,
  height: 80, 
  margin: 3,
  position: 'absolute'

}
  
})

export default TaskMemberScreen