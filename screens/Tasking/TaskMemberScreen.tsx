// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View, StatusBar, Image } from 'react-native';
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
  const { purpleColor} = useContext(ThemeContext)
  const { seeAll, setSeeAll,  mySpace, taskUser, isChild, setIsChild, selectedUser, setSelectedUser, setMyRoom} = useContext(UserContext)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setSeeAll(true)
    console.log(selectedUser.fullName)
    //console.log(mySpace)

  }, [])

  let r = Math.floor(Math.random() * 7)
  
  const handleGoBack = ()=>{
   
  }
///
  const ShowRooms = ()=>{

    return(

      mySpace.rooms.map((room:any, idx:number) => {
        return(
        <SquareColoredButton key={idx} idx={r+idx} onPress={() => {setTasks(room.tasks), setMyRoom(room)} }>
          <Image style={styles.buttonSize} source={iconsMap.get(room.spaceCategory)} />
        <Text style={[{color:"#FFF"}]}>{room.spaceName}</Text>
        </SquareColoredButton>
        )
      })
    )
  }
  
  return (
 <>
    <View style={styles.container}>
        
        <HeaderComponent title='Task Family Member'/>
        <View style={styles.firstRowContainer}>
                <AvatarComponent onPress={undefined} imageSource={selectedUser.Photo}/>
                <View style={styles.insideFirstRowContainer1}>
                    <UserNameComponent name={selectedUser.fullName}/>
                 
                </View>
            </View>

           
          <View style={styles.underlineContainer}>
          <UnderlinedHeaderComponent titleOne={'Select a Room'} titleTwo={'see all'} titleThree={'see less'} />
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
            {/* </View> */}

          <View>
            {
              tasks.length>0?
              tasks.map((task: any, idx: number) =>   
          <TaskRowTaskInfoComponent r={r} key={idx} idx={idx} task={task} />
                
                
                )
              : null
            }
          </View>

       
    </View>
    <FullButtonComponent radius={0} color={purpleColor} onPress={()=>navigation.goBack()} >Back</FullButtonComponent>
    </>
    
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
      justifyContent: 'space-around',
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
  
})

export default TaskMemberScreen